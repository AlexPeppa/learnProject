import { Button, TextField } from "@mui/material"
import { useState } from "react"
import CarStyles from "./createCar.module.css";
import { v4 as uuid4 } from 'uuid';
import { Box } from "@mui/system";

export const CreateCar = ({ setCarsState, setCarMode , setSelectedCar }) => {

    const [newDataCar, setNewDataCar] = useState({
        name: "",
        description: {
            text: "",
            state: "",
            models: [],
            founded: '',
        }
    })
    const [newCarInputModels, setNewCarInputModels] = useState('')
    
    const addCar = () => {
        const newCar = {
            [newDataCar.name.toLocaleUpperCase()]: {
                ...newDataCar,
                code: newDataCar.name.toLocaleUpperCase(),
                id: uuid4(),
            }
        }
        setCarsState((prevState) => ({
            ...prevState,
            ...newCar,
        })
        )
        setSelectedCar(newCar[newDataCar.name.toLocaleUpperCase()].code)
        setCarMode('READ')
      
    }
    const addModels = () => {
        setNewDataCar((prevState) => ({
            ...prevState,
            description: {
                ...prevState.description,
                models: [...prevState.description.models, newCarInputModels]
            }
        }))
        setNewCarInputModels('')
    }

    return (
        <div>

            <div className={CarStyles.addCarButtonDiv} > <Button disabled={!newDataCar.name} className={CarStyles.addCarButton} onClick={addCar} > Add Car </Button></div>
            <div className={CarStyles.dataCar}>
                <div className={CarStyles.nameFoundState} ><div className={CarStyles.name} ><TextField required label='Car name' onChange={(event) => setNewDataCar((prevState) => ({ ...prevState, name: event.target.value }))} defaultValue='' /></div>
                    <div className={CarStyles.founded}><TextField required label='Car founded' onChange={(event) => setNewDataCar((prevState) => ({ ...prevState, description: { ...prevState.description, founded: event.target.value } }))} defaultValue='' /></div>
                    <div className={CarStyles.state}> <TextField required label='Car state' onChange={(event) => setNewDataCar((prevState) => ({ ...prevState, description: { ...prevState.description, state: event.target.value } }))} defaultValue='' /></div>  </div>
                <div className={CarStyles.text}>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '1100px' }, }}>
                        <TextField onChange={(event) => setNewDataCar((prevState) => ({ ...prevState, description: { ...prevState.description, text: event.target.value } }))}
                            id="outlined-multiline-static"
                            label='Car text'
                            multiline
                            rows={4}
                            defaultValue='' />
                    </Box> </div>

                <div><div className={CarStyles.models} ><TextField required label='Car models' onChange={(event) => setNewCarInputModels(event.target.value)} value={newCarInputModels} />
                    <Button className={CarStyles.addModelButton} onClick={addModels}>Add Models</Button></div>
                    <div className={CarStyles.liModels} >{newDataCar.description.models.map(model => <ul key={model} ><li>{model}</li></ul>)} </div>
                </div>
            </div>
        </div>

    )
}