package com.google.codeu.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.JsonObject;
import com.google.codeu.data.Datastore;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Responds with a hard-coded message for testing purposes. */
@WebServlet("/api/about")
public class AboutMeServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    JsonObject jsonObject = new JsonObject();

    UserService userService = UserServiceFactory.getUserService();
    jsonObject.addProperty("content", "Hello World");
    response.setContentType("application/json");
    response.getWriter().println(jsonObject.toString());
  }
}
