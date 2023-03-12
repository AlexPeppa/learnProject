import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home/Home";
import Hooks from "./Hooks/Hooks";
import MyRouter from "./MyRouter/MyRouter";
import a from "./App.module.css";
import "./App.css";
import UseState from "./Hooks/useState/UseState";
import UseEffect from "./Hooks/useEffect/UseEffect";

const App = () => {
  return (
    <div className="wrapper">
      <div className={a.navLink}>
        <NavLink className={a.link} to="/">Home</NavLink>
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
