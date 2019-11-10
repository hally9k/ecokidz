import React, { useEffect, useState, useRef } from "react"
// import { Link } from "gatsby"
import { GoogleApiWrapper } from "google-maps-react"

import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/analytics"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import { PlaceSearch } from "../components/place-search"

var firebaseConfig = {
  apiKey: "AIzaSyAqq41i_fzZC0_Z8Ulcq5oSI_hH8VgeJ_Y",
  authDomain: "ecokidz-ce7c7.firebaseapp.com",
  databaseURL: "https://ecokidz-ce7c7.firebaseio.com",
  projectId: "ecokidz-ce7c7",
  storageBucket: "ecokidz-ce7c7.appspot.com",
  messagingSenderId: "124254874957",
  appId: "1:124254874957:web:e0ab717231b8d601a39b04",
  measurementId: "G-Q32CFZNXD2",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

const db = firebase.firestore()
let counter = 0

function handleClick() {
  console.log("clicky")
  db.collection("clicks")
    .add({
      count: counter++,
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id)
    })
    .catch(function(error) {
      console.error("Error adding document: ", error)
    })
}

const IndexPage = ({ google }) => {
  const ref = useRef()
  const [placesService, setPlacesService] = useState(null)

  useEffect(() => {
    // const map = new google.maps.Map()
    const p = new google.maps.places.PlacesService(ref.current)
    setPlacesService(p)
  }, [google])

  return (
    <Layout>
      <SEO title="Home" />
      {placesService && (
        <PlaceSearch google={google} placesService={placesService} />
      )}

      <div ref={ref} />

      <button onClick={handleClick}>Click Me</button>
      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBlQEhpQGCvIdDycR2sJ3aiRPDHPNdqT_M",
  libraries: ["places"],
})(IndexPage)
