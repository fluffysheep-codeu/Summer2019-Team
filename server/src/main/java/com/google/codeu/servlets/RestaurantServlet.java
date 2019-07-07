package com.google.codeu.servlets;

import com.google.codeu.data.Datastore;
import com.google.codeu.data.Restaurant;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.util.Map;
import java.util.List;
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

  /** Function will return whether or not strNum is an Integer */
  public boolean isInt(String strNum) {
    try {
      int d = Integer.parseInt(strNum);
    } catch (NumberFormatException | NullPointerException nfe) {
      return false;
    }
    return true;
  }

  /** Respond by returning a new list of Restaurants in JSON. */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    Map <String, Map <String, String>> restaurants = datastore.getRestaurants();
    Gson gson = new Gson();
    String json = gson.toJson(restaurants);
    response.getOutputStream().println(json);
  }

  /** Respond by storing the name and location of a Restaurant. */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Parse the request into the Restaurant name and address
    String data = Jsoup.clean(request.getParameter("text"), Whitelist.none());
    String bio = Jsoup.clean(request.getParameter("bio"), Whitelist.none());
    String[] nameAddress = data.split(" ");
    int addressStart = 0;
    for (String currStr : nameAddress) {
      if (isInt(currStr)) {
        break;
      }
      addressStart++;
    }
    String name = nameAddress[0];
    String address = nameAddress[addressStart];
    for (int i = 1; i < addressStart; i++) {
      name += " " + nameAddress[i];
    }
    for (int i = addressStart+1; i < nameAddress.length; i++) {
      address += " " + nameAddress[i];
    }
    Restaurant restaurant = new Restaurant(name, address, bio);
    datastore.storeRestaurant(restaurant);
    response.sendRedirect("/feed");
  }
}
