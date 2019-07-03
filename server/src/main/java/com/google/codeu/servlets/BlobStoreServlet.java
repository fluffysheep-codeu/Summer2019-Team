import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.data.Message;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

@WebServlet("/api/blobstore")
public class BlobStoreServlet extends HttpServlet {
  private BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    UserService userService = UserServiceFactory.getUserService();
    if (!userService.isUserLoggedIn()) {
      response.sendRedirect("/");
      return;
    }

    String user = userService.getCurrentUser().getEmail();
    String userText = Jsoup.clean(request.getParameter("text"), Whitelist.none());

    String regex = "(https?://\\S+\\.(png|jpg))";
    String replacement = "<img src=\"$1\" />";
    String textWithImagesReplaced = userText.replaceAll(regex, replacement);

    Message message = new Message(user, textWithImagesReplaced);
    datastore.storeMessage(message);

    response.sendRedirect("/userpage?user=" + user);
    String user = userService.getCurrentUser().getEmail();
    String text = Jsoup.clean(request.getParameter("text"), Whitelist.none());

    List<String> imageBlobUrls = getUploadedFileUrl(request, "image");
    if (imageBlobUrls != null) {
      for (String u : imageBlobUrls) {
        text += String.format("<br/><img src=\"%s\"/>", u);
      }
    }

    Message message = new Message(user, text);
    datastore.storeMessage(message);

    response.sendRedirect("/user-page.html?user=" + user);
  }

  /** should send a get request to display img in url. */
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    String uploadUrl = blobstoreService.createUploadUrl("/messages");

    response.setContentType("text/html");
    response.getOutputStream().println(uploadUrl);
  }

  private List<String> getUploadedFileUrl(HttpServletRequest request, String formInputElementName) {
    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
    List<BlobKey> blobKeys = blobs.get(formInputElementName);

    // User submitted form without selecting a file, so we can't get a URL.
    // (devserver)
    if (blobKeys == null || blobKeys.isEmpty()) {
      System.out.printf(
          "Assuming this is the devserver and nothing was uploaded; blobKeys: %s%n", blobKeys);
      return null;
    }

    for (BlobKey blobKey : blobKeys) {
      BlobInfo blobInfo = new BlobInfoFactory().loadBlobInfo(blobKey);
      if (blobInfo.getSize() == 0) {
        System.out.printf("deleting blobkey [%s] because it's empty", blobKey);
        blobstoreService.delete(blobKey);
      }
    }

    // Use ImagesService to get a URL that points to the uploaded file.
    ImagesService imagesService = ImagesServiceFactory.getImagesService();
    List<String> imageBlobUrls = new ArrayList<>();
    for (BlobKey blobK : blobKeys) {
      ServingUrlOptions options = ServingUrlOptions.Builder.withBlobKey(blobK);
      // Checking the validity of the file to make sure it's an image, if not catch
      // exception.
      try {
        // getting the image URL to the uploaded file
        String imageUrl = imagesService.getServingUrl(options);
        System.out.printf("[%s] seems to be an image, url is %s%n", blobK, imageUrl);
        imageBlobUrls.add(imageUrl);
      } catch (java.lang.IllegalArgumentException exception) {
        // not image file -> do not add to list, remove from Blobstore
        System.out.printf("[%s] IllegalArgumentException: %s%n", blobK, exception.getMessage());
        try {
          System.out.printf("I am deleting this thing I don't believe is an image: [%s]%n", blobK);
          blobstoreService.delete(blobK);
        } catch (Exception e) {
          System.out.printf("exception when deleting: %s%n", e);
        }
      }
    }

    return imageBlobUrls;
  }
}
