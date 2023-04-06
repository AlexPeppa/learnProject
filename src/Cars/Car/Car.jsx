import styles from "./car.module.css";
import { Timer } from '../Timer/Timer';
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";



export const Car = ({ description, name, code, carMode, setCarMode, setCarsState }) => {
  const editCar = () => {
    setCarMode('EDIT')
  }

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

  const [draftCar, setDraftCar] = useState({ draftName: name, draftDescription: description })

  useEffect(() => {
    setDraftCar ({ draftName: name, draftDescription: description })
  }, [name, description])

  const carEdit = carMode === 'READ'







  console.log(draftCar)

  return (
    <div className={styles.wrapper}>
      {carEdit ? <div className={styles.aditButton}><Button style={{ color: 'black', border: '1px solid black' }} onClick={editCar} variant="outlined" >Edit</Button></div> :
        <div className={styles.aditButton}><Button onClick={addChange} variant="outlined" >Save</Button></div>
      }
      <div className={styles.name} >
        {carEdit ? <h1 >{name}</h1> : <TextField onChange={(event) => setDraftCar((prevState) => ({ ...prevState, draftName: event.target.value }))}
          required
          label='Car name'
          defaultValue={draftCar.draftName}
        />}

        <hr />
        <div className={styles.text} >
          {carEdit ? <p>State : {description.state}</p> : <TextField onChange={(event) => setDraftCar((prevState) => ({ ...prevState, draftDescription: { ...draftCar.draftDescription, state: event.target.value } }))}
            required
            label="State"
            defaultValue={draftCar.draftDescription.state}
          />}
          <div className={styles.timer}><Timer carCode={code} /></div>
          {carEdit ? <p>Founded : {description.founded}</p> : <TextField onChange={(event) => setDraftCar((prevState) => ({ ...prevState, draftDescription: { ...draftCar.draftDescription, founded: event.target.value } }))}
            label="Founded"
            defaultValue={draftCar.draftDescription.founded}
          />}
        </div>
        {<div>
          {carEdit ? <p>{description.text}</p> :
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
        <div className={styles.marks}>
          <h3>Marks :</h3>
          {description.models.map((model) => (
            <ul key={model}>
              <li className={styles.li}>{model}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
