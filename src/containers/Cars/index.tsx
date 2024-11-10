import React, { FC, useMemo, useState } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { cars } from './constants';
import styles from './cars.module.css';
import { CreateCar } from './CreateCar';
import CarPhoto from './photo/CarPhoto.jpg';
import { CarInfo } from './models';
import { Car } from './Car';
import { generateDataTestId } from '../utils/generateDataTestId';

export const Cars: FC = () => {
  const [carMode, setCarMode] = useState<string>('READ');
  const [carsState, setCarsState] = useState<Record<string, CarInfo>>(cars);
  const [selectedCar, setSelectedCar] = useState(Object.keys(carsState)[0]);
  const carsArr = useMemo(() => Object.values(carsState), [carsState]);

  const canCreate = carMode === 'CREATE';

  const createCar = () => {
    setCarMode('CREATE');
  };

  const deleteCar = (carCode: string, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    setCarsState(({ ...prevState }) => {
      delete prevState[carCode];
      setSelectedCar(Object.keys(prevState)[0]);
      return {
        ...prevState,
      };
    });
  };

  return (
    <div className={styles.wrapper} data-testid={generateDataTestId('carsComponent', 'mainDiv')}>
      {canCreate ? (
        <div>
          <CreateCar
            carsState={carsState}
            setCarsState={setCarsState}
            setCarMode={setCarMode}
            setSelectedCar={setSelectedCar}
          />
        </div>
      ) : (
        <div className={styles.carInfo}>
          <div className={styles.carSideBar}>
            <div className={styles.createCarBtn}>
              <Button
                data-testid={generateDataTestId('cars', 'createCarBtn')}
                style={{ color: 'black', border: '1px solid black' }}
                onClick={createCar}
                variant='outlined'>
                Create car
              </Button>
            </div>
            {carsArr.map((car) => (
              <ul key={car.code}>
                <div
                  data-testid={generateDataTestId('cars', 'selectedCarDiv', `${car.code}`)}
                  tabIndex={0}
                  role='button'
                  onClick={() => setSelectedCar(car.code)}
                  onKeyDown={() => setSelectedCar(car.code)}>
                  <li
                    data-testid={generateDataTestId('cars', 'selectedCarLi', `${car.code}`)}
                    className={`${styles.li} ${selectedCar === car.code ? styles.select : null}`}>
                    {car.name}
                    {carMode === 'READ' ? null : (
                      <DeleteIcon
                        className={styles.deleteIcon}
                        onClick={(event) => deleteCar(car.code, event)}
                      />
                    )}
                  </li>
                </div>
              </ul>
            ))}
          </div>

          <div className={styles.car}>
            {carsArr.length ? (
              <Car
                car={carsState[selectedCar]}
                setCarsState={setCarsState}
                carMode={carMode}
                setCarMode={setCarMode}
              />
            ) : (
              <div className={styles.carPhotoText}>
                <h1 className={styles.carPhotoText_text}>Coздай Машину</h1>
                <img className={styles.carPhotoText_photo} src={CarPhoto} alt='createCarPhoto' />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
