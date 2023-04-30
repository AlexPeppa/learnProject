import { useEffect, useMemo, useState } from "react";
import { Car } from "./Car/Car";
import { cars } from "./constants";
import styles from "./cars.module.css";
import { Button } from "@mui/material";
import { CreateCar } from "./CreateCar/CreateCar";
import DeleteIcon from '@mui/icons-material/Delete';


export const Cars = () => {
  const [carMode, setCarMode] = useState('READ')
  const [carsState, setCarsState] = useState(cars)
  const [selectedCar, setSelectedCar] = useState("BMW");
  const carsArr = useMemo(() => Object.values(carsState), [carsState])

  const canCreate = carMode === 'CREATE';

  const createCar = () => {
    setCarMode('CREATE')
  }

  const deleteCar = (carCode) => {
    setCarsState((prevState) => {
      if (carCode) {
        delete prevState[carCode]
      }
      return {
        ...prevState
      }
    })
  }

  return (
    <div styles={{ color: 'red' }} className={styles.wrapper}>

      {canCreate ? <div> <CreateCar setCarsState={setCarsState} setCarMode={setCarMode} /> </div> :
        <div className={styles.carInfo} >
          <div className={styles.carSideBar}> <div className={styles.createCarBtn}> <Button style={{ color: 'black', border: '1px solid black' }} onClick={createCar} variant="outlined" >Create car</Button> </div>
            {carsArr.map((car) => (
              <ul key={car.id}><li onClick={() => setSelectedCar(car.code)} className={`${styles.li} ${selectedCar === car.code ? styles.select : null}`} >{car.name} {carMode === 'READ' ? '' : <DeleteIcon className={styles.deleteIcon} onClick={() => deleteCar(car.code)} />} </li></ul>
            ))}
          </div>

          <div className={styles.car} >
            <Car car={carsState[selectedCar]} setCarsState={setCarsState} carMode={carMode} setCarMode={setCarMode} />
          </div>
        </div>}
    </div>
  );
}