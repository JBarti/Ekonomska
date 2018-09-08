import React, { Component } from 'react';
import './ucenik.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends Component {

 render(){
 

    return(
      <div>
        <div id="bgphoto"></div>
           <div id="loginform">
             <p id="logintxt"> Login </p>
              <div id="name"><TextField label="e-mail"/></div>
              <div id="name"><TextField label="Lozinka"  type="password" /></div>
              <div id="submit"><Button variant="contained" color="primary"> Prijavi se</Button></div>
              <a id="aaa" href="#loginform"> Registriraj se </a> <a href="#loginform" id="bbb"> Prijavi se kao gost </a>
           </div>

        </div>
        );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Login;