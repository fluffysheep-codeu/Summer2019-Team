package com.google.codeu.servlets;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.data.Datastore;
import com.google.codeu.data.User;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Gets the profile pic that was uploaded to Blobstore and posts it to the user page. */
@WebServlet("/api/store-image")
public class ProfilePicServlet extends HttpServlet {

  private Datastore datastore;

  @Override
  public void init() {
    datastore = new Datastore();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    // if not logged in do nothing
    if (!userService.isUserLoggedIn()) {
      JsonObject empty = new JsonObject();
      response.setContentType("application/json");
      response.getWriter().println(empty.toString());
      return;
    }

    String email = request.getParameter("user");
    User user = datastore.getUser(email);

    if (user == null) {
      // If the user doesn't exist, then return.
      JsonObject empty = new JsonObject();
      response.setContentType("application/json");
      response.getWriter().println(empty.toString());
      return;
    }
    String image = user.getProfilePic();
    JsonObject jsonObject = new JsonObject();
    jsonObject.addProperty("content", image);
    response.setContentType("application/json");
    response.getWriter().println(jsonObject.toString());
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    // if not logged in do nothing
    if (!userService.isUserLoggedIn()) {
      return;
    }

    String email = userService.getCurrentUser().getEmail();
    User user = datastore.getUser(email);

    if (user == null) {
      // If the user doesn't exist, then return.
      response.sendRedirect("/error404");
      return;
    }

    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
    List<BlobKey> blobKeys = blobs.get("image");

    if (blobKeys != null && !blobKeys.isEmpty()) {
      BlobKey blobKey = blobKeys.get(0);
      ImagesService imagesService = ImagesServiceFactory.getImagesService();
      ServingUrlOptions options = ServingUrlOptions.Builder.withBlobKey(blobKey);
      String imageUrl = imagesService.getServingUrl(options);
      // updates the user to include the image as their profile picture
      User userNew = new User(email, user.getAboutMe(), imageUrl);
      datastore.storeUser(userNew);
    }
    response.sendRedirect("/userpage?user=" + email);
  }
}
