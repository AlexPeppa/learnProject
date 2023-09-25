import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import style from "./breadCrumb.module.css";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export const Breadcrumb = () => {
  const location = useLocation();
  let currentLink: string = "";

  const crumb = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <div key={currentLink}>
          <NavLink className={style.navLink} to={currentLink}>
            {crumb}
          </NavLink>
        </div>
      );
    });
  return (
    <div className={style.breadcrumb} role="presentation" onClick={handleClick}>
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        {crumb}
      </Breadcrumbs>
    </div>
  );
};
