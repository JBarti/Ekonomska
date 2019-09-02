import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core/";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core/";

const styles = theme => ({
  root: {
    overflow: "hidden",
    width: "100%",
    border: "none",
    marginRight: 10
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
  },
  cardContent: {
    paddingTop: 0
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
  expandTab = panel => (event, expanded) => {
    if (panel === this.state.open) {
      this.setState({ open: null });
    } else {
      this.setState({ open: panel });
    }
  };
  render() {
    const { classes, notifications } = this.props;
    return (
      <Card className={classes.root} elevation={5}>
        <CardHeader title={"Obavjesti"} className={classes.cardHeader} />
        <Divider />
        <CardContent className={classes.cardContent}>
          <List>
            {notifications.map(notification => (
              <div>
                <Notification classes={classes} notification={notification} />
                <Divider />
              </div>
            ))}
            <Divider />
          </List>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(NotifiactionCard);
