import React, { useState, useEffect } from "react"

import BookTile from "./BookTile"

const BooksIndexPage = (props) => {
  const [books, setBooks] = useState([])

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/v1/books", {
        credentials: "same-origin",
      })
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`)
      }
      const responseBody = await response.json()
      setBooks(responseBody.books)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect( () => {
    fetchBooks()
  }, [])

  const booksComponents = books.map( (book) => {
    return (
      <BookTile key={book.id} book={book} />
    )
  })

  return (
    <div className="grid-container">
      <div className="grid-y grid-margin-y grid-padding-y">
      {booksComponents}
      </div>
    </div>
  )
}

export default BooksIndexPage