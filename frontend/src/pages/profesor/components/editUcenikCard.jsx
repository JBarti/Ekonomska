
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ContentCard from '../../../common/content-card/contentCard'
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
    
})
class EditUcenikCard extends Component {

    render() {
        const { classes } = this.props
        const { value } = this.state;
        return (
            <ContentCard cardName='Postavke učenika' classes={{ root: classes.customCard }}>
                <TextField
          id="standard-name"
          label="Ime"
          className={classes.textField}
          value={this.state.name}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Prezime"
          className={classes.textField}
          value={this.state.name}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Korisničko ime"
          className={classes.textField}
          value={this.state.name}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Šifra"
          className={classes.textField}
          value={this.state.name}
          margin="normal"
        />
            </ContentCard>
        )
    }

}

export default withStyles(styles)(EditUcenikCard);