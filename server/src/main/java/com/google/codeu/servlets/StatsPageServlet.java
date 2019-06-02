package com.google.codeu.servlets;

import com.google.codeu.data.Datastore;
import com.google.gson.JsonObject;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Handles fetching the statistics for the site. */
@WebServlet("/api/stats")
public class StatsPageServlet extends HttpServlet {

  private Datastore datastore;

  @Override
  public void init() {
    datastore = new Datastore();
  }

  /** Respond by sending site stats in JSON. */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    JsonObject jsonObject = new JsonObject();
    int totMessageCount = datastore.getTotalMessageCount();
    jsonObject.addProperty("messageCount", totMessageCount);
    response.setContentType("application/json");
    response.getWriter().println(jsonObject.toString());
  }
}
