import { Routes, Route, NavLink } from 'react-router-dom';
import React from 'react';
import styles from './App.module.css';
import { HobbyGeneration, Cars, Home, MyRouter, RickMorty } from './containers';
import { SelectedCharacter } from './containers/RickMorty/AllCharacters/SelectedCharacter';

export const App: React.FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.navLink}>
      <NavLink className={styles.link} to='/'>
        Home
      </NavLink>
    </div>
    <Routes>
      <Route path='/myRouter' element={<MyRouter />} />
      <Route path='/cars' element={<Cars />} />
      <Route path='/hobbyGeneration' element={<HobbyGeneration />} />
      <Route path='/' element={<Home />} />
      <Route path='/Characters' element={<RickMorty />} />
      <Route path='/Characters/:name/' element={<SelectedCharacter />} />
    </Routes>
  </div>
);
