
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ContentCard from '../../../common/content-card/contentCard'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import BarGraph from '../../../common/graph/bar-graph/BarGraph'

const styles = theme => ({
    cardDiv: {
        width: '100%',
        boxSizing: 'content-box',
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
        return (
            <ContentCard cardName='Test' classes={{ root: classes.customCard }}>
                <div className={classes.cardDiv}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Neznan</TableCell>
                                <TableCell>Neznan</TableCell>
                                <TableCell>Neznan</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow className={classes.table}>
                                <TableCell>10</TableCell>
                                <TableCell>1000</TableCell>
                                <TableCell>500</TableCell>
                            </TableRow>
                            <TableRow className={classes.table}>
                                <TableCell>10</TableCell>
                                <TableCell>1000</TableCell>
                                <TableCell>500</TableCell>
                            </TableRow>
                            <TableRow className={classes.table}>
                                <TableCell>10</TableCell>
                                <TableCell>1000</TableCell>
                                <TableCell>500</TableCell>
                            </TableRow>
                            <TableRow className={classes.table}>
                                <TableCell>10</TableCell>
                                <TableCell>1000</TableCell>
                                <TableCell>500</TableCell>
                            </TableRow>

                        </TableBody>

                    </Table>
                </div>
                <div className={classes.cardDiv}>
                    <BarGraph>

                    </BarGraph>
                </div>
            </ContentCard>
        )
    }

}

export default withStyles(styles)(GradesCard);



