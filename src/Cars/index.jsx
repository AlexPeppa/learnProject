import {  useMemo, useState } from "react";
import { Car } from "./Car/Car";
import { cars } from "./constants";
import styles from "./cars.module.css";

export const Cars = () => {
  const [state, setState] = useState({ code: "BMW" });
  const carsArr = useMemo(() => Object.values(cars), [])

  return (
    <div className={styles.wrapper}>

      {carsArr.map((car) => (
        <ul key={car.id}><li  onClick={()=>setState({ code: car.code })} className={`${styles.li} ${state.code === car.code ? styles.select : null}`}>{car.name}</li></ul>
      ))}

      <Car car={cars[state.code]} />

    </div>
  );
};

