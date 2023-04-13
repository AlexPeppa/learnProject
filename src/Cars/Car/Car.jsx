
import styles from "./car.module.css";
import { Timer } from '../Timer/Timer';
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';


export const Car = ({ description, name, code, carMode, setCarMode, setCarsState, }) => {

  const canEdit = carMode === 'READ';
  const [draftCar, setDraftCar] = useState({ draftName: name, draftDescription: description })
  const models = description.models;
  const [draftModels, setDraftModels] = useState({ models, draftModel: ' ' })

  const addChange = () => {
    setCarsState((prevState) => ({
      ...prevState,
      [code]: {
        ...prevState[code],
        name: draftCar.draftName,
        description:
        {
          ...description,
          state: draftCar.draftDescription.state,
          founded: draftCar.draftDescription.founded,
          text: draftCar.draftDescription.text,
        }
      }
    }
    ))
    setCarMode('READ')
  }

  useEffect(() => {
    setDraftCar({ draftName: name, draftDescription: description })
    setDraftModels({ models, draftModel: ' ' })
    setCarMode('READ')
  }, [code])

  const editCar = () => {
    setCarMode('EDIT')
  }

  const settingCarState = ()=> {
    setCarsState((prevState) => ({
      ...prevState,
      [code]: {
        ...prevState[code],
        description: {
          ...description,
          models: draftModels.models
        }
      }
    }))
  }

  const addModel = () => {
    draftModels.models.push(draftModels.draftModel)
    settingCarState()
    setDraftModels((prevState) => ({ ...prevState, draftModel: '' }))

  }

  const deleteModel = (model) => {
    const newModels = draftModels.models.filter((mark) => mark !== model)
    draftModels.models = newModels;
    settingCarState()
  }


  return (
    <div className={styles.wrapper}>
      {canEdit ? <div className={styles.aditButton}><Button style={{ color: 'black', border: '1px solid black' }} onClick={editCar} variant="outlined" >Edit</Button></div> :
        <div className={styles.aditButton}><Button onClick={addChange} variant="outlined" >Save</Button></div>
      }

      <div className={styles.name} >
        {canEdit ? <h1 >{name}</h1> : <TextField onChange={event => setDraftCar(prevState => ({ ...prevState, draftName: event.target.value }))}
          required
          label='Car name'
          defaultValue={draftCar.draftName}
        />}
        <hr />
        <div className={styles.text} >
          {canEdit ? <p>State : {description.state}</p> : <TextField onChange={(event) => setDraftCar((prevState) => ({ ...prevState, draftDescription: { ...draftCar.draftDescription, state: event.target.value } }))}
            required
            label="State"
            defaultValue={draftCar.draftDescription.state}
          />}

          <div className={styles.timer}><Timer carCode={code} /></div>
          {canEdit ? <p>Founded : {description.founded}</p> : <TextField onChange={(event) => setDraftCar((prevState) => ({ ...prevState, draftDescription: { ...draftCar.draftDescription, founded: event.target.value } }))}
            label="Founded"
            defaultValue={draftCar.draftDescription.founded}

          />}
        </div>

        {<div>
          {canEdit ? <p>{description.text}</p> :
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '1100px' }, }}>
              <TextField onChange={(event) => setDraftCar((prevState) => ({ ...prevState, draftDescription: { ...draftCar.draftDescription, text: event.target.value } }))}
                id="outlined-multiline-static"
                label="Text"
                multiline
                rows={4}
                defaultValue={draftCar.draftDescription.text}
              />
            </Box>
          }
        </div>}
        <hr />

        <div>
          <div className={styles.marksTitle}>
            <h3>Models :</h3>
            <div className={canEdit ? styles.hiddenMarks : styles.addMarks}>
              <TextField id="outlined-required" label="Add Mark" value={draftModels.draftModel} onChange={(event) => setDraftModels((prevState) => ({ ...prevState, draftModel: event.target.value }))} />
              <Button size="large" onClick={addModel}>Add Model</Button>
            </div>
          </div>
          <div>  <ul className={styles.models}> {description.models.map(model => <li key={model} className={canEdit ? styles.model : styles.modelActive}> {model} {canEdit ? '' : <DeleteIcon className={styles.icon} onClick={() => deleteModel(model)} />} </li>)} </ul>  </div>
        </div>
      </div>
    </div>
  );
};
