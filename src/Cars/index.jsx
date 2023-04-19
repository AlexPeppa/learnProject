import { useMemo, useState } from "react";
import { Car } from "./Car/Car";
import { cars } from "./constants";
import styles from "./cars.module.css";
import { Button } from "@mui/material";
import { CreateCar } from "./CreateCar/CreateCar";

export const Cars = () => {
  const [carMode, setCarMode] = useState('READ')
  const [carsState, setCarsState] = useState(cars)
  const [selectedCar, setSelectedCar] = useState("BMW");
  const carsArr = useMemo(() => Object.values(carsState), [carsState])

  const canCreate = carMode === 'CREATE';

  const createCar = () => {
    setCarMode('CREATE')
  }

  return (
    <div styles={{ color: 'red' }} className={styles.wrapper}>

      {canCreate ? <div> <CreateCar setCarsState={setCarsState} setCarMode={setCarMode} /> </div> :
        <div className={styles.carInfo} >
          <div> <Button style={{ color: 'black', border: '1px solid black', marginLeft: '50px' }} onClick={createCar} variant="outlined" >Create car</Button>
            {carsArr.map((car) => (
              <ul key={car.id}><li onClick={() => setSelectedCar(car.code)} className={`${styles.li} ${selectedCar === car.code ? styles.select : null}`}>{car.name}</li></ul>
            ))}</div>
          <div className={styles.car} > <Car car={carsState[selectedCar]} setCarsState={setCarsState} carMode={carMode} setCarMode={setCarMode} /></div>
        </div>}
    </div>
  );
};

