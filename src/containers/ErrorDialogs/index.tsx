import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Transition } from "./transition";
import { AppStore, dispatch, selectors } from "src/store";
import { connect } from "react-redux";
import { deleteError } from "src/store/error";

type Props = StateProps;

const ErrorDialogs: React.FC<Props> = ({ firstError }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleClickOpen();
  }, [firstError]);

  return (
    <>
      {firstError ? (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClickOpen}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle textAlign="center" color={"#d32f2f"}>
            Error
          </DialogTitle>
          <DialogContent>
            <DialogContentText color={"black"} id="alert-dialog-slide-description">
              {firstError.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              onClick={() => {
                handleClose();
                dispatch(deleteError());
              }}
            >
              <img
                width={"40px"}
                height={"40px"}
                src=" https://ikonki.svgpng.ru/wp-content/uploads/2021/12/Krestiksvgpng.ru_.png"
                alt="Х"
              />
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
};

type StateProps = {
  firstError: Error;
};

const mapStateToProps = (state: AppStore): StateProps => ({
  firstError: selectors.getFirstError(state),
});

export const ErrorDialogsWithConnect = connect<StateProps, null>(mapStateToProps)(ErrorDialogs);
