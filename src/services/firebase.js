import firebase from "firebase";
const config = {
 
  apiKey: "AIzaSyAy09yXdbLgOqAmTeEXCAZnzIDEgmPaKjY",
  authDomain: "database-41842.firebaseapp.com",
  databaseURL: "https://database-41842-default-rtdb.firebaseio.com",
  
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();