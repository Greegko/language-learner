import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAFWI4X4MMsMknvo21eWhfi95b_wY1cuGE",
  authDomain: "vocabulary-builder-5eb6d.firebaseapp.com",
  databaseURL: "https://vocabulary-builder-5eb6d.firebaseio.com",
  projectId: "vocabulary-builder-5eb6d",
  storageBucket: "vocabulary-builder-5eb6d.appspot.com",
  messagingSenderId: "977489599887",
  appId: "1:977489599887:web:51ea3ed9eb9962b2293ffa"
};

export const firebaseApp = firebase.initializeApp(config);
