import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Visibility from "@material-ui/icons/Visibility";
import GradesCard from "./gradesCard";
import AddNewDialog from "./addNewDialog";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const drawerWidth = 240;

const styles = theme => ({
  dialog: {
    overflow: "hidden",
    zIndex: 2000
  },
  container: {
    width: "20%",
    height: "20%"
  },
  background: {
    background: "linear-gradient(135deg, #C33764 0%, #252E73 100%)",
    width: "100%",
    height: "100%",
    overflowX: "hidden",
    overflowY: "hidden"
  },
  root: {
    display: "flex",
    padding: 15,
    overflowX: "hidden",
    maxWidth: "100%"
  },
  cardDiv: {
    width: "100%",
    boxSizing: "content-box",
    overflow: "hidden",
    padding: "1%",
    zIndex: 0
  },
  lekcijaIme: {
    color: "white",
    lineHeight: "100%",
    verticalAlign: "middle"
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
    margin: "0 auto",
    height: "87.5%"
  },
  contentText: {
    fontSize: 24,
    borderLeftWidth: "3px",
    borderLeftStyle: "solid",
    borderImage: "linear-gradient(180deg, #C33764 0%, #252E73 100%) 1 100%",
    paddingLeft: 15
  },
  contentTitle: {
    paddingBottom: 25,
    color: "black"
  }
});
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class LekcijaCard extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    console.log("OPEN");
    this.setState({ open: true });
  };

  handleClose = () => {
    console.log("KLOOZ");
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <ListItem button onClick={this.handleClickOpen}>
          <ListItemText primary="4.D" />
          <ListItemSecondaryAction onClick={this.handleClickOpen}>
                      <IconButton aria-label="Delete">
                        <Visibility />
                      </IconButton>
                    </ListItemSecondaryAction>
        </ListItem>
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
                  className={classes.flex}
                >
                  Ante Antic
                </Typography>
              </Toolbar>
            </AppBar>

            <main className={classes.content}>
              <div className={classes.toolbar} />

              <GradesCard />
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
                {["Inbox", "Starred", "Send email", "Drafts"].map(
                  (text, index) => (
                    <ListItem style={{ color: "white" }} button key={text}>
                      <ListItemIcon style={{ color: "white" }}>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText style={{ color: "white" }} primary={text} />
                    </ListItem>
                  )
                )}
              </List>
              <Divider />
              <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                  <ListItem style={{ color: "white" }} button key={text}>
                    <ListItemIcon style={{ color: "white" }}>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText style={{ color: "white" }} primary={text} />
                  </ListItem>
                ))}
                <AddNewDialog/>
              </List>
            </Drawer>
          </div>
        </Dialog>
      </div>
    );
  }
}
LekcijaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LekcijaCard);
