import styles from "./car.module.css";
import { Timer } from '../Timer/Timer';


export const Car = ({description,name,code}) => {
  return (
    <div className={styles.wrapper}>
      <div >
        <h1 className={styles.name}>{name}</h1>
        <hr />
        <div className={styles.text}>
          <p>State : {description.state}</p>
          <div className={styles.timer}><Timer carCode={code}/></div>
          <p>Founded : {description.founded}</p>
        </div>
        <div>
          <p>{description.text}</p>
        </div>
        <div className={styles.marks}>
          <h3>Marks :</h3>
          {description.models.map((model) => (
            <ul key={model}>
              <li className={styles.li}>{model}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
