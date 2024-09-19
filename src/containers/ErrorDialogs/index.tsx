import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Transition } from "./transition";
import { AppStore, dispatch, selectors } from "@store/index";
import { connect } from "react-redux";
import { deleteError } from "@store/error";
import closePicture from "./photo/closePicture.png";

type Props = StateProps;

const ErrorDialogsComponent: React.FC<Props> = ({ firstError }) => {
  return (
    <Dialog
      open={Boolean(firstError)}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle textAlign="center" color={"#d32f2f"}>
        Error
      </DialogTitle>
      <DialogContent>
        <DialogContentText color={"black"} id="alert-dialog-slide-description">
          {firstError?.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={() => {
            dispatch(deleteError());
          }}
        >
          <img width={"40px"} height={"40px"} src={closePicture} alt="Х" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type StateProps = {
  firstError: Error | undefined;
};

const mapStateToProps = (state: AppStore): StateProps => ({
  firstError: selectors.getFirstError(state),
});

export const ErrorDialogs = connect<StateProps>(mapStateToProps)(ErrorDialogsComponent);
