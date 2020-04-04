import * as firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDgVrlcMVJ14-pV9bm14iM3YZsQFbz15dw",
  authDomain: "burgerqueen-c1f85.firebaseapp.com",
  databaseURL: "https://burgerqueen-c1f85.firebaseio.com",
  projectId: "burgerqueen-c1f85",
  storageBucket: "burgerqueen-c1f85.appspot.com",
  messagingSenderId: "106269167920",
  appId: "1:106269167920:web:11c922efbf53b76d05b8f5"
};
// Initialize Firebase
let app = null;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const StoreDB = firebase.firestore()
export default firebase;
