import { Routes, Route, NavLink } from "react-router-dom";
import styles from "./App.module.css";
import { Cars, HobbyGeneration, Home, Characters, MyRouter } from "./containers";
import React from "react";

export const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navLink}>
        <NavLink className={styles.link} to="/">
          Home
        </NavLink>
      </div>
      <Routes>
        <Route path="/myRouter" element={<MyRouter />} />
        <Route path="/cars/*" element={<Cars />} />
        <Route path="/hobbyGeneration" element={<HobbyGeneration />} />
        <Route path="/" element={<Home />} />
        <Route path="/Characters" element={<Characters />} />
      </Routes>
    </div>
  );
};
