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
import FileDisplay from '../../common/file-display/FileDisplay'
import { List } from '@material-ui/core';


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

    defaultContent = <Content>
        < Row >
            <NotificationCard />
        </Row >
        <Row>
            <GradesCard />
        </Row>
    </Content>

    testDocument = <Content><FileDisplay src='https://docs.google.com/document/d/1SKC4V38DPn7OGQztxRRwzSr1WytqNm5_0QDafKekLbs/edit' /></Content>

    testPdf = <Content><FileDisplay src='https://www.rscautomobile.com/data/documents/cars/1511270057-naamloosdocument.pdf' /></Content>

    state = { open: true, fullscreen: false, content: this.defaultContent }

    expandContent = () => {
        this.setState({ fullscreen: !this.state.fullscreen })
    }

    showMenu = () => {
        this.setState({ open: !this.state.open })
    }

    changeContent = content => {
        this.setState({ content })
    }


    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>

                <UcenikAppBar onFullscreen={this.expandContent} onMenu={this.showMenu} />

                <Sidebar open={this.state.open}>
                    <ListFolder primary='Botun' classes={{ expanded: classes.folderExpanded }}>
                        <ListButton onClick={() => { this.changeContent(this.testPdf) }} tabbed={true} primary='PDF-file'></ListButton>
                        <ListButton onClick={() => { this.changeContent(this.testDocument) }} tabbed={true} primary='Document'></ListButton>
                    </ListFolder>
                    <ListFolder primary='Botun' classes={{ expanded: classes.folderExpanded }}></ListFolder>
                </Sidebar>
                {this.state.content}

            </div >
        );
    }
}
export default withStyles(styles)(Ucenik);
