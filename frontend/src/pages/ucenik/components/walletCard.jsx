import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ContentCard from '../../../common/content-card/contentCard'
import './walletCard.css'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';



const styles = theme => ({
  root: {
    color: "white"
  }
})
var topPrihodiName = ['Prihodi', 'Džeparac', 'Stipendija', 'Poklon']
var topPrihodiValue = [5000, 1000, 600, 200]

var topRashodiName = ['Rashodi', 'Režije', 'Najam', 'Auto']
var topRashodiValue = [4500, 2500, 1000, 1000]
class walletCard extends Component {

  render() {
    const { classes } = this.props
    return (

      <div className="wallet">
        <div className="card" id="card1" style={{ bottom: "0px" }}>
          <List>
            <ListItem>
              <ListItemText><span className={classes.root}>Trenutno stanje: </span><span className="walletvalue"> 2.500,00kn</span></ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText><span className={classes.root}>Cilj:</span> <span className="walletvalue"> 10.000,00kn</span></ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText><span className={classes.root}> Prihodi:</span> <span className="walletvalue"> 5.000,00kn</span></ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText><span className={classes.root}> Rashodi:</span> <span className="walletvalue"> 4.500,00kn</span></ListItemText>
            </ListItem>
          </List>
        </div>
        <div className="card" id="card2" style={{ bottom: "50px" }}>
          <List>
            <ListItem>
              <ListItemText><span className={classes.root}>{topRashodiName[0]}: </span><span className="walletvalue"> {topRashodiValue[0]},00kn</span></ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText><span className={classes.root}>{topRashodiName[1]}:</span> <span className="walletvalue"> {topRashodiValue[1]},00kn</span></ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText><span className={classes.root}> {topRashodiName[2]}:</span> <span className="walletvalue"> {topRashodiValue[2]},00kn</span></ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText><span className={classes.root}> {topRashodiName[3]}:</span> <span className="walletvalue">{topRashodiValue[3]},00kn</span></ListItemText>
            </ListItem>
          </List>
        </div>
        <div className="card" id="card3" style={{ bottom: "100px" }}>
          <List>
            <ListItem>
              <ListItemText><span className={classes.root}>{topPrihodiName[0]}: </span><span className="walletvalue"> {topPrihodiValue[0]},00kn</span></ListItemText>
            </ListItem>
            <Divider light={true} style={{ backgroundColor: '#ffff', opacity: '0.5' }} />
            <ListItem>
              <ListItemText><span className={classes.root}>{topPrihodiName[1]}:</span> <span className="walletvalue"> {topPrihodiValue[1]},00kn</span></ListItemText>
            </ListItem>
            <Divider style={{ backgroundColor: '#ffff', opacity: '0.5' }} />
            <ListItem>
              <ListItemText><span className={classes.root}> {topPrihodiName[2]}:</span> <span className="walletvalue"> {topPrihodiValue[2]},00kn</span></ListItemText>
            </ListItem>
            <Divider style={{ backgroundColor: '#ffff', opacity: '0.5' }} />
            <ListItem>
              <ListItemText><span className={classes.root}>{topPrihodiName[3]}:</span> <span className="walletvalue">{topPrihodiValue[3]},00kn</span></ListItemText>
            </ListItem>
          </List>
        </div>

        <div className="department" id="one"></div>
        <div className="department" id="two"></div>
        <div className="department" id="three"></div>

        <img id="logo" src="https://www.sccu.com.au/images/sccu/category_icons/cards_header_icon.png" />
      </div>

    )
  }

}

export default withStyles(styles)(walletCard);
