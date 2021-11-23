import React from "react"
import { Link } from "react-router-dom"
import * as FontAwesome from "react-icons/fa"
import * as AntDesign from 'react-icons/ai'
import * as GameIcons from 'react-icons/gi'

const SidebarTiles = (props) => {
  const { location, authenticated, showSidebar } = props
  
  const sidebarData = [
    {
      title: "Home",
      path: "/",
      icon: <AntDesign.AiFillHome />,
      cName: "nav-text"
    },
    {
      title: "Books",
      path: "/works",
      icon: <GameIcons.GiBookshelf />,
      cName: "nav-text"
    }
  ]

  const sidebarLinks = sidebarData.map( (item, index) => {
    if (location.pathname.includes("/users/")) {
      return (
        <li key={index} className={item.cName}>
          <a href={item.path} >
            {item.icon}
            <span>{item.title}</span>
          </a>
        </li>
      )
    } else {
      return (
      <li key={index} className={item.cName}>
        <Link to={item.path}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </li>
      )
    }
  })

  let deviseLinks =
    <li key="100" className="nav-text" >
      <a href="/users/sign_out" data-method="DELETE">
        <FontAwesome.FaSignOutAlt onClick={showSidebar} />
        <span>Sign Out</span>
      </a>
    </li>
  if (!authenticated) {
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
    <>
      {sidebarLinks}
      {deviseLinks}
    </>
  )
}

export default SidebarTiles