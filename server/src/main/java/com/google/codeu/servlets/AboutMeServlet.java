package com.google.codeu.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.data.Datastore;
import com.google.codeu.data.User;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.util.logging.Logger;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

/** Responds with a hard-coded message for testing purposes. */
@WebServlet("/api/about")
public class AboutMeServlet extends HttpServlet {
  private static final Logger log = Logger.getLogger(AboutMeServlet.class.getName());
  private Datastore datastore;

  @Override
  public void init() {
    datastore = new Datastore();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    UserService userService = UserServiceFactory.getUserService();
    String user = request.getParameter("user");

    if (user == null || user.equals("")) {
      JsonObject empty = new JsonObject();
      response.setContentType("application/json");
      response.getWriter().println(empty.toString());
      return;
    }

    User userData = datastore.getUser(user);

    if (userData == null || userData.getAboutMe() == null) {
      JsonObject empty = new JsonObject();
      response.setContentType("application/json");
      response.getWriter().println(empty.toString());
      return;
    }

    JsonObject jsonObject = new JsonObject();
    jsonObject.addProperty("content", userData.getAboutMe());
    response.setContentType("application/json");
    response.getWriter().println(jsonObject.toString());
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    UserService userService = UserServiceFactory.getUserService();
    if (!userService.isUserLoggedIn()) {
      String googleLoginUrl = userService.createLoginURL("/api/login");
      response.sendRedirect(googleLoginUrl);
      return;
    }

    String userEmail = userService.getCurrentUser().getEmail();
    User currentUser = datastore.getUser(userEmail);
    String profPic = currentUser.getProfilePic();

    String userText = Jsoup.clean(request.getParameter("text"), Whitelist.none());

    User user = new User(userEmail, userText, profPic);
    datastore.storeUser(user);

    response.sendRedirect("/userpage?user=" + userEmail);
  }
}
