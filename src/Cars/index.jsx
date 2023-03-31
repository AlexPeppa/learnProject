import {  useMemo, useState } from "react";
import { Car } from "./Car/Car";
import { cars } from "./constants";
import styles from "./cars.module.css";

export const Cars = () => {
  const [selectCar, setSelectCar] = useState("BMW");
  const carsArr = useMemo(() => Object.values(cars), [])

  return (
    <div className={styles.wrapper}>

      {carsArr.map((car) => (
        <ul key={car.id}><li  onClick={()=>setSelectCar(car.code)} className={`${styles.li} ${selectCar === car.code ? styles.select : null}`}>{car.name}</li></ul>
      ))}

      <Car {...cars[selectCar]} />

    </div>
  );
};

