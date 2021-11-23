import React, { useEffect, useState } from "react"
import { Switch, Route, Link } from "react-router-dom"
import * as FontAwesome from "react-icons/fa"
import * as AntDesign from "react-icons/ai"

import LandingPage from "./LandingPage"
import SidebarTiles from "./SidebarTiles"

const NavBar = (props) => {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)
  const navMenuStatus = sidebar ? "active" : "inactive"

  const [authenticated, setAuthenticated] = useState(false)

  const fetchAuthentication = async () => {
    try {
      const response = await fetch("/api/v1/users", {
        credentials: "same-origin",
      })
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`)
      }
      const responseBody = await response.json()
      setAuthenticated(responseBody.authenticated)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAuthentication()
  }, [])

  return (
    <div>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FontAwesome.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={`nav-menu ${navMenuStatus}`}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AntDesign.AiOutlineClose />
            </Link>
          </li>
          <SidebarTiles
            location={props.location}
            authenticated={authenticated}
            showSidebar={showSidebar}
          />
        </ul>
      </nav>

      <main className={`main ${navMenuStatus}`}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </main>
    </div>
  )
}

export default NavBar
