import React, { FC } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink } from "react-router-dom";
import style from "./breadCrumb.module.css";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

type Props = {
  name?: string;
};

export const Breadcrumb: FC<Props> = ({ name }) => {
  return (
    <div className={style.breadcrumb} role="presentation" onClick={handleClick}>
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        <NavLink className={style.navLink} to="/Characters">
          Characters
        </NavLink>
        {name ? (
          <NavLink className={style.navLink} to={`/Characters/${name?.replaceAll(" ", "_")}`}>
            {name}
          </NavLink>
        ) : (
          ""
        )}
      </Breadcrumbs>
    </div>
  );
};
