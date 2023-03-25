import styles from "./car.module.css";
import {Timer} from '../Timer/Timer';


export const Car = (props) => {
  const car = props.cars.reduce((selectCar, currentCar) => {
    if (props.state.code === currentCar.code) {
      return currentCar;
    }
    return selectCar;
  }, {});

  return (
    <div className={styles.wrapper}>
      <div >
        <h1 className={styles.name}>{car.name}</h1>
        <hr />
        <div className={styles.text}>
          <p>State : {car.description.state}</p>
          <div className={styles.timer}><Timer props={props} /></div> 
          <p>Founded : {car.description.founded}</p>
        </div>
        <div>
          <p>{car.description.text}</p>
        </div>
        <div className={styles.marks}>
          <h3>Marks :</h3>
          {car.description.models.map((i) => (
            <ul key={i.code}>
              <li key={i.code} className={styles.li}>
                {i}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
