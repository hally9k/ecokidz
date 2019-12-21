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
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

let db

if (typeof window !== "undefined") {
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

const IndexPage = ({ google }) => {
  const ref = useRef()
  const [placesService, setPlacesService] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [offenceDescription, setOffenceDescription] = useState("")
  const [doneMessage, setDoneMessage] = useState("")

  useEffect(() => {
    // const map = new google.maps.Map()
    const p = new google.maps.places.PlacesService(ref.current)
    setPlacesService(p)
  }, [google])

  function handleClick() {
    db.collection("hallofshame")
      .add({
        place: selectedPlace.name,
        placeId: selectedPlace.id,
        offence: offenceDescription,
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id)
        setDoneMessage("Well done! Offence reported.")
        setSelectedPlace(null)
        setOffenceDescription("")
      })
      .catch(function(error) {
        console.error("Error adding document: ", error)
      })
  }

  function handleChange(event) {
    const value = event.currentTarget.value

    setDoneMessage("")

    setOffenceDescription(value)
  }

  return (
    <Layout>
      <SEO title="Home" />
      {placesService && (
        <PlaceSearch
          google={google}
          placesService={placesService}
          onChange={setSelectedPlace}
        />
      )}

      <br />

      <TextField
        value={offenceDescription}
        onChange={handleChange}
        fullWidth={true}
        placeholder="Write a description of the eco offences commited here..."
      />
      <br />
      <br />

      <div ref={ref} />

      <Button
        onClick={handleClick}
        fullWidth={true}
        color="primary"
        variant="contained"
      >
        Report
      </Button>
      <br />
      <br />

      <p style={{ textAlign: "center" }}>{doneMessage}</p>

      <br />
      <br />

      <br />

      {/* <button onClick={handleClick}>Click Me</button> */}
      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDGiZZhGkpu990J3HoSTAT9btVP_a0C5RQ",
  libraries: ["places"],
})(IndexPage)
