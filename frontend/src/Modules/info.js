import React, { Component } from 'react';
import './ucenik.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';



class Info extends Component {
  state = { open: false };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}
    const data = [
  createData('Teorijski test', 50, 82, 70, 90),
  createData('Prakticni test', 60, 70, 64, 92),    
  createData('Postotak', 55, 76, 67, 91),
  createData('Ocjena', 3, 4, 3, 5),
];


    const ucenik = {
      name: "Ante Horvat",
      class: "3.A",
      photo: "https://media.istockphoto.com/photos/happy-laughing-man-picture-id544358212"
    };
    return (
      <div>
       <div id="TopBar">
           <ul id="TopNav">
            <li>Početna</li>
            <li>Postavke</li>
            <li>Moja statistika</li>
           </ul>
       </div>
       <div id="NavBar">
        <div id="photoHolder">
          <img src={ucenik.photo}/>
        </div>
        <div id="ucenikInfo">
          <p> {ucenik.name}</p>
          <p> {ucenik.class} </p>
        </div>
        <List component="nav">
          <ListItem button>
               <ListItemText inset primary="Udžbenik" />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
             <ListItemText inset primary="Lekcija 1" />
               {this.state.open ? <ExpandLess /> : <ExpandMore />}
             </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button>
                <ListItemText inset primary="Teorija" />
              </ListItem>
              <ListItem disabled button>
                <ListItemText inset primary="Test" />
              </ListItem>
            </List>
          </Collapse>
        </List>
       </div> 
      <div className="container"> 
       <div id="statistika">
         <p id="grapf"> GRAF </p>
      <Table id="tab">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell numeric>Test 1</TableCell>
            <TableCell numeric>Test 2</TableCell>
            <TableCell numeric>Test 3</TableCell>
            <TableCell numeric>Test 4</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {n.name}
                </TableCell>
                <TableCell numeric>{n.calories}</TableCell>
                <TableCell numeric>{n.fat}</TableCell>
                <TableCell numeric>{n.carbs}</TableCell>
                <TableCell numeric>{n.protein}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
       </div>
       <div id="changeinfo">
          <div id="photog">
          </div>
          <p className="in"> <span>Ime</span>: Ante </p> 
           <p className="in"><span> Prezime</span>: Horvat </p> 
            <p className="in"><span> Razred</span>: 3.A </p>
             <p className="in"><span> e-mail</span>: antehorvat@gmail.com </p> 
              <Button variant="contained" id="mail">
                 Dodaj sliku 
              </Button> 
              <Button variant="contained" id="mail">
                 Promjeni e-mail
              </Button>
      <Button variant="contained" id="pass">
        Promjeni lozinku
      </Button>
       </div>
      </div> 
    </div>
    );
  }
}
Info.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Info;