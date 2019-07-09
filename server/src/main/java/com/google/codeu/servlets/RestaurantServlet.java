package com.google.codeu.servlets;

import com.google.codeu.data.Datastore;
import com.google.codeu.data.Restaurant;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.Map;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

/** Handles adding a restaurant from a user to datastore. */
@WebServlet("/api/restaurant")
public class RestaurantServlet extends HttpServlet {

  private Datastore datastore;

  @Override
  public void init() {
    datastore = new Datastore();
  }

  /** Respond by returning a new list of Restaurants in JSON. */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    Map<String, Map<String, String>> restaurants = datastore.getRestaurants();
    Gson gson = new Gson();
    String json = gson.toJson(restaurants);
    response.getOutputStream().println(json);
  }

  /** Respond by storing the name and location of a Restaurant. */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Parse the request into the Restaurant name and address
    String name = Jsoup.clean(request.getParameter("name"), Whitelist.none());
    String address = Jsoup.clean(request.getParameter("address"), Whitelist.none());
    String bio = Jsoup.clean(request.getParameter("bio"), Whitelist.none());
    if (name.length() == 0 || address.length() == 0 || bio.length() == 0) {
      response.sendRedirect("/feed");
      return;
    }
    Restaurant restaurant = new Restaurant(name, address, bio);
    datastore.storeRestaurant(restaurant);
    response.sendRedirect("/feed");
  }
}
