/** A contributor to this project. */
class Contributor {
  constructor(name, description) {
    /** The display name of the contributor. */
    this.name = name;

    /** A description of the contributor. */
    this.description = description;
  }

  /** Prints the object in json format. */
  toJson() {
    const { name, description } = this;
    return { name, description };
  }
}

/** Map of all contributors. */
const initialContributorsState = {
  1: new Contributor('Brian Chen (Project Advisor)', 'Hi I am Brian').toJson(),
  2: new Contributor('Name1', 'Description').toJson(),
  3: new Contributor('Name2', 'Description').toJson(),
  4: new Contributor('Name3', 'Description').toJson(),
  5: new Contributor('Name4', 'Description').toJson(),
  keys: [1, 2, 3, 4, 5]
};

/**
 * A reducer that handles actions on the state of the contributor.
 * @param state The state of contributors.
 */
const contributorsReducer = function(state = initialContributorsState) {
  return state;
};

export { contributorsReducer };
export default Contributor;
