import React, { Component } from 'react';
import './user.css';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Module from  './lekcijamod';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Settings from '@material-ui/icons/Settings';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AccountBalance from '@material-ui/icons/AccountBalance';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class User extends Component {

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
 


 render(){
  const { value } = this.state; 
  let id = 0;
function createData(name, postotak, ocjena, rank) {
  id += 1;
  return { id,name, postotak, ocjena, rank };
}

const rows = [
  createData('Test 1', 59, 68, 80),
  createData('Test 2', 2, 3, 4),
  createData('Test 3', 20., 13.,7.),
];


    return(
      <div>
            <AppBar position="fixed"  backgroundColor="indigo">
               <Toolbar>
                 <Typography variant="title" color="inherit" noWrap>
                   Financijska pismenost
                 </Typography>
                 <div id="mr">
                  <p id="statLink" className="htxt"> Moja statistika </p>
                  <p id="nameTag"> Ante Horvat, 3.B </p>
                 </div>  
               </Toolbar>
            </AppBar>
           <div id="sidebar">
           <div id="lessons">
              <List>
                <Module/>
                <Module/>
                <Module/>
                <Module/>
                <Module/>

              </List>  
            </div>
              <div id="helpTab">
               

              <p className="htxt"><HelpOutline className="ho"/> Pomoć </p>
              <p className="htxt"><QuestionAnswer className="ho"/> Često postavljena pitanja </p>
              <p className="htxt"> <Settings className="ho"/> Postavke</p>
              </div>
            </div> 
    <div id="main">
      <Paper elevation={3} id="stanje">
        <div id="left">
          <p id="totalbalance">  2500,00 kn</p>
        </div>
        <div id="ciljevi">
        <p id="shead"> Stanje na računu: </p>
          <div className="ctext" id="trenutno"><p className="bn">2 500,00 kn</p><p className="st">Trenutno stanje</p> </div>
          <div className="ctext" id="prihodi"> <p className="bn">3 200,00 kn</p><p className="st">Prihodi</p></div>
          <div className="ctext" id="rashodi"> <p className="bn">2 700,00 kn</p><p className="st">Rashodi</p>  </div>
          <div className="ctext" id="cilj"> <p className="bn">10 000,00 kn</p><p className="st">Cilj</p>   </div>
        </div>
        <div id="tab">
        <AppBar id="tabs"position="static">
          <Tabs value={value} fullWidth="true" scrollable="true" centered={true} onChange={this.handleChange}>
            <Tab label="Prihodi" />
            <Tab label="Rashodi" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>
        <List>
          <ListItem>
            <ListItemText> Plaća: <span className="prihoditab"> 2000,00kn</span></ListItemText>
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText> Džeparac: <span className="prihoditab"> 550,00kn</span></ListItemText>
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText> Stipendija: <span className="prihoditab"> 400,00kn</span></ListItemText>
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText> Poklon: <span className="prihoditab"> 250,00kn</span></ListItemText>
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText> Uređivanje vrta: <span className="prihoditab"> 200,00kn</span></ListItemText>
          </ListItem>
          <Divider/>
         </List>
        </TabContainer>}
        {value === 1 &&
        <TabContainer>
         <List>
           <ListItem>
              <ListItemText> Hrana: <span className="rashoditab"> 1000,00kn</span></ListItemText>
           </ListItem>
           <Divider/>
           <ListItem>
              <ListItemText> Odjeća: <span className="rashoditab"> 600,00kn</span></ListItemText>
           </ListItem>
           <Divider/>
           <ListItem>
              <ListItemText> Gorivo: <span className="rashoditab"> 400,00kn</span></ListItemText>
           </ListItem>
           <Divider/>
           <ListItem>
              <ListItemText> Izlasci: <span className="rashoditab"> 400,00kn</span></ListItemText>
           </ListItem>
           <Divider/>
           <ListItem>
              <ListItemText> Članarine: <span className="rashoditab"> 300,00kn</span></ListItemText>
           </ListItem>
           <Divider/>
          </List> 
        </TabContainer>}
        </div>
      </Paper>
      <Paper elevation={3} id="notifikacije">
       <p id="shead"> Obavjesti: </p>
       <ExpansionPanel className="obicni">
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="expansionhead" >Otvorena lekcija 3</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Profesorica Matic je otvorila lekciju 3
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className="obicni">
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="expansionhead" >Rezultati testa</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Rezultati testa su sada dostupni pod moja statistika 
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className="upozorenje">
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="expansionhead" >Rok za predati domaci rad</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Rok za predavanje domaceg rada iz lekcije 2 je za 2 dana
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className="obicni">
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="expansionhead" >Obavjest ucenicima</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Mole se ucenici da sto prije potvrde svoju e-mail adresu
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className="upozorenje">
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="expansionhead" >Promjena rasporeda</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Sat financijske pismenosti je od sada utorkom 2. sat 
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </Paper>     
      <Paper id="rezultati">
      <p id="shead"> Moji rezultati: </p>
      <Divider/>
      <Table id="reztabla" padding="dense">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell numeric>Postotak</TableCell>
            <TableCell numeric>Ocjena</TableCell>
            <TableCell numeric>Rang</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell numeric>{row.postotak}</TableCell>
                <TableCell numeric>{row.ocjena}</TableCell>
                <TableCell numeric>{row.rank}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
        
        
        
        
     </Paper>             
            </div>


        </div>
        );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired
};

export default User;