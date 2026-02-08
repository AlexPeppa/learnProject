import React, { useMemo } from 'react';
import { Box, Slider } from '@mui/material';
import styles from './Activity.module.css';
import { UserActivity } from '../models';
import { generateDefaultPoints } from './utils/generateDefaultPoints';

export const Activity: React.FC<UserActivity> = ({ activity, price, accessibility }) => {
  const marks = useMemo(() => generateDefaultPoints(), []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.activity}>
        <div className={styles.activityName}>{activity}</div>
        <div className={styles.activityOpportunity}>
          <div className={styles.accessibility}>
            Accessibility :
            <div className={styles.accessibilitySlider}>
              <Box sx={{ width: 700 }}>
                <Slider
                  aria-label='Restricted values'
                  value={accessibility * 100}
                  defaultValue={0}
                  step={0.0001}
                  marks={marks}
                />
              </Box>
            </div>
          </div>
          <div className={styles.price}>
            Price :
            <div className={styles.priceSlider}>
              <Box sx={{ width: 700 }}>
                <Slider
                  aria-label='Restricted values'
                  value={price * 100}
                  defaultValue={0}
                  step={0.0001}
                  marks={marks}
                />
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
