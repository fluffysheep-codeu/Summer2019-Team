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

    // response.setContentType("text/html");

    UserService userService = UserServiceFactory.getUserService();
    String user = request.getParameter("user");
    log.info("request: " + request);
    log.info("user: " + user);

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


   System.out.println(userData.getAboutMe());

    String aboutMe = "This is " + user + " 's About Me. ";
    JsonObject jsonObject = new JsonObject();
    jsonObject.addProperty("content", aboutMe);
    response.setContentType("application/json");
    response.getWriter().println(jsonObject.toString());
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    UserService userService = UserServiceFactory.getUserService();
    if (!userService.isUserLoggedIn()) {
      String googleLoginUrl = userService.createLoginURL("/api/login");
      response.sendRedirect(googleLoginUrl);
      return;
    }

    String userEmail = userService.getCurrentUser().getEmail();
    String aboutMe = request.getParameter("text");

    User user = new User(userEmail, aboutMe);
    datastore.storeUser(user);

    System.out.println("Saving about me for " + userEmail);
    System.out.println(aboutMe);
    // TODO: save the data

    response.sendRedirect("/userpage?user=" + userEmail);
  }
}
