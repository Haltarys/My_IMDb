import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBcUJ_nDgY3nU9xS1x-EerVS63_dFMaoPU',
    authDomain: 'my-imdb-films.firebaseapp.com',
    projectId: 'my-imdb-films',
    storageBucket: 'my-imdb-films.appspot.com',
    messagingSenderId: '641102287883',
    appId: '1:641102287883:web:216086183df2adf4de230e',
  });
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { firebase, auth, firestore };
