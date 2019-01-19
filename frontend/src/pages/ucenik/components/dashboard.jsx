import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import Row from "../../../common/content/row/row";
import NotificationCard from "./notificationCard";
import GradesCard from "./gradesCard";
import WalletCard from "./walletCard";
import LekcijaCard from "../../../common/lekcijaCard";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import gradesCard from "./gradesCard";
import lekcijaCard from "../../../common/lekcijaCard";

const styles = theme => ({
  fix: {
    maxHeight: "240px"
  },
  gridList: {
    paddingTop: 30,
    overflowY: "hidden",
    height: 240,
    paddingBottom: 35,
    marginLeft: 20,
    flexWrap: "nowrap",
    transform: "translateZ(0)"
  }
});

class Dashboard extends Component {
  render() {
    const { classes, folders, notifications } = this.props;
    console.log("notifikacjeeee");
    console.log(notifications);
    return (
      <div style={{ height: "calc(100% - 65px)" }}>
        <GridList className={classes.gridList} rows={2.5}>
          {folders.map(folder => (
            <LekcijaCard folder={folder} />
          ))}
        </GridList>
        <Row>
          <NotificationCard notifications={notifications} />
        </Row>
        <Row>
          <GradesCard />
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default connect(store => {
  return {
    notifications: store.notifications.all || [],
    folders: store.grade.folders || []
  };
})(withStyles(styles)(Dashboard));
