import React from "react"
import styles from './Activity.module.css'
import { Box, Slider } from "@mui/material"
import { OwnPropsActivity } from "../models";


export const Activity:React.FC<OwnPropsActivity> = ({activity}) => {


    const marks = [
        {
          value: 0,
          label: '0'
        },
        {
          value: 10,
          label: '0.1'
        },
        {
          value: 20,
          label: '0.2'
        },
        {
          value: 30,
          label: '0.3'
        },
        {
          value: 40,
          label: '0.4'
        },
        {
          value: 50,
          label: '0.5'
        },
        {
          value: 60,
          label: '0.6'
        },
        {
          value: 70,
          label: '0.7'
        },
        {
          value: 80,
          label: '0.8'
        },
        {
          value: 90,
          label: '0.9'
        },
        {
          value: 100,
          label: '1',
        },
       
      ];
     

    

    return (
        <div className={styles.wrapper}>
            <div className={styles.activity}>
                <div className={styles.activityName}>{activity.activity}</div>
                <div className={styles.activityOpportunity}>
                    <div className={styles.accessibility}>
                        Accessibility :
                        <div className={styles.accessibilitySlider}><Box sx={{ width: 700 }}> <Slider aria-label="Restricted values"  value = {activity.accessibility*100} defaultValue={0}step={0.0001}marks={marks}/></Box></div>
                    </div>
                    <div className={styles.price}>
                        Price :
                        <div className={styles.priceSlider}><Box sx={{ width: 700 }}> <Slider aria-label="Restricted values"  value = {activity.price*100}  defaultValue={0}step={0.0001}marks={marks}/></Box></div>
                    </div>
                </div>
            </div>

        </div>
    )
}