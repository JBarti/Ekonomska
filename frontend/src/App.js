import React, { Component } from 'react';
import './App.css';
import { common } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Sidebar from './common/Sidebar/sidebar.jsx'
import SidebarItem from './common/sidebar/item/item'
import Folder from './common/sidebar/folder/folder'
import Appbar from './common/appbar/appbar'


const styles = theme => ({
	root: {
		backgroundColor: '#eeeeee',
		width: '100vw',
		height: '100vh'
	}
})

class App extends Component {
	render() {
		const { classes } = this.props
		return (
			<div className={classes.root}>
				<Appbar>
				</Appbar>
				<Sidebar>
					<Folder primary='Ekspand' >
						<SidebarItem primary='Expandiran' tabbed={true} />
						<SidebarItem primary='Expandiran' tabbed={true} />
					</Folder>
					<SidebarItem primary='Inbox'></SidebarItem>
					<SidebarItem primary='Botun'></SidebarItem>
				</Sidebar>
			</div>
		);
	}
}

export default withStyles(styles)(App);
