import React, { useEffect, useState } from "react"
import * as AntDesign from "react-icons/ai"
import { Redirect, useLocation } from "react-router-dom"

const SearchBar = (props) => {
  const { search, setSearch } = props

  const url = useLocation()

  if (search.redirect && !url.pathname.includes("/search/")) {
    return <Redirect push to={`/search/${search.query}`} />
  } else if (search.redirect && url.pathname != "/search") {
    return <Redirect push to="/search" />
  } else if (search.redirect && url.pathname === "/search") {
      setSearch({
      ...search,
      redirect: false
    })
  }

  const handleChange = (event) => {
    const updatedQuery = event.target.value
    setSearch({
      ...search,
      query: updatedQuery
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const isbn = search.query.match( /[0-9,-]{10,13}/ )
    let path = "/api/v1/search"
    if (isbn) {
      path = `/api/v1/search/${isbn[0]}`
    }
    const payload = JSON.stringify({
      query_string: search.query
    })
    try {
      const response = await fetch(path, {
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
      setSearch({
        ...search,
        redirect: true,
        results: responseBody
      })
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <label htmlFor="search">
          <div className="search-bar">
            <AntDesign.AiOutlineSearch id="magnifying-glass" />
            <input
              id="search-field"
              type="text"
              name="q"
              value={search.query}
              onChange={handleChange}
              placeholder="Search for books"
              autoFocus
            />
            <AntDesign.AiOutlineCamera id="camera"/>
          </div>
        </label>
      </form>
    </div>
  )
}

export default SearchBar