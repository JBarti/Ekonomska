import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ContentCard from '../../../common/content-card/contentCard'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

let data = [
    { name: 'Test 1', Postotak: 66 },
    { name: 'Test 2', Postotak: 76 },
    { name: 'Test 3', Postotak: 86 },
    { name: 'Test 4', Postotak: 56 },
    { name: 'Test 5', Postotak: 96 },
];

const styles = theme => ({
    cardDiv: {
        width: '100%',
        boxSizing: 'content-box',
        overflow: 'hidden',
        padding: '1%',
        zIndex: 0
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        }
    }
})


class GradesCard extends Component {

    state = { open: null }
    expandTab = panel => (event, expanded) => {
        if (panel === this.state.open) {
            this.setState({ open: null })
        }
        else {
            this.setState({ open: panel })
        }
    }

    render() {
        const { classes } = this.props
        const { value } = this.state;
        let id = 0;
        function createData(name, postotak, ocjena, rank) {
            id += 1;
            return { id, name, postotak, ocjena, rank };
        }

        const rows = [
            createData('Test 1', 59, 68, 80),
            createData('Test 2', 2, 3, 4),
            createData('Test 3', 20., 13., 7.),
            createData('Test 4', 20., 13., 7.),
            createData('Test 5', 20., 13., 7.),
        ];
        return (
            <ContentCard cardName='Moji rezultati' classes={{ root: classes.customCard }}>
                <div className={classes.cardDiv}>
                    <ResponsiveContainer width="90%" height="100%">
                        <BarChart width={600} height={300} data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }} maxBarSize={40} >
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
                                <TableCell></TableCell>
                                <TableCell numeric>Postotak</TableCell>
                                <TableCell numeric>Ocjena</TableCell>
                                <TableCell numeric>Rang</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => {
                                return (
                                    <TableRow className={classes.row} key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell numeric>{row.postotak}</TableCell>
                                        <TableCell numeric>{row.ocjena}</TableCell>
                                        <TableCell numeric>{row.rank}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </ContentCard>
        )
    }

}

export default withStyles(styles)(GradesCard);



