import React, { useEffect, useState, useRef } from "react"
import { GoogleApiWrapper } from "google-maps-react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { PlaceSearch } from "../components/place-search"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import GreenTick from "../components/green-tick"
import db from "../data/firestore"
import { GoogleReviewButton } from "../components/google-review-button"

const IndexPage = ({ google }) => {
  const ref = useRef()
  const [placesService, setPlacesService] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [offenceDescription, setOffenceDescription] = useState("")
  const [doneMessage, setDoneMessage] = useState("")

  useEffect(() => {
    const p = new google.maps.places.PlacesService(ref.current)
    setPlacesService(p)
  }, [google])

  function handleClick() {
    console.log(selectedPlace)

    db.collection("hallofshame")
      .add({
        place: selectedPlace.name,
        placeId: selectedPlace.place_id,
        offence: offenceDescription,
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id)
        setDoneMessage("Well done! You are a difference maker!")
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
      <div className="report-form-container">
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

        {doneMessage && (
          <>
            <GreenTick />
            <br />
            <p
              style={{
                textAlign: "center",
                color: "hotpink",
                margin: 0,
                fontWeight: 600,
              }}
            >
              {doneMessage}
            </p>
            <p style={{ margin: 0, fontSize: "50px", lineHeight: "80px" }}>
              <span role="img" aria-label="Sparkles emoji">
                ✨
              </span>
              <span role="img" aria-label="Sparkles emoji">
                ✨
              </span>
              <span role="img" aria-label="Sparkles emoji">
                ✨
              </span>
            </p>
          </>
        )}

        <br />

        {selectedPlace && doneMessage && (
          <GoogleReviewButton
            placeName={selectedPlace.name}
            placeId={selectedPlace.place_id}
          />
        )}

        <br />
        <br />
        <br />
      </div>
    </Layout>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDGiZZhGkpu990J3HoSTAT9btVP_a0C5RQ",
  libraries: ["places"],
})(IndexPage)
