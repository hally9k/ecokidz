import * as firebase from "firebase/app"

let db = null

if (typeof window !== "undefined") {
  require("firebase/firestore")
  require("firebase/analytics")

  var firebaseConfig = {
    apiKey: "AIzaSyAqq41i_fzZC0_Z8Ulcq5oSI_hH8VgeJ_Y",
    authDomain: "ecokidz-ce7c7.firebaseapp.com",
    databaseURL: "https://ecokidz-ce7c7.firebaseio.com",
    projectId: "ecokidz-ce7c7",
    storageBucket: "ecokidz-ce7c7.appspot.com",
    messagingSenderId: "124254874957",
    appId: "1:124254874957:web:8895a2dfb2d04dd7a39b04",
    measurementId: "G-3KZNN5G719",
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()

  db = firebase.firestore()
}

export default db
