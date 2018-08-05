import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../common/theme/theme'
import Card from '../common/content-card/contentCard'
import ContentCard from '../common/content-card/contentCard';
import Content from '../common/content/content'
import Row from '../common/content/row/row'
import wallpaper from '../images/wallpaper.jpg'
import TextField from '@material-ui/core/TextField'
import { Typography } from '@material-ui/core';


const styles = theme => ({
    page: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        backgroundColor: 'black',
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover'
    },
    contCard: {
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        height: 'fit-content',
        marginTop: 'auto',
        marginBottom: 'auto',
        boxSizing: 'border-box',
        paddingTop: 20,
        paddingBottom: 20
    },
    textField: {
        position: 'relative',
        width: '100%',
        borderLeft: '100px solid white',
        borderRight: '100px solid white',
        boxSizing: 'border-box',
    },
    loginTitle: {
        borderLeft: '4px solid white',
        borderLeftColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        textAlign: 'left',
        paddingLeft: 30
    }
})

class User extends Component {
    state = {}

    handleChange = (event) => {
        this.setState({ [event.target.name]: this.state[event.target.name] })
        console.log(this.state)
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.page}>
                    <ContentCard classes={{ root: classes.contCard }}>
                        <Typography className={classes.loginTitle} variant='display1'>Login</Typography>
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
                    </ContentCard>
                </div>
            </MuiThemeProvider >
        );
    }
}

User.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(User);