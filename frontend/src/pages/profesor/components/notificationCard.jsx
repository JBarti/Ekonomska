import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContentCard from "../../../common/content-card/contentCard";
import Harmonica from "../../../common/harmonica/harmonica";
import HarmonicaTab from "../../../common/harmonica/harmonica-tab/harmonicaTab";
import CreateNotificationDialog from "./newNotificationDialog";
import { deleteNotification } from "../../../actions/proffesorActions";
import { connect } from "react-redux";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core/";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core/";

const styles = theme => ({
  root: {
    overflow: "hidden",
    position: "relative"
  },
  mutton: {
    zIndex: 25,
    right: 100,
    bottom: 100,
    height: "100%"
  },
  dialog: {
    overflowX: "hidden"
  },
  title: {
    display: "inline-block",
    paddingLeft: 4,
    paddingRight: 6,
    borderBottom: "solid 3px #4e54c8"
  },
  description: {
    marginTop: 10,
    fontSize: 15
  },
  date: {
    paddingLeft: 12,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 1000,
    fontSize: 14,
    marginTop: 2,
    marginLeft: "75%",
    color: theme.palette.grey[500]
  }
});

const Notification = props => {
  let { classes, notification } = props;
  let { title, description, createdAt } = notification;
  let date = createdAt.split("T")[0];
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        classes={{
          secondary: classes.description
        }}
        primary={
          <div>
            <span className={classes.title}>{title}</span>
          </div>
        }
        secondary={description}
      />
    </ListItem>
  );
};

class NotifiactionCard extends Component {
  state = { open: null };

  componentWillUpdate(oldProps) {
    if (this.props.notifications.length != oldProps.notifications.length) {
      this.setState({ open: null });
    }
  }

  expandTab = panel => (event, expanded) => {
    if (panel === this.state.open) {
      this.setState({ open: null });
    } else {
      this.setState({ open: panel });
    }
  };

  removeNotification = id => () => {
    let { dispatch } = this.props;
    dispatch(deleteNotification(id));
  };

  render() {
    const { classes } = this.props;
    const { notifications, gradeId } = this.props;
    return (
      <ContentCard
        cardName={
          <div>
            <div>Obavjesti</div>
            <CreateNotificationDialog gradeId={gradeId} />
          </div>
        }
        className={classes.root}
      >
        <Harmonica className={classes.hm}>
          {notifications.map(notification => (
            <div>
              <Notification classes={classes} notification={notification} />
              <Divider />
            </div>
          ))}
        </Harmonica>
      </ContentCard>
    );
  }
}

export default connect(store => {
  return {
    selectedGrade: store.grades.selectedGrade
  };
})(withStyles(styles)(NotifiactionCard));
