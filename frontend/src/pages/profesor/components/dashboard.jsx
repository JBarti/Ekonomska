import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Row from "../../../common/content/row/row";
import NotificationCard from "./notificationCard";
import PropTypes from "prop-types";
import StdlistCard from "./stdlistCard";
import LekcijaCard from "./lekcijaCard";
import GridList from "@material-ui/core/GridList";
import DodajLekciju from "./dodajLekciju";
import { connect } from "react-redux";

const styles = theme => ({
  fix: {
    maxHeight: "30%"
  },
  gridList: {
    paddingTop: 30,
    overflowY: "hidden",
    height: 240,
    paddingBottom: 35,
    paddingLeft: 20,
    flexWrap: "nowrap",
    transform: "translateZ(0)"
  }
});

class Dashboard extends Component {
  render() {
    const { classes, grades } = this.props;
    const { selectedGrade } = this.props;
    const folders = selectedGrade.folders || [];
    const notifications = selectedGrade.notifications || [];
    return (
      <div style={{ height: "calc(100% - 65px)" }}>
        {Object.getOwnPropertyNames(selectedGrade).length !== 0 ? (
          <GridList className={classes.gridList} rows={2.5}>
            {folders.map(folder => (
              <LekcijaCard folder={folder} />
            ))}
            <DodajLekciju />
          </GridList>
        ) : (
          undefined
        )}
        <Row>
          <StdlistCard grades={grades} />
          {Object.keys(selectedGrade).length ? (
            <NotificationCard
              notifications={notifications}
              gradeId={selectedGrade.id}
            />
          ) : (
            undefined
          )}
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
    grades: store.grades.all || [],
    selectedGrade: store.grades.selectedGrade || {}
  };
})(withStyles(styles)(Dashboard));
