import React, { Component } from "react"
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import ContentCard from '../content-card/contentCard'
import Button from '@material-ui/core/Button/Button'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import styles from './questionStyle'
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple'
import ucenikApi from '../../data/apiController/ucenik'


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
            answers: {}
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
        let answers = this.state.answers
        return (
            <div className={answers[sign + currentQuestionIndex] ? classes.answerSelected : classes.answer}>
                <div name={sign} onClick={this.answerClick} className={classes.answerOverlay} />
                <Typography className={classes.answerNum} variant='headline'>{sign}</Typography>
                <Typography className={classes.answerText} variant='headline' >{answer}</Typography>
            </div>
        )
    }

    submitButton = (classes) =>
        <Button
            className={classes.answerNavButton}
            onClick={this.submit} >
            Submit
                </Button>

    nextButton = (classes) => <Button
        className={classes.answerNavButton}
        onClick={this.changeQuestion(true)} >
        Next
                </Button>

    submit = () => {
        let { answers } = this.state
        let points = 0

        let testPoints = 0
        for (let question in this.state.questions) {
            console.log({ WUT: this.state.questions[question] })
            console.log(this.state.questions[question].answers)
            for (let answer in this.state.questions[question].answers) {
                if (this.state.questions[question].answers[answer].isCorrect) {
                    testPoints += 1
                }
            }
        }

        for (let answerKey in answers) {
            let answerNumber = answerKey.charCodeAt(0) - 65
            let questionNumber = answerKey.charCodeAt(1) - 48
            if (this.state.questions[questionNumber].answers[answerNumber].isCorrect) {
                points += 1
            } else {
                points -= 1
            }
        }

        for (let questionIndex = 0; questionIndex < this.state.questions.length; questionIndex++) {
            for (let answerIndex = 0; answerIndex < this.state.questions[questionIndex].answers.length; answerIndex++) {
                if (this.state.questions[questionIndex].answers[answerIndex].isCorrect) {
                    let answerCode = String.fromCharCode(answerIndex + 65) + questionIndex
                    if (!this.state.answers[answerCode]) {
                        points -= 1
                    }
                }
            }
        }
        ucenikApi.solveTest({
            studentId: this.props.studentId,
            testId: this.props.testId,
            solution: this.state.answers,
            studentsPoints: points,
            testPoints: testPoints,
        }).then(data => {
            console.log(data)
        })
    }

    answerClick = (ev) => {
        let targetName = ev.target.getAttribute('name')
        let currentQuestionIndex = this.state.currentQuestionIndex
        let currentAnswers = this.state.answers
        let targetState = currentAnswers[targetName + currentQuestionIndex]
        currentAnswers[targetName + currentQuestionIndex] = !targetState
        this.setState({ answers: currentAnswers })
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
                            {currentQuestion.text}
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
                            <Button
                                className={classes.answerNavButton}
                                disabled={currentQuestionIndex === 0}
                                onClick={this.changeQuestion(false)}>
                                Previous
                            </Button>
                            {
                                currentQuestionIndex + 1 === questions.length ||
                                    !this.state.duration ?
                                    this.submitButton(classes) :
                                    this.nextButton(classes)
                            }
                        </div>
                    </div>

                </ContentCard>
            </div >
        );
    }
}



export default withStyles(styles)(Question);