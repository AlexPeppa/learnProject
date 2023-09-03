import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home/Home";
import MyRouter from "./MyRouter/MyRouter";
import  styles from "./App.module.css";
import { Cars } from "./Cars";
import React from "react";
import { HobbyGeneration } from "./HobbyGeneration/HobbyGeneration";

export const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navLink}>
        <NavLink className={styles.link} to="/">Home</NavLink>
      </div>
      <Routes>
        <Route path="/myRouter" element={<MyRouter />} />
        <Route path="/cars/*" element={<Cars />} />
        <Route path="/hobbyGeneration" element={<HobbyGeneration />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};
