import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Divider } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    height: "100%",
    marginRight: "15%"
  },
  caption: {
    fontSize: theme.typography.pxToRem(15),
    height: "100%"
  },
  expanded: {
    margin: "0 0 0 0",
    borderBottomColor: "rgba(0, 0, 0, 0.12)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.12)",
    borderTopStyle: "solid",
    borderTopWidth: 1
  },
  summary: {
    backgroundColor: theme.palette.grey[50]
  }
});

class HarmonicaTab extends Component {
  render() {
    const { classes } = this.props;
    this.state = { message: "4px solid #283593", warning: "4px solid #C62828" };

    return (
      <ExpansionPanel
        expanded={this.props.expanded}
        onChange={this.props.onClick}
        style={{ borderLeft: this.state[this.props.type] }}
        classes={{ expanded: classes.expanded }}
      >
        <ExpansionPanelSummary
          className={classes.summary}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading} variant="heading">
            {this.props.heading}
          </Typography>
          <Typography className={classes.caption} variant="caption">
            {this.props.subheading}
          </Typography>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails>
          <Typography className={classes.body} variant="body1">
            {this.props.bodyText}
          </Typography>
          {this.props.children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

HarmonicaTab.propTypes = {
  classes: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  bodyText: PropTypes.string,
  onClick: PropTypes.function,
  expanded: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(HarmonicaTab);
