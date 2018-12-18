import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import UcenikAppBar from './appbar'
import Sidebar from '../../../common/sidebar/sidebar'
import Slide from '@material-ui/core/Slide'
import ArrowBack from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import { List, Typography } from '@material-ui/core';
import Content from '../../../common/content/content'
import Row from '../../../common/content/row/row'
import ContentCard from '../../../common/content-card/contentCard'
import Question from '../../../common/question/question'


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
        content: {
            height: '100%',
            alignItems: 'center',
        },
        questionContainer: {
            marginTop: 80,
            paddingLeft: 160
        },
    })
}


class Forms extends Component {

    constructor(props) {
        super(props)
        console.log("WTF")
        console.log(this.props)
        this.state = { fullscreen: false, currentPage: 'Home', animate: true }
        console.log("WTF")
        console.log(this.state)
    }


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
    render() {
        const { classes } = this.props;
        return (
            <Question questions={this.questions} duration={10} />

        );
    }
}

Forms.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(Forms);