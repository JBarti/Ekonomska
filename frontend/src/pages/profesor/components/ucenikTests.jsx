import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContentCard from "../../../common/content-card/contentCard";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Tab } from "@material-ui/core";

const styles = theme => ({
  customCard: {
    marginTop: 50
  }
});
class UcenikTests extends Component {
  getTest = testId => {
    let { tests } = this.props;
    let test = tests.find(test => {
      return test.id === testId;
    });
    console.log(tests);
    console.log(test);
    return test;
  };

  render() {
    const { classes, solutions } = this.props;
    return (
      <ContentCard
        elevation={0}
        cardName="Učenikovi testovi"
        classes={{ root: classes.customCard }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test</TableCell>
              <TableCell align="right">Ukopno bodova</TableCell>
              <TableCell align="right">Postignuto bodova</TableCell>
              <TableCell align="right">Postotak</TableCell>
            </TableRow>
            {solutions.map(solution => {
              let test = this.getTest(solution.testId);
              let postotak = (solution.points / test.questions.length) * 100;
              return (
                <TableRow>
                  <TableCell>{test.name}</TableCell>
                  <TableCell align="right">{test.questions.length}</TableCell>
                  <TableCell align="right">{solution.points}</TableCell>
                  <TableCell align="right">{postotak}</TableCell>
                </TableRow>
              );
            })}
          </TableHead>
        </Table>
      </ContentCard>
    );
  }
}

export default withStyles(styles)(UcenikTests);
