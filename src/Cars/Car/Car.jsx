import styles from "./car.module.css";
import { Timer } from '../Timer/Timer';
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { cars } from "../constants";


export const Car = ({ description, name, code, carMode, setCarMode, setCarsState, selectedCar , carsState }) => {
  const aditCar = () => {
    setCarMode('ADIT')
  }

  const [draftName, setDraftName] = useState(name)
  const [draftDescriptionState, setDraftDescriptionState] = useState(description.state)
  const [draftDescriptionFounded, setDraftDescriptionFounded] = useState(description.founded)
  const [draftDescriptionText, setDraftDescriptionText] = useState(description.text)


   
  const addChange = () => {
    console.log('addChange')
  
    setCarsState({
      ...cars,
      [cars[selectedCar].code] :{...cars[selectedCar],
        name:draftName,
        description:{...description,
          state:draftDescriptionState,
          founded:draftDescriptionFounded,
          text:draftDescriptionText
        }
    }
    })
    setCarMode('READ')
    console.log(carsState)
  }




  return (
    <div className={styles.wrapper}>
      {carMode === 'READ' ? <div className={styles.aditButton}><Button style={{ color: 'black', border: '1px solid black' }} onClick={aditCar} variant="outlined" >Adit</Button></div> :
        <div className={styles.aditButton}><Button onClick={()=>addChange()} variant="outlined" >Save</Button></div>
      }
      <div className={styles.name} >
        {carMode === 'READ' ? <h1 >{name}</h1> : <TextField onChange={(event) => setDraftName(draftName => draftName = event.target.value)}
          required
          label='Car name'
          defaultValue={name}
        />}

        <hr />
        <div className={styles.text} >
          {carMode === 'READ' ? <p>State : {description.state}</p> : <TextField onChange={(event) => setDraftDescriptionState(draftDescriptionState => draftDescriptionState = event.target.value)}
            required
            label="State"
            defaultValue={description.state}
          />}
          <div className={styles.timer}><Timer carCode={code} /></div>
          {carMode === 'READ' ? <p>Founded : {description.founded}</p> : <TextField onChange={(event) => setDraftDescriptionFounded(draftDescriptionFounded => draftDescriptionFounded = event.target.value)}
            required
            label="Founded"
            defaultValue={description.founded}
          />}
        </div>
        <div>
          {carMode === 'READ' ? <p>{description.text}</p> :
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '1100px' }, }}>
              <TextField onChange={(event) => setDraftDescriptionText( draftDescriptionText => draftDescriptionText = event.target.value )}
                id="outlined-multiline-static"
                label="Text"
                multiline
                rows={4}
                defaultValue={description.text}
              />
            </Box>
          }
        </div>
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
