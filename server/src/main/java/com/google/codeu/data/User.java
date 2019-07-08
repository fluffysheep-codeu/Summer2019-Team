package com.google.codeu.data;

public class User {

  private String email;
  private String aboutMe;
  private String profilePic;

  public User(String email, String aboutMe) {
    this.email = email;
    this.aboutMe = aboutMe;
    this.profilePic = "";
  }

  /**
   * Constructs a new User.
   *
   * @param email The email of the user.
   * @param aboutMe The user's bio.
   * @param pic The profile picture of the user.
   */
  public User(String email, String aboutMe, String pic) {
    this.email = email;
    this.aboutMe = aboutMe;
    this.profilePic = pic;
  }

  public String getEmail() {
    return email;
  }

  public String getAboutMe() {
    return aboutMe;
  }

  public String getProfilePic() {
    return profilePic;
  }
}
