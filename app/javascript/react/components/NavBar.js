import React, { useState } from "react"
import { Switch, Route, Link } from "react-router-dom"
import * as FontAwesome from 'react-icons/fa'
import * as AntDesign from 'react-icons/ai'

import LandingPage from "./LandingPage"
import { SidebarData } from "./SidebarData"

const NavBar = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  const navMenuStatus = sidebar ? "active" : "inactive"

  const sidebarLinks = SidebarData.map( (item, index) => {
    return (
      <li key={index} className={item.cName}>
        <Link to={item.path}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </li>
    )
  })

  
  
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