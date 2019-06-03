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

 private Datastore datastore;

 @Override
 public void init() {
  datastore = new Datastore();
 }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
   
  //response.setContentType("text/html");
  
  UserService userService = UserServiceFactory.getUserService();
  String user = request.getParameter("user");
  
  if(user == null || user.equals("")) {
     //JsonObject empty = new JsonObject();
    //  response.setContentType("application/json");
    //  response.getWriter().println("");
  }
  
  String aboutMe = "This is " + user + "'s about me.";
  
  //response.getOutputStream().println(aboutMe);
   
   
    JsonObject jsonObject = new JsonObject();

   
    jsonObject.addProperty("content", aboutMe);
    response.setContentType("application/json");
    response.getWriter().println(jsonObject.toString());
    // response.getWriter().println("hello"));



  }

  public void doPost(HttpServletRequest request, HttpServletResponse response)
   throws IOException {

  UserService userService = UserServiceFactory.getUserService();  
  if (!userService.isUserLoggedIn()) {
   String googleLoginUrl = userService.createLoginURL("/api/login");
    response.sendRedirect(googleLoginUrl);
   //return;
  }
  
  String userEmail = userService.getCurrentUser().getEmail();

  System.out.println("Saving about me for " + userEmail);
  // TODO: save the data
  
  response.sendRedirect("/user-page.html?user=" + userEmail);
 }
}
