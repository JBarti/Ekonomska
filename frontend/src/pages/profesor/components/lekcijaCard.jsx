import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ContentCard from "../../../common/content-card/contentCard";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListButtom from "../../../common/list-button/listButton";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconBook from "@material-ui/icons/Book";
import IconQA from "@material-ui/icons/QuestionAnswer";
import External from "../../../common/external";
import StudentForms from "../../profesor/components/forms";
import EditLekcija from "../../../common/editLekcija";
import AddNewDialog from "../../../common/addNewDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import LockedIcon from "@material-ui/icons/Lock";
import IconQuiz from "@material-ui/icons/School";
import Quiz from "./quiz";
import { deleteFile, deleteTest } from "../../../actions/proffesorActions";
import { connect } from "react-redux";
const drawerWidth = 240;

const styles = theme => ({
  dialog: {
    overflow: "hidden",
    zIndex: 2000
  },
  cardTitle: {
    paddingLeft: 90,
    marginTop: "15%",
    textAlign: "right",
    marginRight: "10%",
    fontSize: 24
  },
  cardSubtitle: {
    marginTop: "2%",
    textAlign: "right",
    marginRight: "10%",
    marginLeft: "23%",
    width: "70%",
    fontSize: 16,
    opacity: 0.6
  },
  square: {
    transform: "rotate(45deg);",
    position: "absolute",
    width: 150,
    height: 150,
    top: -60,
    left: -40,
    backgroundColor: "#C33764",
    opacity: 0.9
  },
  circle: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 70,
    left: -20,
    borderRadius: "100%",
    backgroundColor: "rgba(31,38,103,0.9)",
    opacity: 0.9
  },
  container: {
    marginTop: 10,
    flex: "0 0 350px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);",
    marginRight: "20px",
    "&:last-child": {
      marginRight: "20px"
    }
  },
  containerChildren: {
    position: "relative",
    display: "inline"
  },
  background: {
    position: "absolute",
    right: 10,
    bottom: 10
  },
  root: {
    display: "flex",
    overflowX: "hidden",
    height: "100%",
    maxWidth: "100%"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    textDecoration: "underline",
    marginRight: drawerWidth,
    color: "black",
    backgroundColor: theme.palette.background.default,
    textAlign: "center",
    boxShadow: "0px 7px 50px 0px rgba(255,255,255,1)"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    background: "linear-gradient(180deg, #C33764 0%, #252E73 100%)",
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    width: "78%",
    height: "100%",
    margin: "0 auto"
  },
  contentText: {
    fontSize: 24,
    borderLeftWidth: "5px",
    borderLeftStyle: "solid",
    borderImage: "linear-gradient(180deg, #C33764 0%, #252E73 100%) 1 100%",
    paddingLeft: 15,
    maxWidth: "60%",
    margin: "0 auto"
  },
  contentTitle: {
    paddingBottom: 25,
    color: "black"
  },
  lekcijaIme: {
    padding: 10,
    color: "gray"
  },
  buttonText: {
    color: "white"
  },
  appbarTitle: {
    paddingLeft: 10
  },
  landingTxt: {
    textAlign: "center",
    marginTop: "15%"
  }
});

