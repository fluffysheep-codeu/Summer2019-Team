import youtubeIcon from 'statics/images/youtubeIcon.png';
import stanTrex from 'statics/images/stanTrex.png';
import bikeIcon from 'statics/images/bikeIcon.svg';

/** Map of all the markers and the information about them */
const ALL_MARKERS = {
  1: {
    name: 'Google West Campus',
    coord: { lat: 37.423829, lng: -122.092154 },
    description: 'Google West Campus is home to YouTube and Maps.',
    icon: youtubeIcon,
    iconSize: { x: 25, y: 18 }
  },
  2: {
    name: 'Stan the T-Rex',
    coord: { lat: 37.421903, lng: -122.084674 },
    description: 'This is Stan, the T-Rex statue.',
    icon: stanTrex,
    iconSize: { x: 40, y: 40 }
  },
  3: {
    name: 'Permanente Creek Trail',
    coord: { lat: 37.420919, lng: -122.086619 },
    description:
      'Permanente Creek Trail connects Google to a system of bike trails.',
    icon: bikeIcon,
    iconSize: { x: 30, y: 30 }
  },
  keys: [1, 2, 3]
};

export default ALL_MARKERS;
