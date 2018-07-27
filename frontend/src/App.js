import React, { Component } from 'react';
import './App.css';
import { common } from '@material-ui/core/colors';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Sidebar from './common/sidebar/sidebar.jsx'
import ListButton from './common/list-button/listButton'
import Appbar from './common/appbar/appbar'
import UserHeader from './common/sidebar/user-header/userHeader'
import AirplanemodeActive from '@material-ui/icons/AirplanemodeActive'
import purple from '@material-ui/core/colors/purple';
import Content from './common/content/content'
import Row from './common/content/row/row'
import ContentCard from './common/content-card/contentCard'
import Harmonica from './common/harmonica/harmonica'
import HarmonicaTab from './common/harmonica/harmonica-tab/harmonicaTab'


const theme = createMuiTheme({
	palette: {
		primary: { main: purple[500] }, // Purple and green play nicely together.
		secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
	},
});

const styles = theme => ({
	root: {
		backgroundColor: '#eeeeee',
		width: '100%',
		height: '100vh',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
	}
})

class App extends Component {
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
			<div className={classes.root}>
				<MuiThemeProvider theme={theme}>
					<Appbar></Appbar>

					<Sidebar>
						<UserHeader avatarLetter='U' username='Mirko' status='ucenik'></UserHeader>
						<ListButton primary='Botun'></ListButton>
					</Sidebar>

					<Content>
						<Row>
							<ContentCard cardName='Kartica'>
							</ContentCard>
						</Row>
						<Row>
							<ContentCard cardName='Kartica Dva'>
								<Harmonica >
									<HarmonicaTab
										heading='Notifikacija'
										subheading='Profesor dodao novi test test3'
										bodyText='Neki nasumican tekst'
										onClick={this.expandTab('panel1')}
										expanded={this.state.open == 'panel1'} >
									</HarmonicaTab>
									<HarmonicaTab
										heading='Notifikacija'
										subheading='Profesor dodao novi test test3'
										bodyText='Neki nasumican tekst'
										onClick={this.expandTab('panel1')}
										expanded={this.state.open == 'panel1'} >
									</HarmonicaTab>
								</Harmonica>
							</ContentCard>
							<ContentCard cardName='Test'></ContentCard>
						</Row>
						<Row>
							<ContentCard cardName='Kartica'>
							</ContentCard>
						</Row>
					</Content>
				</MuiThemeProvider>
			</div>
		);
	}
}
export default withStyles(styles)(App);
