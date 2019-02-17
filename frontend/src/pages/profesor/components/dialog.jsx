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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './dialog.css'
const styles = theme => ({  
  root: {
        overflow: 'hidden',

    },
    mutton: {
        overflowX: 'hidden',
        display: 'flex',
        background: 'linear-gradient(135deg, #C33764 0%, #252E73 100%)',
        color: 'white',
        webkit_scrollbar: {
          display: "none"
        }
        
    }, 
    dialog: {
      position: "initial",
      zIndex: 1000000
      
    }
})

class Dijalog extends Component {
    state = {
        open: false,
      };
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
    };

      handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
      };


    render() {
        const { classes } = this.props
        return (


<Button color="white" label="Nova poruka" onClick={this.handleClickOpen} className={classes.mutton}>
                 <AddIcon />
                <Dialog
                 open={this.state.open}
                 onClose={this.handleClose}
                 aria-labelledby="form-dialog-title"
                   className={classes.dialog} classes={{paper: classes.dialog}}>
          <DialogTitle id="form-dialog-title">Nova obavijest</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Pošaljite obavijest razredima kojim predajete. Napomena, ako ne označite da je važna obavijest, poslat će se kao obična.
            </DialogContentText>
            <TextField
              autoFocus
              
              id="text"
              label="Poruka"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions> 
          <FormControlLabel control={<Checkbox value="checkedC" color="secondary" />} label="Važno" />
            <Button onClick={this.handleClose} color="secondary">
              Odustani
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Pošalji
            </Button>
          </DialogActions>
        </Dialog>
        </Button>

)
    }

}

export default withStyles(styles)(Dijalog);