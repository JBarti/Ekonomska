import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Row from '../../../common/content/row/row'
import NotificationCard from './notificationCard'
import PropTypes from 'prop-types';
import NotesCard from './notesCard'
import StdlistCard from './stdlistCard'
import LekcijaCard from './lekcijaCard'
import DodajLekciju from './dodajLekciju'

const styles = theme => {
    ({
        fix: {
            maxHeight: '30%',
        },
    })
}


class Dashboard extends Component {
    render() {
        const { classes } = this.props;
        console.log("LOKACIJA")
        console.log(this.props.location)
        return (
            <div style={{ height: 'calc(100% - 65px)' }}>
                <Row classes={{root: classes.fix}}>
                    <LekcijaCard />
                    <LekcijaCard />
                    <LekcijaCard />
                    <LekcijaCard />
                    <LekcijaCard />
                    <DodajLekciju />
                </Row>
                < Row >
                    <StdlistCard/>
                </Row >
                <Row>
                    <NotificationCard/>
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


