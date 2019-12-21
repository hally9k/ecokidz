import React, { useState } from "react"
import PropTypes from "prop-types"
import debounce from "lodash/debounce"
import Downshift from "downshift"
import cn from "classnames"
import distance from "@turf/distance"
import { point } from "@turf/helpers"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import MenuItem from "@material-ui/core/MenuItem"
import InputAdornment from "@material-ui/core/InputAdornment"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

import "./place-search.scss"

const useTextFieldStyles = makeStyles({
  root: {
    backgroundColor: "var(--color-true-white)",
    borderRadius: "var(--radius-l)",
    boxShadow: "var(--shadow-primary)",
    // padding: "0.1rem 0.1rem 0.1rem 1rem",
  },
})

const usePaperStyles = makeStyles({
  root: {
    borderRadius: "var(--radius-l)",
    boxShadow: "var(--shadow-primary)",
  },
})

const useMenuItemStyles = makeStyles({
  root: {
    backgroundColor: "transparent !important",
  },
})

// Component
export function PlaceSearch({
  google,
  placesService,
  onChange,
  userMarker,
  className,
}) {
  const [suggestions, updateSuggestions] = useState([])
  const paperClasses = usePaperStyles()
  const menuItemClasses = useMenuItemStyles()
  const textFieldClasses = useTextFieldStyles()

  // Renderers
  function renderInput(inputProps) {
    const { InputProps, ref, ...other } = inputProps

    return (
      <TextField
        className="input"
        classes={textFieldClasses}
        InputProps={{
          inputRef: ref,
          ...InputProps,
        }}
        {...other}
      />
    )
  }

  function renderSuggestion(suggestionProps) {
    const {
      suggestion,
      index,
      itemProps,
      highlightedIndex,
      selectedItem,
    } = suggestionProps
    const isHighlighted = highlightedIndex === index
    const isSelected =
      selectedItem && selectedItem.name.includes(suggestion.name)
    const distanceString = getDistanceString(userMarker, suggestion)

    return (
      <div className="suggestion-container" key={index}>
        <div className="suggestion-aside">
          <div className="suggestion-icon" />
          {distanceString && <p className="distance">{distanceString}</p>}
        </div>
        <MenuItem
          {...itemProps}
          selected={isHighlighted}
          component="div"
          style={{
            fontWeight: isSelected ? 500 : 400,
          }}
          classes={menuItemClasses}
          className="suggestion"
        >
          <Typography variant="subtitle1" display="block">
            {suggestion.name}
          </Typography>
          <Typography variant="caption" component="p" display="block">
            {suggestion.formatted_address}
          </Typography>
        </MenuItem>
      </div>
    )
  }

  // Handlers
  async function handleSelect(selection) {
    if (onChange) {
      onChange(selection)
    }
  }

  async function handleChange(query) {
    if (query.length < 2) return

    const request = {
      query,
      fields: ["name", "geometry"],
    }

    placesService.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        updateSuggestions(results.slice(0, 5))
      }
    })
  }

  return (
    <div className={cn("search", { [className]: className })}>
      <Downshift
        id="downshift-google-places"
        onChange={handleSelect}
        onInputValueChange={debounce(handleChange, 200)}
        itemToString={item => (item ? item.name : "")}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          isOpen,
          selectedItem,
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder: "Search for the place you want to report...",
          })

          return (
            <div>
              {renderInput({
                fullWidth: true,
                InputProps: {
                  onBlur,
                  onFocus,
                  onChange: handleChange,
                  // disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="start">
                      <i className="search-icon" />
                    </InputAdornment>
                  ),
                },
                inputProps,
              })}

              <div {...getMenuProps()}>
                {isOpen && suggestions && suggestions.length > 0 ? (
                  <Paper classes={paperClasses} className="suggestions">
                    {suggestions.map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion }),
                        highlightedIndex,
                        selectedItem,
                      })
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          )
        }}
      </Downshift>
    </div>
  )
}

PlaceSearch.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  google: PropTypes.shape(),
  placesService: PropTypes.shape(),
  userMarker: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
}

// Helper

function getDistanceString(userMarker, suggestion) {
  if (!userMarker || !suggestion) return ""

  const suggestionDistance = userMarker
    ? getDistance(userMarker, {
        lng: suggestion.geometry.location.lng(),
        lat: suggestion.geometry.location.lat(),
      })
    : null

  return `${
    suggestionDistance < 10
      ? suggestionDistance.toFixed(1)
      : suggestionDistance.toFixed(0)
  } km`
}

function getDistance(latLng1, latLng2) {
  const point1 = getPointFromGoogleLatLng(latLng1)
  const point2 = getPointFromGoogleLatLng(latLng2)

  return distance(point1, point2)
}

function getPointFromGoogleLatLng(latLng) {
  const { lng, lat } = latLng

  return point([lng, lat])
}
