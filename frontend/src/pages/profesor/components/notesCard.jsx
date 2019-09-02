import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ContentCard from '../../../common/content-card/contentCard'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Harmonica from '../../../common/harmonica/harmonica'
import HarmonicaTab from '../../../common/harmonica/harmonica-tab/harmonicaTab'

const styles = theme => ({
    root: {
        overflow: 'hidden',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
      dense: {
        marginTop: 19,
      },
      addnote: {
       position: 'absolute',
       bottom: 10
      }
})

class notesCard extends Component {
    handleChange = link => event => {
        this.setState({
          [link]: event.target.value,
        });
      };
      state = { open: null }
      expandTab = panel => (event, expanded) => {
          if (panel === this.state.open) {
              this.setState({ open: null })
          }
          else {
              this.setState({ open: panel })
          }
      }
    render() {
        const { classes } = this.props
        return (    
            <ContentCard cardName='Spremljeno' className={classes.root}>
              <Harmonica >
                    <HarmonicaTab
                        heading='Tekst'
                        bodyText='link'
                        onClick={this.expandTab('panel1')}
                        expanded={this.state.open == 'panel1'} >
                    </HarmonicaTab>
                </Harmonica>



              <div className={classes.addnote}>
              <TextField
                 label="Tekst"
                 className={classes.textField}
                 onChange={this.handleChange('link')}
                 margin="normal"
                 />
                 <TextField
                 label="Link"
                 className={classes.textField}
                  onChange={this.handleChange('link')}
                 margin="normal"
                 />
                 <Button onClick={this.handleClose} color="primary">
              Spremi
            </Button>
              
              </div>
             </ContentCard>
            )
        }
    
    }
    
export default withStyles(styles)(notesCard);