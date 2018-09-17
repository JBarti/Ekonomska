import React, { Component } from 'react'
import { common } from '@material-ui/core/colors';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Sidebar from '../../common/sidebar/sidebar'
import ListButton from '../../common/list-button/listButton'
import ListFolder from '../../common/list-folder/listFolder'
import IconButton from '@material-ui/core/IconButton'
import Home from '@material-ui/icons/Home'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Content from '../../common/content/content'
import Row from '../../common/content/row/row'
import UcenikAppBar from './components/appbar'
import NotificationCard from './components/notificationCard'
import GradesCard from './components/gradesCard'
import FileDisplay from '../../common/file-display/FileDisplay'
import Slide from '@material-ui/core/Slide'
import WalletCard from './components/walletCard'
import Grow from '@material-ui/core/Grow'
import { List, Typography } from '@material-ui/core';
import sidebar from '../../common/sidebar/sidebar';


const styles = theme => {
    console.log(theme)
    return ({
        root: {
            backgroundColor: '#eeeeee',
            width: '100%',
            height: '100vh',
            zIndex: 1,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
        },
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
        }
    })
}

const defaultContent = <div style={{ height: 'calc(100% - 65px)' }}>
    <Row>
        <GradesCard/>
    </Row>
    < Row >
        <NotificationCard />
        <WalletCard/>
    </Row >
</div>

var screens = [
    {
        name: 'Home',
        data: defaultContent
    },
    {
        name: 'Pdf',
        data: <FileDisplay src='https://www.rscautomobile.com/data/documents/cars/1511270057-naamloosdocument.pdf' />
    },
    {
        name: 'Doc',
        data: <FileDisplay src='https://docs.google.com/document/d/1Gqn3bFo1qUqCNuGxYOPeeKmPW3Fiex0BvKT0bb4ZB8k/edit?usp=sharing' />
    }
]


class Ucenik extends Component {


    testDocument = <FileDisplay src='https://docs.google.com/document/d/1SKC4V38DPn7OGQztxRRwzSr1WytqNm5_0QDafKekLbs/' />

    testPdf = <FileDisplay src='https://www.rscautomobile.com/data/documents/cars/1511270057-naamloosdocument.pdf' />

    state = { fullscreen: false, content: screens[0].data, expanded: false, screens: screens, currentPage: 'Home', animate: true }

    expandContent = () => {
        this.setState({ fullscreen: !this.state.fullscreen })
    }

    showMenu = () => {
        this.setState({ open: !this.state.open })
        this.setState({ expanded: !this.state.expanded })
    }

    changeContent = component => {
        this.setState({ animate: false, content: component.data })
        setTimeout(
            () => { this.setState({ animate: true, currentPage: component.name, }) },
            300
        )

    }

    render() {
        const { classes } = this.props

        let sidebarAppbar = <div className={classes.sidebarNav}>
            <IconButton style={{ color: 'white' }} onClick={() => { this.changeContent(this.state.screens[0]) }}><ArrowBack /></IconButton>
            <Slide timeout={250} direction='down' in={this.state.animate}>
                <Typography className={classes.sidebarHeading} variant='subheading' style={{ color: 'white' }}>{this.state.currentPage}</Typography>
            </Slide>
        </div>

        return (
            <div className={classes.root}>
                <UcenikAppBar expanded={this.state.expanded} onFullscreen={this.expandContent} onMenu={this.showMenu} />

                <Sidebar appbar={sidebarAppbar} open={!this.state.expanded}>
                    <ListFolder primary='Botun' classes={{ expanded: classes.folderExpanded }}>
                        {this.state.screens.slice(1).map(component => (
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
