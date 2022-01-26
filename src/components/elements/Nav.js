import React from 'react';
import { NavLink } from "react-router-dom";

export const Nav = ({links}) => {
    return(
      links.map((link, index) => (
          <li key={index} className={link.title + "Link titleRed "}><NavLink exact={true}  to={"/" + link.link}>{link.title}</NavLink></li>
        )            
      )
    )
}