import React, { useEffect, useState } from "react"
import { Switch, Route, Link } from "react-router-dom"
import * as FontAwesome from 'react-icons/fa'
import * as AntDesign from 'react-icons/ai'

import LandingPage from "./LandingPage"
import { SidebarData } from "./SidebarData"

const NavBar = (props) => {
  let previous = props.location.previous
  if (previous && previous.includes("/users/")) {
    location.reload()
  }

  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  const [authenticated, setAuthenticated] = useState(false)
  useEffect( () => {
    fetchAuthentication()
  }, [])
  const fetchAuthentication = async () => {
    try {
      const response = await fetch("/api/v1/users", {
        credentials: "same-origin"
      })
      if(!response.ok) {
        throw new Error (`${response.status}: ${response.statusText}`)
      }
      const responseBody = await response.json()
      setAuthenticated(responseBody.authenticated)
    } catch(err) {
      console.log(err)
    }
  }

  const navMenuStatus = sidebar ? "active" : "inactive"

  const sidebarLinks = SidebarData.map( (item, index) => {
    const linkObj = {
      pathname: item.path,
      previous: location.pathname
    }

    return (
      <li key={index} className={item.cName}>
        <Link to={linkObj}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </li>
    )
  })

  let deviseLinks
  if (authenticated) {
    deviseLinks =
      <li key="100" className="nav-text" >
        <a href="/users/sign_out" data-method="DELETE">
          <FontAwesome.FaSignOutAlt onClick={showSidebar} />
          <span>Sign Out</span>
        </a>
      </li>
  } else {
    deviseLinks =
      <>
      <li key="101" className="nav-text">
        <a href="/users/sign_up">
          <AntDesign.AiOutlineForm onClick={showSidebar} />
          <span>Sign Up</span>
        </a>
      </li>
      <li key="102" className="nav-text">
        <a href="/users/sign_in">
          <FontAwesome.FaSignInAlt onClick={showSidebar} />
          <span>Sign In</span>
        </a>
      </li>
      </>
  }
  

  
  return (
    <div>
      <div className="navbar">
        <Link to="#" className='menu-bars'>
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
          {sidebarLinks}
          {deviseLinks}
        </ul>
      </nav>

      <main className={`main ${navMenuStatus}`}>
        <Switch>
          <Route exact path="/" component={LandingPage} lastLocation={location.href}/>
        </Switch>
      </main>
    </div>
  )
}

export default NavBar