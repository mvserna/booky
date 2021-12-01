import React from "react"

const BookTile = (props) => {
  const { title, author, cover, description } = props.book

  return (
    <div className="cell card">
      <div className="grid-container card">
        <div className="grid-x grid-margin-x">
          <div className="cell small-2 cover">
            <img src={`https://covers.openlibrary.org/b/id/${cover}.jpg`} ></img>
          </div>
          <div className="cell auto info">
            <div className="title">{title}</div>
            <div className="author">{author}</div>
            <div className="description">{description}</div>
          </div>
          <div className="cell small-4 text-center actions">
            <div className="grid-y" id="book-tile-buttons">
            <div className="show button">Show</div>
            <div className="move button">Move</div>
            <div className="delete button">Delete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookTile