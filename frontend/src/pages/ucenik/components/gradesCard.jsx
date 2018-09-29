
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ContentCard from '../../../common/content-card/contentCard'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area, Bar, CartesianGrid } from 'recharts';

let dataline = [
    { name: 'Page A', uv: 590, pv: 800, amt: 1400 },
    { name: 'Page B', uv: 868, pv: 967, amt: 1506 },
    { name: 'Page C', uv: 1397, pv: 1098, amt: 989 },
    { name: 'Page D', uv: 1480, pv: 1200, amt: 1228 },
    { name: 'Page E', uv: 1520, pv: 1108, amt: 1100 },
    { name: 'Page F', uv: 1400, pv: 680, amt: 1700 }
];

const styles = theme => ({
    cardDiv: {
        width: '100%',
        boxSizing: 'content-box',
        overflow: 'hidden',
        padding: '1%',
        zIndex: 0
    },
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
                        <ComposedChart layout="vertical" width={600} height={350} data={dataline}
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid stroke='#f5f5f5' />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" />
                            <Tooltip />
                            <Legend />

                            <Bar dataKey='pv' barSize={20} fill='#413ea0' />

                        </ComposedChart>
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
                                    <TableRow key={row.id}>
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



