/**
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import brianPic from 'statics/images/brianPic.jpeg';

/** A contributor to this project. */
class Contributor {
  constructor(name, description, profilePic) {
    /** The display name of the contributor. */
    this.name = name;

    /** A description of the contributor. */
    this.description = description;

    /** A profile image of the contributor. */
    this.profilePic = profilePic;
  }

  /** Prints the object in json format. */
  toJson() {
    const { name, description, profilePic } = this;
    return { name, description, profilePic };
  }
}

/** Map of all contributors. */
const initialContributorsState = {
  1: new Contributor(
    'Brian Chen (Project Advisor)',
    'Hi I am Brian the PA for Team 30. I work on Stadia at Google. I enjoy ' +
      'playing video games, eating, and sleeping. I was primarily an Android ' +
      'developer but I have since expanded my experience to include Web, iOS,' +
      'and server code in both C++ and Java. I enjoy watching TV shows and ' +
      'have been pretty disappointed by the last season of GOT (thusfar). ' +
      'One day I want to open a restaurant, but I do not know how to cook ' +
      'well so...',
    brianPic
  ).toJson(),
  2: new Contributor(
    'Alex Kim',
    'Hi I am Alex. I am a rising junior at Rensselaer Polytechnic Institute, ' +
      'studying Computer Science and Mathematics. My interests within CS ' +
      'field is mostly Machine Learning, Deep Learning, and Data Analytics. ' +
      'The math theory behind models and neural nets is what I find the most ' +
      'interesting. Other interests include Ice Hockey, Golf, Cooking, and ' +
      'video games. I also love to read about comics and have an obsession ' +
      'with the Marvel Cinematic Universe.'
  ).toJson(),
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
