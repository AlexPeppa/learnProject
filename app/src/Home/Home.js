import { NavLink } from "react-router-dom";
import h from "./home.module.css";

const Home = () => {
  return (
    <div className={h.wrapper}>
      <div className={h.navLink}>
        <NavLink className={h.link} to="/myRouter">MyRouter</NavLink>
      </div>
      <div className={h.navLink}><NavLink className={h.link} to="/hooks/*">Hooks</NavLink>
      </div>
    </div>
  );
};

export default Home;
