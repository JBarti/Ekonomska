import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Sidebar from "../../common/sidebar/sidebar";
import ListButton from "../../common/list-button/listButton";
import ListFolder from "../../common/list-folder/listFolder";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Content from "../../common/content/content";
import Row from "../../common/content/row/row";
import UcenikAppBar from "../ucenik/components/appbar";
import NotificationCard from "./components/notificationCard";
import NotesCard from "./components/notesCard";
import Slide from "@material-ui/core/Slide";
import { Typography } from "@material-ui/core";
import Dashboard from "./components/dashboard";
import External from "../ucenik/components/external";
import proffesorApi from "../../data/apiController/proffesor";
import FileAdder from "./components/flleAdder";
import Forms from "./components/forms";

const styles = theme => {
  console.log(theme);
  return {
    sidebarNav: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap"
    },
    sidebarHeading: {
      paddingLeft: 16
    },
    content: {
      height: "100%"
    },
    addButton: {
      textAlign: "center",
      fontSize: 35
    }
  };
};

class Profesor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullscreen: false,
      expanded: false,
      content: undefined,
      currentPage: "Home",
      animate: true,
      proffesor: undefined,
      selectedGrade: undefined,
      fileAdderOpened: false,
      lesson: undefined
    };

    this.loadProffesor();
  }

  loadProffesor = () => {
    proffesorApi
      .getData()
      .then(data => {
        console.log({ profesor: data.data });
        this.setState({
          proffesor: data.data
        });
        this.setState({
          content: this.home(this.state).component
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  selectGrade = grade => {
    grade.files = grade.files.map(file => {
      file.component = <External url={file.url} />;
      return file;
    });

    grade.tests = grade.tests.map(test => {
      test.component = (
        <Forms
          questions={test.questions}
          testId={test.id}
          lesson={test.lesson}
          gradeId={grade.id}
          testName={test.name}
        />
      );
      return test;
    });

    this.setState({ selectedGrade: grade });
    console.log({ grade: grade });
  };

  home = state => ({
    name: "Home",
    component: (
      <Dashboard
        grades={state.proffesor.grades}
        clickGrade={this.selectGrade}
      />
    )
  });

  genFileButtons = (lessonNumber, files) => {
    return files
      .filter(file => {
        return parseInt(file.lesson) === lessonNumber;
      })
      .map(file => {
        return (
          <ListButton
            onClick={() => {
              this.changeContent(file);
            }}
            tabbed={true}
            primary={file.name}
            disabled={!file.active}
          />
        );
      });
  };

  expandContent = () => {
    this.setState({ fullscreen: !this.state.fullscreen });
  };

  showMenu = () => {
    this.setState({
      open: !this.state.open,
      expanded: !this.state.expanded
    });
  };

  changeContent = content => {
    this.setState({ animate: false });
    setTimeout(() => {
      this.setState({
        animate: true,
        currentPage: content.name,
        content: content.component
      });
    }, 300);
  };

  addTest = name => {
    let grade = this.state.selectedGrade;
    let test = {
      name: name,
      active: true,
      lesson: this.state.lesson,
      questions: [],
      component: (
        <Forms
          questions={[
            {
              text: "",
              answers: []
            }
          ]}
          testId={undefined}
          lesson={this.state.lesson}
          gradeId={grade.id}
          testName={name}
        />
      )
    };
    grade.tests.push(test);
    this.setState({ grade: grade });
    this.changeContent(test);
  };

  openFileAdder = lesson => () => {
    this.setState({ fileAdderOpened: true, lesson: lesson });
  };

  render() {
    const { classes } = this.props;
    const { selectedGrade } = this.state;

    let sidebarAppbar = (
      <div className={classes.sidebarNav}>
        <IconButton
          style={{ color: "white" }}
          onClick={() => {
            this.changeContent(this.home(this.state));
          }}
        >
          <ArrowBack />
        </IconButton>
        <Slide timeout={250} direction="down" in={this.state.animate}>
          <Typography
            className={classes.sidebarHeading}
            variant="subheading"
            style={{ color: "white" }}
          >
            {this.state.currentPage}
          </Typography>
        </Slide>
      </div>
    );

    let sidebarItems = () => (
      <div>
        <ListFolder
          primary="Marketing"
          classes={{ expanded: classes.folderExpanded }}
          className={classes.sidebarContent}
        >
          {this.genFileButtons(1, selectedGrade.files)}
          {this.genFileButtons(1, selectedGrade.tests)}
          {[
            <ListButton
              onClick={this.openFileAdder("1")}
              classes={{ listItemText: classes.addButton }}
              primary="ADD NEW"
              icon={<div />}
            />
          ]}
        </ListFolder>
      </div>
    );

    return (
      <div>
        <UcenikAppBar
          expanded={this.state.expanded}
          onFullscreen={this.expandContent}
          onMenu={this.showMenu}
        />

        <Sidebar appbar={sidebarAppbar} open={!this.state.expanded}>
          {selectedGrade ? sidebarItems() : undefined}
        </Sidebar>
        <Content expanded={this.state.expanded}>{this.state.content}</Content>
        <FileAdder
          open={this.state.fileAdderOpened}
          onClose={() => {
            this.setState({ fileAdderOpened: false });
          }}
          onNewTest={this.newTest}
          lesson={this.state.lesson}
          grade={this.state.selectedGrade}
          addTest={this.addTest}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Profesor);
