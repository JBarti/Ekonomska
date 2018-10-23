import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ContentCard from '../../../common/content-card/contentCard'
import Harmonica from '../../../common/harmonica/harmonica'
import HarmonicaTab from '../../../common/harmonica/harmonica-tab/harmonicaTab'

const styles = theme => ({
    root: {
        overflow: 'hidden',
    }
})


class NotifiactionCard extends Component {

    state = { open: null }

    expandTab = panel => (event, expanded) => {
        console.log(panel)
        if (panel === this.state.open) {
            this.setState({ open: null })
        }
        else {
            this.setState({ open: panel })
        }
    }

    genHarmonicaTab = (notification, id) => {
        return < HarmonicaTab
            type={notification.important ? 'warning' : 'message'}
            heading={notification.from}
            subheading={notification.description}
            bodyText={notification.text}
            onClick={this.expandTab(id)}
            expanded={this.state.open == id} >
        </HarmonicaTab >
    }


    render() {
        const { classes } = this.props
        const { notifications } = this.props
        console.log({ notifications })
        return (
            <ContentCard cardName='Obavijesti' className={classes.root}>
                <Harmonica >
                    {notifications.map((notif, index) => {
                        return this.genHarmonicaTab(notif, index)
                    })}
                </Harmonica>
            </ContentCard>
        )
    }

}

export default withStyles(styles)(NotifiactionCard);

