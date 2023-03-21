import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home/Home";
import Hooks from "./Hooks/Hooks";
import MyRouter from "./MyRouter/MyRouter";
import styles from "./App.module.css";



const App = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navLink}>
        <NavLink className={styles.link} to="/">Home</NavLink>
      </div>
      <Routes>
        <Route path="/myRouter" element={<MyRouter />} />
        <Route path="/hooks/*" element={<Hooks />} />
        <Route path="/" element={<Home />} />      
      </Routes>
    </div>
  );
};

export default App;
