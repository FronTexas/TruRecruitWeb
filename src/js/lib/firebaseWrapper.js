import firebase from 'firebase';

let config = 
{	
  apiKey: "AIzaSyCOwfUwf2-GqcacgkBopnwXb8-HG5Km7hY",
  authDomain: "trurecruit-dd63b.firebaseapp.com",
  databaseURL: "https://trurecruit-dd63b.firebaseio.com",
  storageBucket: "trurecruit-dd63b.appspot.com",
  messagingSenderId: "117008567602"
};

//the root app just in case we need it
export const firebaseRef = firebase.initializeApp(config);

export const db = firebaseRef.database(); //the real-time database
export const auth = firebaseRef.auth(); //the firebase auth namespace

export const storageKey = 'KEY_FOR_LOCAL_STORAGE';

export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey);
}