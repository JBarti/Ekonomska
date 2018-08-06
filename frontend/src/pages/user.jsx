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
        cardContainer: {
            alignItems: 'center',
            position: 'absolute',
            top: 'auto',
            bottom: 'auto',
            display: 'flex',
            flexDirection: 'row',
            width: 500,
            height: 400,
            marginBottom: 'auto',
            boxSizing: 'border-box',
            paddingTop: 20,
            paddingBottom: 20,
        },
        formCardBackground: {
            margin: 0,
            width: '50%',
            height: '90%',
            backgroundColor: 'black',
            opacity: 0.8,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        formCard: {
            margin: 0,
            width: '100%',
            height: '100%'
        },
        textField: {
            position: 'relative',
            width: '100%',
            borderLeft: '80px solid white',
            borderRight: '80px solid white',
            boxSizing: 'border-box',
            textAlign: 'left'
        },
        buttonSubmit: {
            marginTop: 34,
            width: '24%',
            color: 'white',
        },
        primary: {
            color: 'white',
            textAlign: 'left',
            paddingLeft: 0,
            textAlign: 'left'
        },
        menuItem: {
            margin: 0,
            '&:focus': {
                backgroundColor: theme.palette.primary.main
            }
        },
        loginTitleContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row',
            marginTop: 24
        },
        loginTitle: {
            borderLeft: '4px solid white',
            borderLeftColor: theme.palette.primary.main,
            textAlign: 'left',
            width: '100%',
            paddingLeft: 24
        },
        selector: {
            width: '100%',
            textAlign: 'left',
            marginRight: 20,
            marginLeft: -5,
            fontSize: theme.typography.display1.fontSize,
            color: theme.palette.primary.main,
            marginTop: 2,
            '&::before': {
                borderBottom: 'none'
            },
            '&:focus': {
                color: theme.palette.primary.main,
                outline: 1
            }
        }
    }
}

class User extends Component {
    state = { korisnik: '' }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        console.log(this.state)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.page}>
                <div className={classes.cardContainer}>



                    <ContentCard classes={{ root: classes.formCard }}>
                        <div className={classes.loginTitleContainer}>
                            <Typography color='primary' className={classes.loginTitle} variant='display1'>Login as</Typography>
                            <Select className={classes.selector} id='korisnik' name='korisnik' onChange={this.handleChange} value={this.state.korisnik}>
                                <MenuItem value={10}>gost</MenuItem>
                                <MenuItem value={20}>učenik</MenuItem>
                                <MenuItem value={30}>admin</MenuItem>
                            </Select>
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
                    <ContentCard classes={{ root: classes.formCardBackground }}>
                        <MenuItem className={classes.menuItem}>
                            <ListItemText classes={{ primary: classes.primary }} primary="Gost" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem}>
                            <ListItemText classes={{ primary: classes.primary }} primary="Učenik" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem}>
                            <ListItemText classes={{ primary: classes.primary }} primary="Profesor" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem}>
                            <ListItemText classes={{ primary: classes.primary }} primary="Administrator" />
                        </MenuItem>
                    </ContentCard>
                </div>
            </div >
        );
    }
}

User.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(User);