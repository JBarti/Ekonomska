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
import ContentCard from '../../../common/content-card/contentCard'
import './dialog.css'
const styles = theme => ({
    container:{
        width: '20%',
        height: '20%',
    },
    root: {
        overflow: 'hidden',
    },
    mutton: {
        overflowX: 'hidden',
        display: 'flex',
        background: 'linear-gradient(135deg, #C33764 0%, #252E73 100%)',
        color: 'white',
        width: '100%',
        height: '100%'
        
    }, 
})

class dodajLekciju extends Component {
    state = {
        open: false,
      };
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    render() {
        const { classes } = this.props
        return (

<ContentCard className={classes.container}>
<Button color="white" label="Nova poruka" onClick={this.handleClickOpen} className={classes.mutton}>
                 <AddIcon />
                <Dialog
                 open={this.state.open}
                 onClose={this.handleClose}
                 aria-labelledby="form-dialog-title"
                   className={classes.dialog} fullWidth scroll="paper">
          <DialogTitle id="form-dialog-title">Nova Lekcija</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="text"
              label="Naslov"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions> 
            <Button onClick={this.onClose} color="secondary">
              Odustani
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Dodaj lekciju 
            </Button> 
          </DialogActions>
        </Dialog>
        </Button>
        </ContentCard>

)
    }

}

export default withStyles(styles)(dodajLekciju);