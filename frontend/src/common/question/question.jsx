import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Check from '@material-ui/icons/RadioButtonChecked'
import Uncheck from '@material-ui/icons/RadioButtonUnchecked'
import ContentCard from '../content-card/contentCard'
import Button from '@material-ui/core/Button/Button'
import Icon from '@material-ui/core/Icon'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import './question.css'


var answerStyle = {
    position: 'relative',
    flexGrow: 0.5,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 60,
    marginRight: 40,
    paddingBottom: 20,
    paddingTop: 20,
    alignItems: 'center',
    borderBottom: '1px white solid',
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:last-child': {
        borderBottom: 'none'
    },
}

const styles = theme => ({
    radioGroup: {
        paddingLeft: 12,
        marginTop: 8
    },
    root: {
        marginTop: '10%',
        width: '60%',
        height: '50%',
        padding: 0,
    },
    card: {
        flexDirection: 'row',
    },
    questionCard: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    questionText: {
        fontSize: 20,
        width: '70%'
    },
    answerCard: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.secondary.light,
        position: 'relative',
        display: 'flex',
    },
    answerContainer: {
        width: '100%',
        height: 'calc(100% - 142.5px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 50
    },
    questionNumber: {
        width: 'fit-content',
        paddingLeft: 5,
        paddingRight: 5,
        borderBottom: '2px red solid',
        color: theme.palette.secondary.light,
        borderBottomColor: theme.palette.secondary.light,
        paddingBottom: 5,
        marginTop: 40
    },
    timer: {
        marginTop: 60,
        marginBottom: -25
    },
    time: {
        position: 'relative',
        top: '-50%',
        fontSize: 70,
        color: theme.palette.grey[700]
    },
    answer: {
        '&:-moz-any(div)': answerStyle,
        '&:hover': {
            boxShadow: theme.shadows[2],
            backgroundColor: 'white',
            '& > h1:first-child': {
                backgroundColor: theme.palette.secondary.light,
                color: 'white',
                boxShadow: 'none'
            },
            '& > h1:last-child': {
                color: theme.palette.secondary.light,
            }
        },
        '&:active': {
            boxShadow: theme.shadows[0],
        }
    },
    answerSelected: {
        '&:-moz-any(div)': answerStyle,
        boxShadow: theme.shadows[1],
        backgroundColor: 'white',
        '&:hover': {
            boxShadow: theme.shadows[4]
        },
        '&:last-child': {
            borderBottom: 'none'
        },
        '& > h1:first-child': {
            backgroundColor: theme.palette.secondary.light,
            color: 'white',
            boxShadow: 'none'
        },
        '& > h1:last-child': {
            color: theme.palette.secondary.light,
        }
    },
    answerNum: {
        fontSize: 22,
        backgroundColor: 'white',
        borderRadius: 900,
        width: 33,
        height: 33,
        padding: '4px 3px 0 3px',
        textAlign: 'center',
        color: theme.palette.secondary.light,
        boxShadow: theme.shadows[2],
        userSelect: 'none',
    },
    answerText: {
        fontSize: 20,
        color: 'white',
        paddingTop: 5,
        textAlign: 'center',
        marginLeft: 20,
        letterSpacing: 1,
        fontWeight: 500,
        userSelect: 'none'
    },
    answerNavbar: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',

    },
    answerNavButton: {
        flexGrow: 1,
        color: 'white',
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: 0,
        marginRight: 1,
        paddingTop: 15,
        paddingBottom: 15,
        '&:hover': {
            backgroundColor: 'white',
            color: theme.palette.secondary.light
        }
    },
    answerOverlay: {
        marginLeft: -60,
        position: 'absolute',
        width: '100%',
        height: '100%'
    }


})


class Question extends Component {
    constructor(props) {
        super(props)

        let questionsIterator = props.questions[Symbol.iterator]()

        this.state = {
            value: 'denis',
            fade: true,
            questions: props.questions,
            currentQuestionIndex: 0
        }
    }


    signGen = () => {
        var sign = '@'

        return (() => {
            let signCharCode = sign.charCodeAt(0)
            sign = String.fromCharCode(signCharCode + 1)
            return sign
        })
    }

    answerOption = (classes, sign, answer) => {
        return (
            <div className={this.state[sign] ? classes.answerSelected : classes.answer}>
                <div name={sign} onClick={this.answerClick} className={classes.answerOverlay} />
                <Typography className={classes.answerNum} variant='headline'>{sign}</Typography>
                <Typography className={classes.answerText} variant='headline' >{answer}</Typography>
            </div>
        )
    }

    answerClick = (ev) => {
        let targetName = ev.target.getAttribute('name')
        let targetState = this.state[targetName]
        this.setState({ [targetName]: !targetState })
        console.log(targetName)
    }

    changeQuestion = (next) => {
        return () => {
            let { currentQuestionIndex } = this.state
            currentQuestionIndex += next ? 1 : -1

            this.setState({ fade: false, })

            setTimeout(

                () => this.setState({
                    currentQuestionIndex,
                    fade: true
                }), 200)
        }
    }

    render() {
        const { classes } = this.props;
        const signGen = this.signGen()
        const { questions } = this.state
        let currentQuestion = this.state.questions[this.state.currentQuestionIndex]

        return (
            <div className={classes.root}>
                <ContentCard classes={{ children: classes.card }}>
                    <div className={classes.questionCard}>
                        <Typography variant='headline' className={classes.questionNumber}>
                            Pitanje 1/{questions.length}
                        </Typography>
                        <div className={classes.timer}>
                            <CircularProgress color='secondary' thickness={1} size={175} variant='static' value={50} className={classes.circle} />
                            <div className={classes.time}>90</div>
                        </div>
                        <Typography variant='subheading' className={classes.questionText}>
                            {currentQuestion.question}
                        </Typography>
                    </div>
                    <div className={classes.answerCard} >
                        <Fade in={this.state.fade} timeout={200}>
                            <div className={classes.answerContainer}>
                                {currentQuestion.answers.map(
                                    (data) => {
                                        return this.answerOption(
                                            classes,
                                            signGen(),
                                            data.answer
                                        )
                                    })}
                            </div>
                        </Fade>
                        <div className={classes.answerNavbar}>
                            <Button className={classes.answerNavButton} onClick={this.changeQuestion(false)}>
                                Previous
                            </Button>
                            <Button className={classes.answerNavButton} onClick={this.changeQuestion(true)}>
                                Next
                            </Button>
                        </div>
                    </div>

                </ContentCard>
            </div >
        );
    }
}



export default withStyles(styles)(Question);