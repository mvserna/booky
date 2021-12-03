import React, { useState, useEffect } from "react"
import { Redirect } from "react-router"

import SearchResultTile from "./SearchResultTile"

const SearchShowPage = (props) => {
  const [editions, setEditions] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    fetchEditions()
  }, [])

  if (shouldRedirect) {
    console.log("Should Redirect")
    return <Redirect to="/books" />
  }
  
  const fetchEditions = async () => {
    try {
      const response = await fetch(`/api/v1/search/${props.match.params.id}`, {
        credentials: "same-origin",
      })
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`)
      }
      const responseBody = await response.json()
      setEditions(responseBody)
      console.log(responseBody)
    } catch (err) {
      console.log(err)
    }
  }

  const addBookHandler = async (event) => {
      event.preventDefault()
      const payload = JSON.stringify({
        book_key: event.currentTarget.id,
        authors: props.location.state.authors
      })
      try {
        const response = await fetch("/api/v1/books", {
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        })
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          throw new Error(errorMessage)
        }
        const responseBody = await response.json()
        console.log(responseBody)
        setShouldRedirect(true)
      } catch (error) {
        console.error(`Error in Fetch: ${error.message}`)
      }
  }

  const SearchResultsComponents = editions.map((edition) => {
    
    return (
      <div className="cell small-3 search-result" id={edition.open_library_edition_key} onClick={addBookHandler} authors={edition.authors}>
        <SearchResultTile
          key={edition.open_library_edition_key}
          book={{
            cover: edition.covers[0],
            title: edition.title,
            authors: props.location.state.authors
          }}
        />
      </div>
    )
  })

  return (
    <div className="grid-container">
      <div className="grid-x">
        <div className="callout secondary search-results-container">
          <h3>Now, let's find the right book</h3>
          <div className="grid-container">
            <div className="grid-x grid-margin-x grid-padding-x">
              {SearchResultsComponents}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchShowPage
