/** An enumeration of actions to modify user data. */
const UserActions = {
  SET_IS_FETCHING: 1,
  SET_IS_LOGGED_IN: 2,
  SET_EMAIL: 3
};

/** Client representation of a user. */
class User {
  constructor() {
    /** Whether the user's data is being fetched. */
    this.isFetching = false;

    /** Whether the user is logged on. */
    this.isLoggedIn = false;

    /** The email of the user. */
    this.email = null;
  }

  /** Prints the object in json format. */
  toJson() {
    const { isFetching, isLoggedIn, email } = this;
    return { isFetching, isLoggedIn, email };
  }
}

/**
 * A reducer that handles actions on the state of the user.
 * @param state The state of the user.
 * @param action Some action to perform on the user.
 */
const userReducer = function(state = new User(), action) {
  switch (action.type) {
    case UserActions.SET_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case UserActions.SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.isLoggedIn };
    case UserActions.SET_EMAIL:
      return { ...state, email: action.email };
    default:
      return state;
  }
};

/**
 * Whether the user data is currently be fetched by the server.
 * @param isFetching A boolean of whether the user's data is being fetched.
 * @return An action to store the fetching status.
 */
const setIsFetching = function(isFetching) {
  return {
    type: UserActions.SET_IS_FETCHING,
    isFetching
  };
};

/**
 * @param isLoggedIn A boolean whether the user is logged on.
 * @return An action to store the logged on state.
 */
const setIsLoggedIn = function(isLoggedIn) {
  return {
    type: UserActions.SET_IS_LOGGED_IN,
    isLoggedIn
  };
};

/**
 * @param email A string representing the user's email.
 * @return An action to store the user's email.
 */
const setEmail = function(email) {
  return {
    type: UserActions.SET_EMAIL,
    email
  };
};

/** Classes and Constants */
export default User;

/** Constants */
export { UserActions };

/** Actions */
export { setIsFetching, setIsLoggedIn, setEmail };

/** Reducers */
export { userReducer };
