package com.google.codeu.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.data.Datastore;
import com.google.codeu.data.Message;
import com.google.codeu.data.Restaurant;
import com.google.gson.Gson;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;
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
  private String apiKey = "AIzaSyAi9TMtkY74gzfmjPkD7w1Tu-zyABHYlww";

  @Override
  public void init() {
    datastore = new Datastore();
  }

  /** Respond by returning a new list of Restaurants in JSON. */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    Map<String, Map<String, Map<Double, Double>>> restaurants = datastore.getRestaurants();
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
    // Find the coords of the address
    Double[] coord = new Double[2];
    try {
      coord = this.lookupCoord(address);
    } catch (ApiException | InterruptedException | IOException a) {
      response.sendRedirect("/feed");
      return;
    }
    Double restLat = coord[0];
    Double restLng = coord[1];
    Restaurant restaurant = new Restaurant(name, address, bio, restLat, restLng);
    datastore.storeRestaurant(restaurant);

    // Create a post if the user is logged in
    UserService userService = UserServiceFactory.getUserService();
    if (userService.isUserLoggedIn()) {
      String user = userService.getCurrentUser().getEmail();
      String userText = "I added one of my favorite restaurants!\n" + name + ": " + bio;
      Message message = new Message(user, userText);
      datastore.storeMessage(message);
    } else {
      String user = "Guest";
      String userText = "I added one of my favorite restaurants!\n" + name + ": " + bio;
      Message message = new Message(user, userText);
      datastore.storeMessage(message);
    }

    response.sendRedirect("/feed");
  }

  /** Will return a 2 element array of the latitude and longitude of an address. */
  public Double[] lookupCoord(String address)
      throws ApiException, InterruptedException, IOException {
    // set up key
    GeoApiContext geocoder = new GeoApiContext.Builder().apiKey(apiKey).build();
    GeocodingResult[] results = GeocodingApi.geocode(geocoder, address).await();

    // converts results into usable Coordinates
    Double[] coord = new Double[2];
    coord[0] = results[0].geometry.location.lat;
    coord[1] = results[0].geometry.location.lng;
    return coord;
  }
}
