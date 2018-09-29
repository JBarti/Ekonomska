import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import UcenikAppBar from './components/appbar'
import Sidebar from '../../common/sidebar/sidebar'
import Slide from '@material-ui/core/Slide'
import ArrowBack from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import { List, Typography } from '@material-ui/core';
import Content from '../../common/content/content'
import Row from '../../common/content/row/row'
import ContentCard from '../../common/content-card/contentCard'
import Question from '../../common/question/question'


const styles = theme => {
    console.log(theme)
    return ({
        root: {
            backgroundColor: '#eeeeee',
            width: '100%',
            height: '100vh',
            zIndex: 1,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
        },
        sidebarNav: {
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap'

        },
        sidebarHeading: {
            paddingLeft: 16
        },
        content: {
            height: '100%'
        },
        questionContainer: {
            marginTop: 80,
            paddingLeft: 160
        },
        content: {
            alignItems: 'center',

        }
    })
}


class Forms extends Component {

    state = { fullscreen: false, expanded: false, currentPage: 'Home', animate: true }

    questions = [
        {
            question: 'Tko je prvi hrvacki predsjednik', answers: [
                { answer: 'Tito', isSolution: false },
                { answer: 'Ivo Sanader', isSolution: true }
            ]
        },
        {
            question: 'Is there an app that you hate but use anyways?', answers: [
                { answer: 'Whatsapp', isSolution: true },
                { answer: 'Whatsapp', isSolution: true },
                { answer: 'Whatsapp', isSolution: true },
                { answer: 'Facebook', isSolution: false }
            ]
        }
    ]

    expandContent = () => {
        this.setState({ fullscreen: !this.state.fullscreen })
    }

    showMenu = () => {
        this.setState({ open: !this.state.open, expanded: !this.state.expanded })
    }

    render() {
        const { classes } = this.props;

        let sidebarAppbar = <div className={classes.sidebarNav}>
            <IconButton style={{ color: 'white' }} onClick={() => { this.changeContent(this.state.screens[0]) }}><ArrowBack /></IconButton>
            <Slide timeout={250} direction='down' in={this.state.animate}>
                <Typography className={classes.sidebarHeading} variant='subheading' style={{ color: 'white' }}>{this.state.currentPage}</Typography>
            </Slide>
        </div>

        return (
            <div className={classes.root}>
                <UcenikAppBar expanded={this.state.expanded} onFullscreen={this.expandContent} onMenu={this.showMenu} />

                <Sidebar appbar={sidebarAppbar} open={!this.state.expanded}>
                </Sidebar>

                <Content expanded={this.state.expanded} classes={{ root: classes.content }}>
                    <Question questions={this.questions} />
                </Content>
            </div>
        );
    }
}

Forms.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(Forms);