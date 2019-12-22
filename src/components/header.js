import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      // background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        border: `5px dotted blue`,
      }}
    >
      <h1 style={{ margin: 0, textAlign: "center" }}>
        <Link
          to="/"
          style={{
            color: `red`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <div style={{ width: "100%", textAlign: "center", marginTop: "1rem" }}>
      <Link
        to="/"
        style={{
          color: `blue`,
          textDecoration: `none`,
          cursor: "pointer",
        }}
      >
        Report Plastic
      </Link>
      &nbsp; &nbsp; &nbsp;
      <span>•</span>
      &nbsp; &nbsp; &nbsp;
      <Link
        to="/hall-of-shame"
        style={{
          color: `blue`,
          textDecoration: `none`,
          cursor: "pointer",
        }}
      >
        Hall of Shame
      </Link>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
