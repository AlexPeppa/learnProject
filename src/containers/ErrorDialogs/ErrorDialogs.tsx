import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ErrorProp {
  error: Error | null;
  deleteError: () => void;
}

export const ErrorDialogs: React.FC<ErrorProp> = ({ error, deleteError }) => {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
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
            {error?.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              handleClose();
              deleteError();
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
    </React.Fragment>
  );
};
