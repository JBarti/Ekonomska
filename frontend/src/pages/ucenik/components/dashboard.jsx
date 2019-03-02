import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import Row from "../../../common/content/row/row";
import NotificationCard from "./notificationCard";
import GradesCard from "./gradesCard";
import LekcijaCard from "./lekcijaCard";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
    const {
      classes,
      folders,
      notifications,
      studentId,
      solutions
    } = this.props;
    let tests = folders.map(folder => folder.tests).flat();
    let solvedTests = solutions
      .filter(solution => !!solution)
      .map(solution => solution.testId);
    console.log("notifikacjeeee");
    console.log(tests);
    console.log(notifications);
    return (
      <div style={{ height: "calc(100% - 65px)" }}>
        <GridList className={classes.gridList} rows={2.5}>
          {folders.map(folder => (
            <LekcijaCard
              folder={folder}
              studentId={studentId}
              solvedTests={solvedTests}
            />
          ))}
        </GridList>
        {notifications.length ? (
          <Row>
            <NotificationCard notifications={notifications} />{" "}
          </Row>
        ) : (
          <div />
        )}
        {solutions.length ? (
          <Row>
            <GradesCard solutions={solutions} tests={tests} />
          </Row>
        ) : (
          <div />
        )}
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
    notifications: store.grade.notifications || [],
    folders: store.grade.folders || [],
    studentId: store.student.id,
    solutions: store.student.solutions || []
  };
})(withStyles(styles)(Dashboard));
