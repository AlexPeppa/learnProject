import React, { FC, useMemo, useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { v4 as uuid4 } from 'uuid';
import { Box } from '@mui/system';
import CarStyles from './createCar.module.css';
import { CarInfo } from '../models';
import { generateDataTestId } from '../../utils/generateDataTestId';

type Props = {
  setCarsState: (carsState) => void;
  setCarMode: (state: string) => void;
  setSelectedCar: (mode: string) => void;
  carsState: Record<string, CarInfo>;
};
export const CreateCar: FC<Props> = ({ carsState, setCarsState, setCarMode, setSelectedCar }) => {
  const ref = useRef(null);
  const codeCar = useMemo(() => uuid4(), [setCarMode]);
  const [newCarInputModels, setNewCarInputModels] = useState<string>('');
  const [newDataCar, setNewDataCar] = useState<CarInfo>({
    name: '',
    code: codeCar,
    description: {
      text: '',
      state: '',
      models: [],
      founded: '',
    },
  });

  const addCar = () => {
    const newCar = {
      [newDataCar.code]: {
        ...newDataCar,
      },
    };

    setCarsState((prevState) => ({
      ...prevState,
      ...newCar,
    }));

    setSelectedCar(newDataCar.code);
    setCarMode('READ');
  };
  const addModels = () => {
    setNewDataCar((prevState) => ({
      ...prevState,
      description: {
        ...prevState.description,
        models: [...prevState.description.models, newCarInputModels],
      },
    }));
    setNewCarInputModels('');
  };

  const cancelCar = () => {
    setCarMode('READ');
  };
  const keys = Object.keys(carsState);
  return (
    <div>
      <div className={CarStyles.addCancelCarButtonDiv}>
        <Button
          data-testid={generateDataTestId('createCar', 'addCarBtn')}
          ref={ref}
          variant='outlined'
          disabled={!newDataCar.name}
          className={CarStyles.addCarButton}
          onClick={addCar}>
          Add Car
        </Button>
        <Button
          data-testid={generateDataTestId('createCar', 'cancelBtn')}
          variant='outlined'
          onClick={cancelCar}
          className={CarStyles.cancelCarBtn}>
          Cancel
        </Button>
      </div>
      <div className={CarStyles.dataCar}>
        <div className={CarStyles.nameFoundState}>
          <div>
            <TextField
              data-testid={generateDataTestId('createCar', 'carName')}
              label='Car name'
              value={newDataCar.name}
              onChange={(event) => {
                keys.map((car) => {
                  if (event.target.value === carsState[car].name) {
                    ref.current.style.display = 'none';
                  } else {
                    ref.current.style.display = '';
                  }
                  return null;
                });

                setNewDataCar((prevState) => ({
                  ...prevState,
                  name: event.target.value,
                }));
              }}
            />
          </div>
          <div data-testid={generateDataTestId('createCar', 'carFounded')}>
            <TextField
              label='Car founded'
              onChange={(event) =>
                setNewDataCar((prevState) => ({
                  ...prevState,
                  description: {
                    ...prevState.description,
                    founded: event.target.value,
                  },
                }))
              }
              defaultValue=''
            />
          </div>
          <div>
            <TextField
              data-testid={generateDataTestId('createCar', 'carState')}
              required
              label='Car state'
              onChange={(event) =>
                setNewDataCar((prevState) => ({
                  ...prevState,
                  description: {
                    ...prevState.description,
                    state: event.target.value,
                  },
                }))
              }
              defaultValue=''
            />
          </div>{' '}
        </div>
        <div className={CarStyles.text}>
          <Box component='form' sx={{ '& .MuiTextField-root': { m: 1, width: '1100px' } }}>
            <TextField
              data-testid={generateDataTestId('createCar', 'carText')}
              onChange={(event) =>
                setNewDataCar((prevState) => ({
                  ...prevState,
                  description: {
                    ...prevState.description,
                    text: event.target.value,
                  },
                }))
              }
              id='outlined-multiline-static'
              label='Car text'
              multiline
              rows={4}
              defaultValue=''
            />
          </Box>
        </div>

        <div>
          <div className={CarStyles.models}>
            <TextField
              data-testid={generateDataTestId('createCar', 'carModels')}
              required
              label='Car models'
              onChange={(event) => setNewCarInputModels(event.target.value)}
              value={newCarInputModels}
            />
            <Button
              className={CarStyles.addModelButton}
              disabled={!newCarInputModels}
              onClick={addModels}>
              Add Models
            </Button>
          </div>
          <div className={CarStyles.liModels}>
            {newDataCar.description.models.map((model) => (
              <ul key={model}>
                <li>{model}</li>
              </ul>
            ))}{' '}
          </div>
        </div>
      </div>
    </div>
  );
};
