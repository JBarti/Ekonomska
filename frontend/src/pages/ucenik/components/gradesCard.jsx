import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContentCard from "../../../common/content-card/contentCard";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const styles = theme => ({
  cardDiv: {
    width: "100%",
    boxSizing: "content-box",
    overflow: "hidden",
    padding: "1%",
    zIndex: 0
  }
});

class GradesCard extends Component {
  state = { open: null };
  expandTab = panel => (event, expanded) => {
    if (panel === this.state.open) {
      this.setState({ open: null });
    } else {
      this.setState({ open: panel });
    }
  };

  render() {
    const { classes, tests, solutions } = this.props;
    const { value } = this.state;
    let id = 0;
    function createData(name, postotak, ocjena, total) {
      id += 1;
      return { id, name, postotak, ocjena, total };
    }

    // const rows = [
    //   createData("Test 1", 59, 68, 80),
    //   createData("Test 2", 2, 3, 4),
    //   createData("Test 3", 20, 13, 7),
    //   createData("Test 4", 20, 13, 7),
    //   createData("Test 5", 20, 13, 7)
    // ];

    const rows = solutions
      .map(solution => {
        if (!solution) {
          return;
        }
        let test = tests.filter(test => test.id === solution.testId)[0];
        let testPoints = test.questions.length;
        let acquiredPoints = solution.points;
        let percentage = (acquiredPoints / testPoints) * 100;
        let grade = (() => {
          grade = 1;
          switch (percentage) {
            case percentage <= 50: {
              grade = 1;
              break;
            }
            case percentage <= 60: {
              grade = 2;
              break;
            }
            case percentage <= 75: {
              grade = 3;
              break;
            }
            case percentage <= 90: {
              grade = 4;
              break;
            }
            case percentage <= 100: {
              grade = 5;
              break;
            }
          }
          return grade;
        })();
        console.log("GRADE");
        console.log(testPoints);

        return createData(test.name, percentage, grade, testPoints);
      })
      .filter(data => !!data);

    const data = rows.map(row => {
      return { name: row.name, Postotak: row.postotak };
    });

    return (
      <ContentCard
        cardName="Moji rezultati"
        classes={{ root: classes.customCard }}
      >
        <div className={classes.cardDiv}>
          <ResponsiveContainer width="90%" height="100%">
            <BarChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              maxBarSize={40}
            >
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="Postotak" fill="#8A3369" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={classes.cardDiv}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell numeric>Postotak</TableCell>
                <TableCell numeric>Ocjena</TableCell>
                <TableCell numeric>Test</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell numeric>{row.postotak}</TableCell>
                    <TableCell numeric>{row.ocjena}</TableCell>
                    <TableCell numeric>{row.total}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </ContentCard>
    );
  }
}

export default withStyles(styles)(GradesCard);
