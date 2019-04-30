import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContentCard from "../../../common/content-card/contentCard";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import FinPlanChoice from "./finPlanChoice";
import { Button } from "@material-ui/core";

const styles = theme => ({
  finplancrd: {},
  saveBtn: {
    display: "tableRow"
  }
});
let id = 0;
function createData(naziv, cijena) {
  id += 1;
  return { id, naziv, cijena };
}

const rows = [
  createData("rashod 1", 4.0),
  createData("rashod 2", 237),
  createData("rashod 3", 262),
  createData("rashod 4", 305)
];

function PRTablica(kategorija) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Rashodi</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Naziv</TableCell>
          <TableCell align="right">Cijena</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.naziv}
            </TableCell>
            <TableCell align="right">
              {" "}
              <TextField
                id="number"
                label="Rashod"
                type="number"
                defaultValue={row.cijena}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 5,
                  min: row.cijena - 30,
                  max: row.cijena + 30
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
class finPlanerComp extends Component {
  render() {
    const { classes } = this.props;
    return (
      <ContentCard
        cardName={
          <div>
            <div>Financijski planer</div>
            <FinPlanChoice />
          </div>
        }
        className={classes.finplancrd}
      >
        <PRTablica kategorija={rows} />
        <PRTablica kategorija={rows} />
        <Button className={classes.saveBtn} color="primary" variant="raised">
          Spremi
        </Button>
      </ContentCard>
    );
  }
}

export default withStyles(styles)(finPlanerComp);
