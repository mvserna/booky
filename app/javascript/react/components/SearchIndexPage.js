import React from "react"
import { Link } from "react-router-dom"

import SearchResultTile from "./SearchResultTile"

const SearchIndexPage = (props) => {
  const SearchResultsComponents = props.results.map( (work) => {
    const authors = work.authors ? work.authors.join(", ") : ""

    return (
      <Link 
        to={{
          pathname: `/search/${work.key}`,
          state: {
            authors: authors
          }
        }}
        className="cell small-3 search-result" >
        <SearchResultTile key={work.key} book={work} />
      </Link>
    )
  })

  return (
    <div className="grid-container">
      <div className="grid-x">
        <div className="callout secondary search-results-container">
          <h3>First, let's narrow it down</h3>
          <h4 className="subheader">Choose the closest, or the first:</h4>
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

export default SearchIndexPage