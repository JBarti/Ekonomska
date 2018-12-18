import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Sidebar from '../../common/sidebar/sidebar'
import ListButton from '../../common/list-button/listButton'
import ListFolder from '../../common/list-folder/listFolder'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Content from '../../common/content/content'
import Row from '../../common/content/row/row'
import UcenikAppBar from './components/appbar'
import NotificationCard from './components/notificationCard'
import GradesCard from './components/gradesCard'
import Slide from '@material-ui/core/Slide'
import WalletCard from './components/walletCard'
import LekcijaCard from './components/lekcijaCard'
import { Typography } from '@material-ui/core';
import Dashboard from './components/dashboard';
import External from './components/external'
import Forms from './components/forms'


const styles = theme => {
    console.log(theme)
    return ({
        sidebarNav: {
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap'

        },
        sidebarHeading: {
            paddingLeft: 16
        },
        content: {
            height: '100%'
        },

    })
}

const defaultContent = <div style={{ height: 'calc(100% - 65px)' }}>
    <Row>
       <LekcijaCard/>
    </Row>
    <Row>
        <GradesCard />
    </Row>
    < Row >
        <NotificationCard />
        <WalletCard />
    </Row >
</div>


class Ucenik extends Component {

    screens = [

        {
            name: 'Home',
            component: <Dashboard />

        },
        {
            name: 'RandomPdf',
            component: <External url='https://www.rscautomobile.com/data/documents/cars/1511270057-naamloosdocument.pdf' />

        },
        {
            name: 'RandomDocs',
            component: <External url='https://www.rscautomobile.com/data/documents/cars/1511270057-naamloosdocument.pdf' />

        }
    ]

    state = {
        fullscreen: false, expanded: false, currentPage: 'Home', animate: true, content: this.screens[0].component
    }


    expandContent = () => {
        this.setState({ fullscreen: !this.state.fullscreen })
    }

    showMenu = () => {
        this.setState({
            open: !this.state.open,
            expanded: !this.state.expanded
        })
    }

    changeContent = content => {
        this.setState({ animate: false })
        setTimeout(
            () => { this.setState({ animate: true, currentPage: content.name, content: content.component }) },
            300
        )


    }

    render() {
        const { classes } = this.props

        let sidebarAppbar = <div className={classes.sidebarNav}>
            <IconButton style={{ color: 'white' }} onClick={() => { this.changeContent(this.screens[0]) }}><ArrowBack /></IconButton>
            <Slide timeout={250} direction='down' in={this.state.animate}>
                <Typography className={classes.sidebarHeading} variant='subheading' style={{ color: 'white' }}>{this.state.currentPage}</Typography>
            </Slide>
        </div>

        return (
            <div>
                <UcenikAppBar expanded={this.state.expanded} onFullscreen={this.expandContent} onMenu={this.showMenu} />

                <Sidebar appbar={sidebarAppbar} open={!this.state.expanded}>
                    <ListFolder primary='Botun' classes={{ expanded: classes.folderExpanded }} className={classes.sidebarContent}>
                        {this.screens.slice(1).map(component => (
                            <ListButton onClick={() => { this.changeContent(component) }} tabbed={true} primary={component.name} />
                        ))}
                    </ListFolder>
                    <ListFolder primary='Botun' classes={{ expanded: classes.folderExpanded }}></ListFolder>
                </Sidebar>
                <Content expanded={this.state.expanded}>
                    {this.state.content}
                </Content>
            </div >
        );
    }
}
export default withStyles(styles)(Ucenik);
