import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home/Home";
import MyRouter from "./MyRouter/MyRouter";
import styles from "./App.module.css";
import { Cars } from "./Cars/Cars";





const App = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navLink}>
        <NavLink className={styles.link} to="/">Home</NavLink>
      </div>
      <Routes>
        <Route path="/myRouter" element={<MyRouter />} />
        <Route path="/cars/*" element={<Cars />} />
        <Route path="/" element={<Home />} />      
      </Routes>
    </div>
  );
};

export default App;
