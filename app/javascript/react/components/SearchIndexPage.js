import React from "react"
import { Link } from "react-router-dom"

import SearchResultTile from "./SearchResultTile"

const SearchIndexPage = (props) => {
  const SearchResultsComponents = props.results.map( (work) => {
    return (
      <Link to={`/search/${work.key}`} className="cell small-3 search-result">
        <SearchResultTile key={work.key} book={work} />
      </Link>
    )
  })

  return (
    <div className="grid-container">
      <div className="grid-x">
        <div className="callout secondary search-results-container">
          <h3>Top Search Results</h3>
          <h4 className="subheader">Select the right work</h4>
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