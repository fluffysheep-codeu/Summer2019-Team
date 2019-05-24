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
import samPic from 'statics/images/SamsPic2.JPG';
import alexPic from 'statics/images/alexPic.jpg';
import anthonyPic from 'statics/images/anthonyPic.jpg';
/** @return A json representation of our team's contributor. */
const createContributor = function(name, subtitle, description, profilePic) {
  return { name, subtitle, description, profilePic };
};

/** Map of all contributors. */
const initialContributorsState = {
  1: createContributor(
    'Brian Chen (Project Advisor)',
    'linkedin.com/brianyiingchen',
    'Hi I am Brian the PA for Team 30. I work on Stadia at Google. I enjoy ' +
      'playing video games, eating, and sleeping. I was primarily an Android ' +
      'developer but I have since expanded my experience to include Web, iOS,' +
      'and server code in both C++ and Java. I enjoy watching TV shows and ' +
      'have been pretty disappointed by the last season of GOT (thusfar). ' +
      'One day I want to open a restaurant, but I do not know how to cook ' +
      'well so...',
    brianPic
  ),
  2: createContributor(
    'Alex Kim',
    'https://www.linkedin.com/in/alexkim123/',
    'Hi I am Alex. I am a rising junior at Rensselaer Polytechnic Institute, ' +
      'studying Computer Science and Mathematics. My interests within CS ' +
      'field is mostly Machine Learning, Deep Learning, and Data Analytics. ' +
      'The math theory behind models and neural nets is what I find the most ' +
      'interesting. Other interests include Ice Hockey, Golf, Cooking, and ' +
      'video games. I also love to read about comics and have an obsession ' +
      'with the Marvel Cinematic Universe.',
    alexPic
  ),
  3: createContributor(
    'Samantha Rydzewski',
    'https://www.linkedin.com/in/samantharydzewski/',
    'Hi, I am Samantha and I am a rising junior at Amherst College studying Computer' +
      'Science. I am interested in Machine Learning, AI, and I am excited to' +
      'learn web development. Outside of academics I enjoy dancing and figure skating,' +
      'I also love reading sci-fi novels and watching reality TV.',
    samPic
  ),
  4: createContributor(
     'Anthony Edwards',
     'https://www.linkedin.com/in/antedw',
     'Hi, I am Anthony, a junior attending the illustrious Johnson C. Smith University '+
      'studying Computer Engineering, Mathematics, & Cybersecurity. I am interested in '+
      'using Data Analytics to improve communities and web development.I am interested in '+
      'music, food, and reading.',
    anthonyPic
  ),
  5: createContributor('Teammate D Name', null, null, null),
  keys: [1, 2, 3, 4, 5]
};

/**
 * A reducer that handles actions on the state of the contributor.
 * @param state The state of contributors.
 */
const contributorsReducer = function(state = initialContributorsState) {
  return state;
};

export default contributorsReducer;
