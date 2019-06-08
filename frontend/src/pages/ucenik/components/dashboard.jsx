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
import GoalsFulfilledCard from "../../../common/goalsFulfilledCard";
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
    this.state = {
      job: { name: "", amount: 0 },
      outcomes: [],
      fees: [],
      financeVariant: 0
    };
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
      solutions,
      saving
    } = this.props;
    let tests = folders.map(folder => folder.tests).flat();
    let solvedTests = solutions
      .filter(solution => !!solution)
      .map(solution => solution.testId);

    let financeVariant = this.props.fees.find(fee => {
      return fee.name == "Grafiči dizajn";
    })
      ? 1
      : 0;
    financeVariant = this.props.fees.find(fee => {
      return fee.name == "Školovanje";
    })
      ? 2
      : 0;

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

        <Row>
          <IncomeCard payment={this.state.job} fees={this.state.fees} />
          <OutcomeCard
            outcomes={this.state.outcomes}
            incomes={this.state.fees.concat([this.state.job])}
            sliderChange={this.outcomeSliderChange}
            financialYear={this.props.financialYear}
            studentId={this.props.studentId}
            credit={{}}
            unexpected={{}}
            variant={financeVariant}
            saving={this.props.saving}
          />
          <TotalCard
            outcomes={this.state.outcomes}
            incomes={this.state.fees.concat([this.state.job])}
          />
        </Row>

        <Row>
          <MonthlyCard
            outcomes={this.state.outcomes}
            incomes={this.state.fees.concat([this.state.job])}
          />
        </Row>
        {saving ? (
          <Row>
            <GoalsFulfilledCard
              saving={saving}
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
    saving: store.finance.saving || false,
    outcomes: store.finance.outcomes || [],
    notifications: store.grade.notifications || [],
    folders: store.grade.folders || [],
    studentId: store.student.id,
    solutions: store.student.solutions || [],
    financialYear: store.grade.financialYear || 0
  };
})(withStyles(styles)(Dashboard));
