import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContentCard from "../../../common/content-card/contentCard";
import List from "@material-ui/core/List";
import Harmonica from "../../../common/harmonica/harmonica";
import HarmonicaTab from "../../../common/harmonica/harmonica-tab/harmonicaTab";
import { Typography, Divider, IconButton, Button } from "@material-ui/core";
import ListButton from "../../../common/list-button/listButton";
import AddIcon from "@material-ui/icons/Add";
import StudentAdder from "../components/studentAdder";
import proffesorApi from "../../../data/apiController/proffesor";

const styles = theme => ({
  root: {
    overflow: "hidden",
    width: "100%"
  },
  studentName: {
    width: "100%",
    marginLeft: 25,
    marginBottom: 15
  }
});

class stdlistCard extends Component {
  state = { open: null, studentAdderOpened: false, grade: {} };

  expandTab = panel => (event, expanded) => {
    if (panel === this.state.open) {
      this.setState({ open: null });
    } else {
      this.setState({ open: panel });
    }
  };

  addStudentDialog = () => {
    this.setState({ studentAdderOpened: true });
  };

  onClose = () => {
    this.setState({ studentAdderOpened: false });
  };

  addStudent = (firstName, lastName, email, password) => {
    proffesorApi
      .addStudent({
        firstName,
        lastName,
        email,
        password,
        gradeId: this.state.grade.id
      })
      .then(student => {
        let grade = this.state.grade;
        grade.students.push(student);
        this.setState({ grade: grade });
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <ContentCard cardName="Moji razredi" className={classes.root}>
        <Harmonica>
          {this.props.grades.map(grade => {
            return (
              <HarmonicaTab
                onClick={() => {
                  this.setState({ grade: grade });
                  this.props.clickGrade(grade);
                  this.expandTab;
                }}
                heading={grade.name + "."}
              >
                <List>
                  {grade.students.map(student => (
                    <div className={classes.studentName}>
                      <Typography
                        variant="subheading"
                        align="left"
                        style={{ width: "100%" }}
                      >
                        {student.firstName} {student.lastName}
                      </Typography>
                    </div>
                  ))}
                  <IconButton
                    onClick={this.addStudentDialog}
                    style={{
                      width: 28,
                      height: 28,
                      border: "2px solid #3f51b5"
                    }}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                </List>
              </HarmonicaTab>
            );
          })}
        </Harmonica>
        <StudentAdder
          onClose={this.onClose}
          open={this.state.studentAdderOpened}
          addStudent={this.addStudent}
        />
      </ContentCard>
    );
  }
}

export default withStyles(styles)(stdlistCard);
