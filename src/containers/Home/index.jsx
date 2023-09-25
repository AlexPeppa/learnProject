import { NavLink } from "react-router-dom";
import styles from "./home.module.css";
import helloPicture from '../Cars/photo/helloPicture.jpg'

export const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navLink}>
        <NavLink className={styles.link} to="/myRouter">MyRouter</NavLink>
        <NavLink className={styles.link} to="/cars">Cars</NavLink>
        <NavLink className={styles.link} to="/hobbyGeneration">Hobby Generation</NavLink>
        <NavLink className={styles.link} to="/Characters/">Rick & Morty </NavLink>
      </div>
      <div>
        <img className={styles.helloPicture} src={helloPicture} alt="helloPicture" />
      </div>
    </div>
  );
};

export default Home;
