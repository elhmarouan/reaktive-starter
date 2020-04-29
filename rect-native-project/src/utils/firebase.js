import * as firebase from 'firebase';

firebase.initializeApp(Expo.Constants.manifest.extra.firebaseConfig);

export default firebase;