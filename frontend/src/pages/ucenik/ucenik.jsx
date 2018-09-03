import React, { Component } from 'react'
import { common } from '@material-ui/core/colors';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Sidebar from '../../common/sidebar/sidebar'
import ListButton from '../../common/list-button/listButton'
import ListFolder from '../../common/list-folder/listFolder'
import Content from '../../common/content/content'
import Row from '../../common/content/row/row'
import UcenikAppBar from './components/appbar'
import NotificationCard from './components/notificationCard'
import GradesCard from './components/gradesCard'


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
    })
}

class Ucenik extends Component {
    state = { open: null }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>

                <UcenikAppBar></UcenikAppBar>

                <Sidebar>
                    <ListFolder primary='Botun' classes={{ expanded: classes.folderExpanded }}></ListFolder>
                    <ListFolder primary='Botun' classes={{ expanded: classes.folderExpanded }}></ListFolder>
                </Sidebar>

                <Content>
                    <Row>
                        <NotificationCard />
                    </Row>
                    <Row>
                        <GradesCard />
                    </Row>
                </Content>
            </div >
        );
    }
}
export default withStyles(styles)(Ucenik);
