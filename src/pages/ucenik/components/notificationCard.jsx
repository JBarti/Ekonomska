import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContentCard from "../../../common/content-card/contentCard";
import Harmonica from "../../../common/harmonica/harmonica";
import HarmonicaTab from "../../../common/harmonica/harmonica-tab/harmonicaTab";

const styles = theme => ({
  root: {
    overflow: "hidden"
  }
});

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
      <ContentCard cardName="Obavijesti" className={classes.root}>
        <Harmonica>
          {notifications.map((notification, index) => {
            console.log(index, "INDEEEX");
            return (
              <HarmonicaTab
                deleteable={false}
                type={notification.important ? "warning" : "message"}
                heading={notification.title}
                subheading={notification.description.substring(0, 20)}
                bodyText={notification.description}
                name={index}
                onClick={this.expandTab(index)}
                expanded={this.state.open == index}
              />
            );
          })}
        </Harmonica>
      </ContentCard>
    );
  }
}

export default withStyles(styles)(NotifiactionCard);