const startingScreen = (classes, lekcija) => (
  <div className={classes.landingTxt}>
    <Typography className={classes.contentTitle} variant="display2">
      {lekcija.name}
    </Typography>
    <Typography className={classes.contentText} paragraph>
      {lekcija.description}
    </Typography>
  </div>
);

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class LekcijaCard extends Component {
  state = {
    open: false,
    content: startingScreen(this.props.classes, {
      name: this.props.folder.name,
      description: this.props.folder.description
    })
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({
      content: startingScreen(this.props.classes, {
        name: this.props.folder.name,
        description: this.props.folder.description
      })
    });
  };

  reload = () => {
    this.handleClose();
    setTimeout(() => {
      this.setState({
        content: startingScreen(this.props.classes, {
          name: this.props.folder.name,
          description: this.props.folder.description
        })
      });
      this.handleClickOpen();
    }, 450);
  };

  showFile = file => () => {
    this.handleClose();
    setTimeout(this.handleClickOpen, 350);
    setTimeout(() => {
      this.setState({ content: <External url={file.url} /> });
    }, 10);
  };

  showTest = test => () => {
    this.handleClose();
    setTimeout(this.handleClickOpen, 350);
    setTimeout(() => {
      this.setState({
        content: (
          <StudentForms
            reload={this.reload}
            test={test}
            folderId={this.props.folder.id}
          />
        )
      });
    }, 10);
  };

  showQuiz = quiz => () => {
    this.handleClose();
    setTimeout(this.handleClickOpen, 350);
    setTimeout(() => {
      this.setState({
        content: (
          <Quiz
            reload={this.reload}
            test={quiz}
            folderId={this.props.folder.id}
          />
        )
      });
    }, 10);
  };

  removeFile = fileId => () => {
    let { dispatch } = this.props;
    let folderId = this.props.folder.id;
    dispatch(deleteFile(fileId, folderId));
    this.reload();
  };

  removeTest = testId => () => {
    let { dispatch } = this.props;
    let folderId = this.props.folder.id;
    dispatch(deleteTest(testId, folderId));
    this.reload();
  };

  render() {
    const { classes, folder } = this.props;
    const { name, description, tests, files, id } = folder;
    return (
      <ContentCard
        classes={{
          root: classes.container,
          children: classes.containerChildren
        }}
      >
        <div className={classes.circle} />
        <div className={classes.square} />
        <div className={classes.cardTitle}>{name}</div>
        <div className={classes.cardSubtitle}>{description}</div>
        <div>
          <Button
            variant="outlined"
            classes={{ label: classes.lekcijaIme, root: classes.background }}
            onClick={this.handleClickOpen}
            style={{ padding: 0 }}
          >
            pregled
          </Button>
        </div>
        <Dialog
          classes={{ paper: classes.dialog }}
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <div className={classes.root}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={this.handleClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.appbarTitle}
                >
                  {name} - {description}
                </Typography>
                <EditLekcija
                  reload={this.reload}
                  folder={{ name, description, id }}
                />
              </Toolbar>
            </AppBar>

            <main className={classes.content}>
              <div className={classes.toolbar} />
              {this.state.content}
            </main>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}
              anchor="right"
            >
              <div className={classes.toolbar} />
              <Divider />
              <List>
                {files.map(file => (
                  <ListButtom
                    primary={file.name}
                    classes={{ text: classes.buttonText }}
                    iconColor="white"
                    icon={<IconBook />}
                    onClick={this.showFile(file)}
                    secondaryAction={
                      <IconButton onClick={this.removeFile(file.id)}>
                        <DeleteIcon style={{ color: "white", opacity: 0.4 }} />
                      </IconButton>
                    }
                  />
                ))}
              </List>
              <Divider />
              <List>
                {tests
                  .filter(test => !test.isQuiz)
                  .map(test => (
                    <ListButtom
                      primary={test.name}
                      classes={{ text: classes.buttonText }}
                      iconColor="white"
                      icon={<IconQA />}
                      onClick={this.showTest(test)}
                      secondaryAction={
                        test.locked ? (
                          <IconButton>
                            <LockedIcon
                              style={{ color: "white", opacity: 0.4 }}
                            />
                          </IconButton>
                        ) : (
                          <IconButton onClick={this.removeTest(test.id)}>
                            <DeleteIcon
                              style={{ color: "white", opacity: 0.4 }}
                            />
                          </IconButton>
                        )
                      }
                    />
                  ))}
              </List>
              <Divider />
              <List>
                {tests
                  .filter(test => test.isQuiz)
                  .map(test => (
                    <ListButtom
                      primary={test.name}
                      classes={{ text: classes.buttonText }}
                      iconColor="white"
                      icon={<IconQuiz />}
                      onClick={this.showQuiz(test)}
                      secondaryAction={
                        test.locked ? (
                          <IconButton>
                            <LockedIcon
                              style={{ color: "white", opacity: 0.4 }}
                            />
                          </IconButton>
                        ) : (
                          <IconButton onClick={this.removeTest(test.id)}>
                            <DeleteIcon
                              style={{ color: "white", opacity: 0.4 }}
                            />
                          </IconButton>
                        )
                      }
                    />
                  ))}
                <Divider />
                <AddNewDialog folderId={folder.id} />
              </List>
            </Drawer>
          </div>
        </Dialog>
      </ContentCard>
    );
  }
}
LekcijaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect()(withStyles(styles)(LekcijaCard));
