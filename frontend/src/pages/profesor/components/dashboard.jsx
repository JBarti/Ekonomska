import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Row from "../../../common/content/row/row";
import NotificationCard from "./notificationCard";
import PropTypes from "prop-types";
import StdlistCard from "./stdlistCard";
import LekcijaCard from "../../../common/lekcijaCard";
import GridList from "@material-ui/core/GridList";
import DodajLekciju from "./dodajLekciju";
import HorizontalScroll from "./horizontalScroll";

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
    const { classes } = this.props;
    console.log("LOKACIJA");
    console.log(this.props.location);
    return (
      <div style={{ height: "calc(100% - 65px)" }}>
        <GridList className={classes.gridList} rows={2.5}>
          <DodajLekciju />
        </GridList>
        <Row>
          <StdlistCard />
          <NotificationCard />
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(Dashboard);
