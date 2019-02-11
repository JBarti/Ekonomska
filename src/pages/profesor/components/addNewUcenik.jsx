import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

const styles = theme => ({  
  root: {
        overflow: 'hidden',
    },
    mutton: {
        overflowX: 'hidden',
        display: 'flex',
        background: 'linear-gradient(135deg, #C33764 0%, #252E73 100%)',
        color: 'white'
        
    }, 
    tfield: {
        width: 400,
        marginLeft: 20
    },
    formControl: {
        float: "left"
    },
    dialog: {
        position: "initial",
        zIndex: 1000000
        
      }
})

class addNewUcenik extends Component {
    state = {
        open: false,
      };

      handleClickOpen = () => { 
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
    };
      handleChange = event => {
        this.setState({ value: event.target.value });
      };


    render() {
        const { classes } = this.props
        return (
            <div>
                <ListItem button onClick={this.handleClickOpen}>
                 <ListItemText primary="Novo" />
                 </ListItem>
                <Dialog
                 open={this.state.open}
                 onClose={this.handleClose}
                 aria-labelledby="form-dialog-title"
                   className={classes.dialog} classes={{paper: classes.dialog}}>
          <DialogTitle id="form-dialog-title">Novi učenik</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Upišite podatke:
            </DialogContentText>
            <TextField style={{width:175,marginTop: 10}} id="text" label="Ime" type="text" /> 
            <TextField style={{width:175,marginTop: 10}} id="text" label="Prezime" type="text" /> 
            <TextField style={{width:400,marginTop: 10}} id="text" label="Korisničko ime" type="text" /> 
            <TextField style={{width:400,marginTop: 10}} id="text" label="Zaporka" type="text" /> 
          </DialogContent>
          <DialogActions> 
            <Button onClick={this.onClose} color="secondary">
              Odustani
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Dodaj
            </Button>
          </DialogActions>
        </Dialog>
        </div>

)
    }

}

export default withStyles(styles)(addNewUcenik);