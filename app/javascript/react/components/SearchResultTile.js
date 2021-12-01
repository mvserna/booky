import React from "react"

const SearchResultTile = (props) => {
  const { cover, title, authors } = props.book
  const authorList = authors ? authors.join(", ") : ""

  return(
    <div >
      <div className="search-result-cover">
        <img src={`https://covers.openlibrary.org/b/id/${cover}.jpg`} ></img>
      </div>
      <div className="search-result-body">
        <h4 className="search-result-title">{title}</h4>
        <p className="search-result-author">by {authorList}</p>
      </div>
    </div>
  )
}

export default SearchResultTile