import { useMemo, useState } from "react";
import { Car } from "./Car/Car";
import { cars } from "./constants";
import styles from "./cars.module.css";
import { Button } from "@mui/material";
import { CreateCar } from "./CreateCar/CreateCar";
import DeleteIcon from '@mui/icons-material/Delete';
import CarPhoto from './photo/CarPhoto.jpg'


export const Cars = () => {
  const [carMode, setCarMode] = useState('READ')
  const [carsState, setCarsState] = useState(cars)
  const [selectedCar, setSelectedCar] = useState(Object.keys(carsState)[0]);
  const carsArr = useMemo(() =>
    Object.values(carsState), [carsState])

  const canCreate = carMode === 'CREATE';

  const createCar = () => {
    setCarMode('CREATE')
  }

  const deleteCar = (carCode, event) => {
    event.stopPropagation()
    setCarsState(({ ...prevState }) => {
      delete prevState[carCode]
      setSelectedCar(Object.keys(prevState)[0])
      return {
        ...prevState,

      }
    })
  }

  return (
    <div styles={{ color: 'red' }} className={styles.wrapper}>

      {canCreate ? <div> <CreateCar carsState={carsState} setCarsState={setCarsState} setCarMode={setCarMode} setSelectedCar={setSelectedCar} /> </div> :
        <div className={styles.carInfo} >
          <div className={styles.carSideBar}> <div className={styles.createCarBtn}> <Button style={{ color: 'black', border: '1px solid black' }} onClick={createCar} variant="outlined" >Create car</Button> </div>
            {carsArr.map((car) => (
              <ul key={car.code}><li onClick={() => setSelectedCar(car.code)} className={`${styles.li} ${selectedCar === car.code ? styles.select : null}`} >{car.name} {carMode === 'READ' ? null : <DeleteIcon className={styles.deleteIcon} onClick={(event) => deleteCar(car.code, event)} />} </li></ul>
            ))}
          </div>

          <div className={styles.car} >
            {carsArr.length ? <Car car={carsState[selectedCar]} setCarsState={setCarsState} carMode={carMode} setCarMode={setCarMode} /> : <div className={styles.carPhotoText} > <h1 className={styles.carPhotoText_text}>Coздай Машину</h1> <img className={styles.carPhotoText_photo} src={CarPhoto} alt="createCar" /></div>}

          </div>
        </div>}
    </div>
  );
}