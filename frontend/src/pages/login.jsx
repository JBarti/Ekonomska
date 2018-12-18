import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Card from '../common/content-card/contentCard'
import ContentCard from '../common/content-card/contentCard';
import Content from '../common/content/content'
import Row from '../common/content/row/row'
import wallpaper from '../images/wallpaper.jpg'
import TextField from '@material-ui/core/TextField'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuList from '@material-ui/core/MenuList'
import ListItemText from '@material-ui/core/ListItemText'



const styles = theme => {
    console.log(theme)
    return {
        page: {
            display: 'flex',
            flexDirection: 'row',
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            backgroundImage: `url(${wallpaper})`,
            backgroundSize: 'cover',
        },
        formCard: {
            width: 400,
            height: '35%',
            display: 'flex',
            flexDirection: 'column'
        },
        cardChildren: {
            flexDirection: 'column',
        },
        loginTitleContainer: {
            width: '100%',
            borderLeft: `4px ${theme.palette.primary.main} solid`,
            marginTop: '4%',
        },
        loginTitle: {
            width: '100%',
            textAlign: 'left',
            paddingLeft: 32
        },
        textField: {
            marginLeft: '15%',
            marginRight: '15%'
        },
        buttonSubmit: {
            marginRight: '15%',
            marginLeft: '60%',
            marginTop: 24
        }
    }
}

class Login extends Component {
    state = {}


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        console.log(this.state)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.page}>
                <ContentCard classes={{ root: classes.formCard, children: classes.cardChildren }}>
                    <div className={classes.loginTitleContainer}>
                        <Typography color='primary' className={classes.loginTitle} variant='display1'>Prijava:</Typography>
                    </div>
                    <TextField
                        label='e-mail'
                        name='email'
                        className={classes.textField}
                        value={this.state['email']}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    <TextField
                        label="Lozinka"
                        name='password'
                        className={classes.textField}
                        value={this.state['password']}
                        onChange={this.handleChange}
                        margin="normal"
                        type='password'
                    />
                    <Button type='submit' variant='contained' color='primary' className={classes.buttonSubmit}>SUBMIT</Button>
                </ContentCard>

            </div >
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(Login);