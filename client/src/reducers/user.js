/** An enumeration of actions to modify user data. */
const UserActions = {
  SET_USER: 1
};

/** Client representation of a user. */
class User {
  constructor(isLoggedOn, email) {
    /** Whether the user is logged on. */
    this.isLoggedOn = isLoggedOn;

    /** The email of the user. */
    this.email = email;
  }
}

/**
 * @param user The new user state.
 * @return An action to set the user.
 */
const setUser = function(user) {
  return {
    type: UserActions.SET_USER,
    user
  };
};

/**
 * Sets the redux user to the user state.
 *
 * @param state The previous state of the user.
 * @param action.user The new state of the user.
 * @return The new state of the user.
 */
const handleSetUser = function(state, action) {
  return Object.assign({}, state, action.user);
};

/** The initial state of the user when the page first loads. */
const initalUserState = new User(false, null);

/**
 * A reducer that handles actions on the state of the user.
 * @param state The state of the user.
 * @param action Some action to perform on the user.
 * @param action.type The type of action to perform on the user.
 */
const userReducer = function(state = initalUserState, action) {
  switch (action.type) {
    case UserActions.SET_USER:
      return handleSetUser(state, action);
    default:
      return state;
  }
};

/** Classes and Constants */
export default User;

/** Constants */
export { UserActions };

/** Actions */
export { setUser };

/** Reducers */
export { userReducer };
