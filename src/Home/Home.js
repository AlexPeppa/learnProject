import { NavLink } from "react-router-dom";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navLink}>
        <NavLink className={styles.link} to="/myRouter">MyRouter</NavLink>
      </div>
      <div className={styles.navLink}><NavLink className={styles.link} to="/hooks/*">Hooks</NavLink>
      </div>
    </div>
  );
};

export default Home;
