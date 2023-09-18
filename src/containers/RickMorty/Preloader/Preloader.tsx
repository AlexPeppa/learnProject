import React from "react";
import { LinearProgress, Stack } from "@mui/material";
import style from "./preloader.module.css";

export const Preloader = () => {
  return (
    <div className={style.wrapperPreloader}>
      <Stack spacing={2} sx={{ flex: 1 }}>
        <LinearProgress variant="indeterminate" color="secondary" />
      </Stack>
    </div>
  );
};
