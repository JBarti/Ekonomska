
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ContentCard from '../../../common/content-card/contentCard'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

let data = [
    { name: 'Test 1', Postotak: 66 },
    { name: 'Test 2', Postotak: 76 },
    { name: 'Test 3', Postotak: 86 },
    { name: 'Test 4', Postotak: 56 },
    { name: 'Test 5', Postotak: 96 },
];

const styles = theme => ({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    cardDiv: {
        width: '100%',
        boxSizing: 'content-box',
        overflow: 'hidden',
        padding: '1%',
        zIndex: 0
    },
    customCard: {
        width: '155%',
        marginRight: 20,
    },
    table: {
        width: '25%',
        marginLeft: 12,
        display: 'flex',
        flexDirection: 'row'
    },
    result: {
        borderLeft: '2px green solid',
        width: '100%'
    },
    resultList: {
        width: '100%'
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
        console.log({ solutions: this.props.tests })
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
        return (<div className={classes.container}>
            <ContentCard cardName='Moji rezultati' classes={{ root: classes.customCard }}>
                <div className={classes.cardDiv}>
                    <ResponsiveContainer width="95%" height="100%">
                        <BarChart width={600} height={300} data={data}
                            margin={{ top: 5, right: 15, left: 15, bottom: 5 }} maxBarSize={60} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Bar dataKey="Postotak" fill="#404040" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </ContentCard>

            <ContentCard cardName='Moji rezultati' className={classes.table}>
                <List className={classes.resultList}>
                    {this.props.solutions.map(solution => {
                        return (
                            <ListItem button className={classes.result}>
                                <Typography variant='headline' style={{ fontSize: 24, color: 'green' }}>
                                    {solution.studentsPoints / solution.testPoints * 100}%
                        </Typography>
                                <Typography variant='display1' style={{ lineHeight: '1em', verticalAlign: 'middle', fontWeight: 400, fontSize: 18, paddingLeft: 25, color: 'black' }}>
                                    {this.props.tests.filter(test => {
                                        return test.id === solution.testId
                                    })[0].name}
                                </Typography>
                                <Typography variant='display1' style={{ lineHeight: '1em', verticalAlign: 'middle', fontSize: 14, position: "absolute", right: 60 }}>
                                    {this.props.tests.filter(test => {
                                        return test.id === solution.testId
                                    })[0].createdAt}
                                </Typography>
                            </ListItem>)
                    })}
                </List>
            </ContentCard>
        </div>
        )
    }

}

export default withStyles(styles)(GradesCard);



