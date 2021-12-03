import React, { useEffect, useState } from "react"
import { Switch, Route, Link } from "react-router-dom"
import * as FontAwesome from "react-icons/fa"
import * as AntDesign from "react-icons/ai"

import LandingPage from "./LandingPage"
import SidebarContainer from "./SidebarContainer"
import BooksIndexPage from "./BooksIndexPage"
import fetchAuthentication from "./fetchAuthentication"
import SearchBar from "./SearchBar"
import SearchIndexPage from "./SearchIndexPage"
import SearchShowPage from "./SearchShowPage"

const NavBar = (props) => {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)
  const navMenuStatus = sidebar ? "active" : "inactive"

  const [authenticated, setAuthenticated] = useState(false)

  const [search, setSearch] = useState({
    redirect: false,
    query: "",
    results: []
  })

  useEffect(() => {
    fetchAuthentication(setAuthenticated)
  }, [])
  
  return (
    <div>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FontAwesome.FaBars onClick={showSidebar} />
        </Link>
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <nav className={`nav-menu ${navMenuStatus}`}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AntDesign.AiOutlineClose />
            </Link>
          </li>
          <SidebarContainer
            location={props.location}
            authenticated={authenticated}
            showSidebar={showSidebar}
          />
        </ul>
      </nav>

      <main className={`main ${navMenuStatus}`}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/books" component={BooksIndexPage} authenticated={authenticated} />
          <Route exact path="/search" render={(props) => <SearchIndexPage results={search.results}/>} />
          <Route exact path="/search/:id" component={SearchShowPage} />
        </Switch>
      </main>
    </div>
  )
}

export default NavBar
