import React from "react"
import * as AntDesign from 'react-icons/ai'
import * as GameIcons from 'react-icons/gi'

export const SidebarData = [
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
];