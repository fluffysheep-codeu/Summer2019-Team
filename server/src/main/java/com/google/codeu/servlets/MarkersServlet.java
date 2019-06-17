package com.google.codeu.servlets;

import com.google.codeu.data.Datastore;
import com.google.gson.JsonObject;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Handles adding markers to a react google map. */
@WebServlet("/api/markers")
public class MarkersServlet extends HttpServlet {

  /** Respond by returning a new list of markers in JSON. */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    JsonObject jsonObject = new JsonObject();
  }
}
