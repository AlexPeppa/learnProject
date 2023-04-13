
import styles from "./car.module.css";
import { Timer } from '../Timer/Timer';
import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';


export const Car = ({ car, carMode, setCarMode, setCarsState, }) => {
  const canEdit = carMode === 'READ';

  const [draftCar, setDraftCar] = useState(car)
  const [modelInput, setModelInput] = useState('')

  const addChange = () => {
    setCarsState((prevState) => ({
      ...prevState,
      [car.code]: draftCar
    }))
    setCarMode('READ')
  }

  useEffect(() => {
    setDraftCar(car)
    setModelInput('')
    setCarMode('READ')
  }, [car.code])

  const editCar = () => {
    setCarMode('EDIT')
  }

  const addModel = () => {
    setDraftCar((prevState) => ({
        ...prevState,
        description: {
            ...prevState.description,
            models: prevState.description.models.concat(modelInput)
        }
    }))
    setModelInput('');
  }

  const deleteModel = (model) => {
    const newModels = draftCar.description.models.filter((mark) => mark !== model)
    setDraftCar((prevState) => ({
        ...prevState,
        description: {
            ...prevState.description,
            models: newModels
        }
    }))
  }


  return (
    <div className={styles.wrapper}>
      {canEdit ? <div className={styles.aditButton}><Button style={{ color: 'black', border: '1px solid black' }} onClick={editCar} variant="outlined" >Edit</Button></div> :
        <div className={styles.aditButton}><Button onClick={addChange} variant="outlined" >Save</Button></div>
      }

      <div className={styles.name} >
        {canEdit ? <h1 >{car.name}</h1> : <TextField onChange={event => setDraftCar(prevState => ({ ...prevState, name: event.target.value }))}
          required
          label='Car name'
          defaultValue={draftCar.name}
        />}
        <hr />
        <div className={styles.text} >
          {canEdit ? <p>State : {car.description.state}</p> : <TextField onChange={(event) => setDraftCar((prevState) => ({ ...prevState, description: { ...prevState.description, state: event.target.value } }))}
            required
            label="State"
            defaultValue={draftCar.description.state}
          />}

          <div className={styles.timer}><Timer carCode={car.code} /></div>
          {canEdit ? <p>Founded : {car.description.founded}</p> : <TextField onChange={(event) => setDraftCar((prevState) => ({ ...prevState, description: { ...prevState.description, founded: event.target.value } }))}
            label="Founded"
            defaultValue={draftCar.description.founded}

          />}
        </div>

        {<div>
          {canEdit ? <p>{car.description.text}</p> :
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '1100px' }, }}>
              <TextField onChange={(event) => setDraftCar((prevState) => ({ ...prevState, description: { ...prevState.description, text: event.target.value } }))}
                id="outlined-multiline-static"
                label="Text"
                multiline
                rows={4}
                defaultValue={draftCar.description.text}
              />
            </Box>
          }
        </div>}
        <hr />

        <div>
          <div className={styles.marksTitle}>
            <h3>Models :</h3>
            <div className={canEdit ? styles.hiddenMarks : styles.addMarks}>
              <TextField id="outlined-required" label="Add Mark" value={modelInput} onChange={(event) => setModelInput(event.target.value)} />
              <Button size="large" onClick={addModel} disabled={!modelInput}>Add Model</Button>
            </div>
          </div>
          <div>  <ul className={styles.models}> {draftCar.description.models.map(model => <li key={model} className={canEdit ? styles.model : styles.modelActive}> {model} {canEdit ? '' : <DeleteIcon className={styles.icon} onClick={() => deleteModel(model)} />} </li>)} </ul>  </div>
        </div>
      </div>
    </div>
  );
};
