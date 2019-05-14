import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import Row from "../../../common/content/row/row";
import NotificationCard from "./notificationCard";
import GradesCard from "./gradesCard";
import LekcijaCard from "./lekcijaCard";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import IncomeCard from "../../../common/incomeCard";
import OutcomeCard from "../../../common/outcomeCard";
import TotalCard from "./totalCard";
import MonthlyCard from "../../../common/monthlyCard";

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
  constructor(props) {
    super(props);
    this.state = { job: { name: "", amount: 0 }, outcomes: [], fees: [] };
  }

  componentWillReceiveProps(newProp) {
    this.setState(newProp);
  }

  outcomeSliderChange = event => {
    let outcomes = [...this.state.outcomes];
    console.log(outcomes);
    console.log(event.target.name);
    outcomes.find(outcome => outcome.id == event.target.name).change = Number(
      event.target.value
    );
    this.setState({ outcomes });
  };

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
        <Row>
          {notifications.length ? (
            <NotificationCard notifications={notifications} />
          ) : (
            <div />
          )}
          {solutions.length ? (
            <GradesCard solutions={solutions} tests={tests} />
          ) : (
            <div />
          )}
        </Row>
        {this.props.financialYear ? (
          <Row>
            <IncomeCard payment={this.state.job} fees={this.state.fees} />
            <OutcomeCard
              outcomes={this.state.outcomes}
              sliderChange={this.outcomeSliderChange}
              financialYear={this.props.financialYear}
              studentId={this.props.studentId}
              credit={{}}
              unexpected={{}}
            />
            <TotalCard
              outcomes={this.state.outcomes}
              incomes={this.state.fees.concat([this.state.job])}
            />
          </Row>
        ) : (
          <div />
        )}
        {this.props.financialYear ? (
          <Row>
            <MonthlyCard
              outcomes={this.state.outcomes}
              incomes={this.state.fees.concat([this.state.job])}
            />
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
    job: store.finance.job || { amount: 0 },
    fees: store.finance.fees || [],
    outcomes: store.finance.outcomes || [],
    notifications: store.grade.notifications || [],
    folders: store.grade.folders || [],
    studentId: store.student.id,
    solutions: store.student.solutions || [],
    financialYear: store.grade.financialYear || 0
  };
})(withStyles(styles)(Dashboard));
