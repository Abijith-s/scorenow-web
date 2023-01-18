import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  alertboxtitle: {
    color: "red",
    fontFamily: 'Audiowide',
    height: '20px'
  },
  alertboxstyle:{
    width:"2em",
    height:"1em"
  }
})

export default function DialogBox(props) {
  const classes = useStyles();

  return (
    <div style={{minWidth:"3em",minHeight:"2em"}} >
      <Dialog
        open={props.openValue}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.alertboxtitle} style={{fontSize:"2em"}}>
         <h3>ALERT</h3>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{fontSize:"1em",padding:"10%"}}>
           <h6>{props.message}</h6> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} style={{fontSize:"1em"}}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}