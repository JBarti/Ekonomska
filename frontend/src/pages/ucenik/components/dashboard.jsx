import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Row from "../../../common/content/row/row";
import NotificationCard from "./notificationCard";
import GradesCard from "./gradesCard";
import WalletCard from "./walletCard";
import PropTypes from "prop-types";

const styles = theme => {
  ({
    content: {
      height: "100%"
    }
  });
};

class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div style={{ height: "calc(100% - 65px)" }}>
        <Row>
          <GradesCard
            solutions={this.props.solutions}
            tests={this.props.tests}
          />
        </Row>
        <Row>
          <NotificationCard notifications={this.props.notifications} />
          <WalletCard finance={this.props.finance} />
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
