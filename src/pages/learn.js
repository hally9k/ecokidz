import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "./learn.scss"

const LearnPage = () => {
  return (
    <Layout>
      <SEO title="Learn" />
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
            📚
          </span>
          <span role="img" aria-label="Poop emoji">
            🕵️
          </span>
          <span role="img" aria-label="Poop emoji">
            📚
          </span>
          &nbsp;&nbsp;&nbsp; Learn &nbsp;&nbsp;&nbsp;
          <span role="img" aria-label="Poop emoji">
            📚
          </span>
          <span role="img" aria-label="Poop emoji">
            🕵️
          </span>
          <span role="img" aria-label="Poop emoji">
            📚
          </span>
        </h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <iframe
          title="eco-kidz-playlist"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/videoseries?list=PL_VcGI4mfVtBsYsZFSeEFoIhQsbpryemF"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <br />
        <br />
        <br />
      </div>
    </Layout>
  )
}

export default LearnPage
