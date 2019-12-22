import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import db from "../data/firestore"
import uniqBy from "lodash/uniqBy"
import { GoogleReviewButton } from "../components/google-review-button"

import "./hall-of-shame.scss"

const HallOfShamePage = ({ google }) => {
  const [allShamed, setAllShamed] = useState([])

  useEffect(() => {
    db.collection("hallofshame")
      .get()
      .then(function(response) {
        console.log(response.docs)

        const data = (response.docs || []).map(d => d.data())

        console.log(data)

        setAllShamed(uniqBy(data, "placeId"))
      })

      .catch(function(error) {
        console.log("Error getting document:", error)
      })
  }, [])

  return (
    <Layout>
      <SEO title="Hall of Shame" />
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="hall-of-shame"
      >
        <h1
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: "4rem",
            marginTop: "2rem",
          }}
        >
          <span role="img" aria-label="Poop emoji">
            🚫
          </span>
          <span role="img" aria-label="Poop emoji">
            🙅
          </span>
          <span role="img" aria-label="Poop emoji">
            🚫
          </span>
          &nbsp;&nbsp;&nbsp; Hall of Shame &nbsp;&nbsp;&nbsp;
          <span role="img" aria-label="Poop emoji">
            🚫
          </span>
          <span role="img" aria-label="Poop emoji">
            🙅
          </span>
          <span role="img" aria-label="Poop emoji">
            🚫
          </span>
        </h1>
        {allShamed.map(({ place, placeId, offence }) => (
          <div
            key={placeId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
              borderBottom: "1px solid silver",
            }}
          >
            <p className="place-name">
              <span role="img" aria-label="Poop emoji">
                💩
              </span>
              &nbsp;
              {place}
            </p>
            <p className="offence">{offence}</p>
            <GoogleReviewButton
              placeName={place}
              placeId={placeId}
              buttonText="Review"
            />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default HallOfShamePage
