import styles from "./car.module.css";
import { Timer } from '../Timer/Timer';


export const Car = ({car}) => {
  return (
    <div className={styles.wrapper}>
      <div >
        <h1 className={styles.name}>{car.name}</h1>
        <hr />
        <div className={styles.text}>
          <p>State : {car.description.state}</p>
          <div className={styles.timer}><Timer car={car.code}/></div>
          <p>Founded : {car.description.founded}</p>
        </div>
        <div>
          <p>{car.description.text}</p>
        </div>
        <div className={styles.marks}>
          <h3>Marks :</h3>
          {car.description.models.map((model) => (
            <ul key={model}>
              <li className={styles.li}>{model}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
