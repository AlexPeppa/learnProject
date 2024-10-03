import React, { FC, useMemo, useState } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { cars } from './constants';
import styles from './cars.module.css';
import { CreateCar } from './CreateCar/CreateCar';
import CarPhoto from './photo/CarPhoto.jpg';
import { CarInfo } from './models';
import { Car } from './Car/Car';

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
		<div className={styles.wrapper}>
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
								style={{ color: 'black', border: '1px solid black' }}
								onClick={createCar}
								variant='outlined'
							>
								Create car
							</Button>
						</div>
						{carsArr.map((car) => (
							<ul key={car.code}>
								<div
									tabIndex={0}
									role='button'
									onClick={() => setSelectedCar(car.code)}
									onKeyDown={() => setSelectedCar(car.code)}
								>
									<li
										className={`${styles.li} ${selectedCar === car.code ? styles.select : null}`}
									>
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
								{' '}
								<h1 className={styles.carPhotoText_text}>Coздай Машину</h1>{' '}
								<img className={styles.carPhotoText_photo} src={CarPhoto} alt='createCar' />
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
