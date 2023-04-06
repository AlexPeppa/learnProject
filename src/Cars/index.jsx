import {  useMemo, useState } from "react";
import { Car } from "./Car/Car";
import { cars } from "./constants";
import styles from "./cars.module.css";

export const Cars = () => {
  const [carMode,setCarMode] = useState('READ')
  const [carsState, setCarsState] = useState(cars)
  const [selectedCar, setSelectedCar] = useState("BMW");
  const carsArr = useMemo(() => Object.values(carsState), [])




console.log(carsState)

 
  return (
    <div styles = {{color:'red'}} className={styles.wrapper}>

      {carsArr.map((car) => (
        <ul key={car.id}><li  onClick={()=>setSelectedCar(car.code)} className={`${styles.li} ${selectedCar === car.code ? styles.select : null}`}>{car.name}</li></ul>
      ))}

      <Car  {...cars[selectedCar]} setCarsState={setCarsState}  carMode={carMode}  setCarMode={setCarMode}  />

    </div>
  );
};

