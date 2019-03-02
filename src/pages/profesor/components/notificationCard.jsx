import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContentCard from "../../../common/content-card/contentCard";
import Harmonica from "../../../common/harmonica/harmonica";
import HarmonicaTab from "../../../common/harmonica/harmonica-tab/harmonicaTab";
import CreateNotificationDialog from "./dialog";
import { deleteNotification } from "../../../actions/proffesorActions";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    overflow: "hidden"
  },
  mutton: {
    position: "absolute",
    zIndex: 25,
    right: 100,
    bottom: 100,
    height: "100%"
  },
  dialog: {
    overflowX: "hidden"
  }
});

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
      <ContentCard cardName="Obavijesti" className={classes.root}>
        <CreateNotificationDialog
          className={classes.mutton}
          gradeId={gradeId}
        />
        <Harmonica>
          {notifications.map((notification, index) => {
            console.log(index, "INDEEEX");
            return (
              <HarmonicaTab
                deleteable={true}
                type={notification.important ? "warning" : "message"}
                heading={notification.title}
                subheading={notification.description.substring(0, 20)}
                bodyText={notification.description}
                name={index}
                onClick={this.expandTab(index)}
                onTrash={this.removeNotification(notification.id)}
                expanded={this.state.open == index}
              />
            );
          })}
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
