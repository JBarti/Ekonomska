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
            <ContentCard cardName='Obavijesti' className={classes.root}>
                <Harmonica >
                    <HarmonicaTab
                        type='warning'
                        heading='Notifikacija'
                        subheading='Profesor dodao novi test test3'
                        bodyText='Neki nasumican tekst'
                        onClick={this.expandTab('panel1')}
                        expanded={this.state.open == 'panel1'} >
                    </HarmonicaTab>
                    <HarmonicaTab
                        type='message'
                        heading='Notifikacija'
                        subheading='Profesor dodao novi test test3'
                        bodyText='Neki nasumican tekst'
                        onClick={this.expandTab('panel2')}
                        expanded={this.state.open == 'panel2'} >
                    </HarmonicaTab>
                </Harmonica>
            </ContentCard>
        )
    }

}

export default withStyles(styles)(NotifiactionCard);

