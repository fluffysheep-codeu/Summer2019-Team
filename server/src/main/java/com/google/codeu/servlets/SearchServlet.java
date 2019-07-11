package com.google.codeu.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.data.Datastore;
import com.google.codeu.data.Message;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Returns to the request for list of messages that contain specific keyword for a specific user.
 */
@WebServlet("/api/search")
public class SearchServlet extends HttpServlet {
  private Datastore datastore;

  @Override
  public void init() {
    datastore = new Datastore();
  }

  /**
   * Returns with a JSON representation of {@link Message} data for a specific user that includes
   * keyword. Returns with an empty array if the user is not provided, or there are no messages to
   * return.
   */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    response.setContentType("application/json");

    UserService userService = UserServiceFactory.getUserService();
    if (!userService.isUserLoggedIn()) {
      String googleLoginUrl = userService.createLoginURL("/api/login");
      response.sendRedirect(googleLoginUrl);
      return;
    }

    String keyword = request.getParameter("search");

    List<Message> messages = datastore.getAllMessages();
    List<Message> filteredMessages = new ArrayList<>();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    if (keyword == null || keyword.equals("")) {
      String json = gson.toJson(messages);
      response.getWriter().println(json);
      return;
    } else if (!messages.isEmpty()) {
      for (int i = 0; i < messages.size(); i++) {
        if (messages.get(i).getText().toLowerCase().contains(keyword.toLowerCase())) {
          filteredMessages.add(messages.get(i));
        }
      }

      Gson modifiedGson = new Gson();
      String json = gson.toJson(filteredMessages);
      response.getWriter().println(json);
      return;
    }
  }
}
