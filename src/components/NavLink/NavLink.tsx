import { cn } from "@bem-react/classname";
import React from "react"

import { NavLink as NavLinkBase, NavLinkProps } from "react-router-dom";

import './NavLink.scss'

export interface INavLinkProps extends NavLinkProps {

}

const navLinkCn = cn('NavLink');

export const NavLink: React.FC<INavLinkProps> = (props) => {
  return (
    <NavLinkBase
      {...props}
      className={(params) => navLinkCn({ Active: params.isActive }, [props.className as string])}
    >
      {props.children}
    </NavLinkBase>
  )
};
