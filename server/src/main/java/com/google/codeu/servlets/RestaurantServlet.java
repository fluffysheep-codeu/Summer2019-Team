package com.google.codeu.servlets;

import com.google.gson.JsonObject;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Handles adding a restaurant from a user to datastore. */
@WebServlet("/api/restaurant")
public class RestaurantServlet extends HttpServlet {

  /** Respond by storing the name and location of a Restaurant. */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    JsonObject jsonObject = new JsonObject();
  }
}
