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
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
    checkVid: {
      float: "left"
    }
})

class editLekcija extends Component {
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
                <IconButton className={classes.deleteBtn} onClick={this.handleClickOpen} aria-label="Edit">
                  <EditIcon />
                </IconButton>
                <Dialog
                 open={this.state.open}
                 onClose={this.handleClose}
                 aria-labelledby="form-dialog-title"
                   className={classes.dialog} fullWidth scroll="paper">
          <DialogTitle id="form-dialog-title">Uredite lekciju </DialogTitle>
          <DialogContent> 
          <TextField fullWidth id="text" label="Novi naziv" type="text" />  
          <FormControlLabel control={<Checkbox value="checkedC" color="secondary" />} label="Vidljivo" className={classes.checkVid} />

          </DialogContent>
          <DialogActions> 
          <IconButton className={classes.deleteBtn} aria-label="Delete">
                         <DeleteIcon />
          </IconButton>

            <Button onClick={this.handleClose} color="secondary">
              Odustani
            </Button>

            <Button onClick={this.handleClose} color="primary">
              Potvrdi
            </Button>
          </DialogActions>
        </Dialog>
        </div>

)
    }

}

export default withStyles(styles)(editLekcija);