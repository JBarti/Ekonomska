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
import styles from './questionStyle'
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple'


class Question extends Component {
    constructor(props) {
        super(props)

        let questionsIterator = props.questions[Symbol.iterator]()
        let currentTime = new Date()

        setInterval(() => {
            if (this.state.duration) {
                let currentTime = (new Date()).getTime() - this.state.startTime
                let endTime = (this.state.endTime - this.state.startTime)
                console.log((currentTime / endTime) * 100)
                let percent = (currentTime / endTime) * 100
                this.setState({ progressValue: percent })
            }
        }, 1000)

        setInterval(() => {
            if (this.state.duration)
                this.setState({ duration: this.state.duration - 1 })
        }, 60000)


        this.state = {
            value: 'denis',
            fade: true,
            questions: props.questions,
            currentQuestionIndex: 0,
            startTime: currentTime.getTime(),
            endTime: currentTime.getTime() + props.duration * 60 * 1000,
            duration: props.duration,
            nextButton: (classes) =>
                <Button
                    className={classes.answerNavButton}
                    onClick={this.changeQuestion(true)} >
                    Next
                </Button>,
            submitButton: (classes) =>
                <Button
                    className={classes.answerNavButton}
                    onClick={this.submit} >
                    Submit
                </Button>

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

    answerOption = (classes, sign, answer, currentQuestionIndex) => {
        return (
            <div className={this.state[sign + currentQuestionIndex] ? classes.answerSelected : classes.answer}>
                <div name={sign} onClick={this.answerClick} className={classes.answerOverlay} />
                <Typography className={classes.answerNum} variant='headline'>{sign}</Typography>
                <Typography className={classes.answerText} variant='headline' >{answer}</Typography>
            </div>
        )
    }

    answerClick = (ev) => {
        let targetName = ev.target.getAttribute('name')
        let currentQuestionIndex = this.state.currentQuestionIndex
        let targetState = this.state[targetName + currentQuestionIndex]
        this.setState({ [targetName + currentQuestionIndex]: !targetState })
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
        let currentQuestionIndex = this.state.currentQuestionIndex
        let currentQuestion = this.state.questions[currentQuestionIndex]
        console.log(TouchRipple)

        return (
            <div className={classes.root}>
                <ContentCard classes={{ children: classes.card }}>
                    <div className={classes.questionCard}>
                        <Typography variant='headline' className={classes.questionNumber}>
                            Pitanje {currentQuestionIndex + 1}/{questions.length}
                        </Typography>
                        <div className={classes.timer}>
                            <CircularProgress
                                color='secondary'
                                thickness={1}
                                size={175}
                                variant='static'
                                value={100 - this.state.progressValue}
                                className={classes.circle} />
                            <div className={classes.time}>
                                {this.state.duration}
                            </div>
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
                                            data.answer,
                                            currentQuestionIndex
                                        )
                                    })}
                            </div>
                        </Fade>
                        <div className={classes.answerNavbar}>
                            <Button className={classes.answerNavButton} disabled={currentQuestionIndex === 0} onClick={this.changeQuestion(false)}>
                                Previous
                            </Button>
                            {currentQuestionIndex + 1 === questions.length || !this.state.duration ? this.state.submitButton(classes) : this.state.nextButton(classes)}
                        </div>
                    </div>

                </ContentCard>
            </div >
        );
    }
}



export default withStyles(styles)(Question);