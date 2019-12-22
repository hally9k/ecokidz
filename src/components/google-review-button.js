import React from "react"
import Button from "@material-ui/core/Button"
import GoogleLogo from "../components/google-logo"

export function GoogleReviewButton({ placeName, placeId, buttonText }) {
  function leaveReview() {
    window.open(
      `https://search.google.com/local/writereview?placeid=${placeId}`,
      "_blank"
    )
  }

  return (
    <Button variant="outlined" onClick={leaveReview} startIcon={<GoogleLogo />}>
      {buttonText || `Leave a google review for ${placeName}`}
    </Button>
  )
}
