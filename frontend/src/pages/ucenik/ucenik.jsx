import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Sidebar from "../../common/sidebar/sidebar";
import ListButton from "../../common/list-button/listButton";
import ListFolder from "../../common/list-folder/listFolder";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Content from "../../common/content/content";
import UcenikAppBar from "./components/appbar";
import Slide from "@material-ui/core/Slide";
import { Typography } from "@material-ui/core";
import Dashboard from "./components/dashboard";
import External from "./components/external";
import Forms from "./components/forms";
import ucenikApi from "../../data/apiController/ucenik";

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
    }
  };
};

class Ucenik extends Component {
  home = state => {
    console.log("UCENIK");
    return {
      name: "Home",
      component: (
        <Dashboard
          solutions={this.state.ucenik.solutions}
          tests={this.state.grade.tests}
          notifications={state.ucenik.notifications}
        />
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      fullscreen: false,
      expanded: false,
      currentPage: "Home",
      animate: true,
      content: undefined,
      ucenik: undefined
    };
    this.loadUcenik().then(() => {
      this.initState();
    });
  }

  initState = () => {
    this.setState({ content: this.home(this.state).component });
  };

  loadUcenik = () => {
    return new Promise((resolve, reject) => {
      ucenikApi
        .getData()
        .then(ucenikData => {
          let ucenik = ucenikData.data.student;
          let grade = ucenikData.data.grade;

          grade.files = grade.files.map(file => {
            file.component = <External url={file.url} />;
            return file;
          });

          grade.tests = grade.tests.map(test => {
            test.component = (
              <Forms
                questions={test.questions}
                testId={test.id}
                studentId={ucenik.id}
              />
            );
            return test;
          });
          this.setState({
            ucenik: ucenik,
            grade: grade,
            loaded: true
          });
          resolve();
        })
        .catch(err => {
          reject(err);
        });
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

  render() {
    console.log(this.state);
    const { classes } = this.props;
    const { ucenik } = this.state;
    const { grade } = this.state;

    let genFileButtons = (lessonNumber, files) => {
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

    if (this.state.loaded)
      return (
        <div>
          <UcenikAppBar
            ucenikName={`${ucenik.firstName} ${ucenik.lastName}`}
            expanded={this.state.expanded}
            onFullscreen={this.expandContent}
            onMenu={this.showMenu}
          />

          <Sidebar appbar={sidebarAppbar} open={!this.state.expanded}>
            <ListFolder
              primary="Marketing"
              classes={{ expanded: classes.folderExpanded }}
              className={classes.sidebarContent}
            >
              {genFileButtons(1, grade.files)}
              {genFileButtons(1, grade.tests)}
            </ListFolder>
          </Sidebar>
          <Content expanded={this.state.expanded}>{this.state.content}</Content>
        </div>
      );
    else return <h1>Loading</h1>;
  }
}
export default withStyles(styles)(Ucenik);
