import React, { Component, Fragment } from 'react';
import { CssBaseline, Grid, Paper, Typography, withStyles } from '@material-ui/core/';

import { loadCountryInfo } from 'api/maps';
import MyGoogleMap from 'components/MyGoogleMap';
import MyModalCountryData from 'components/MyModal/MyModalCountryData';

class App extends Component {
	state = {
		showModal: false,
		loadingData: false,
		selection: null
	};

	onOpenModal = () => {
		this.setState({ showModal: true });
	}

	onCloseModal = () => {
		this.setState({ showModal: false });
	}

	onClickMap = (e) => {
		this.setState({
			showModal: true,
			loadingData: true
		});
		loadCountryInfo(e.latLng.lat(), e.latLng.lng())
		.then(response => {
			this.setState({
				selection: {
					country: response.country,
					capital: response.capital,
					coords: response.coords
				},
				loadingData: false
			});
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<CssBaseline/>

				<Typography className={classes.title} variant="h2" gutterBottom>
					Acid Map
				</Typography>

				<Grid container className={classes.body}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<MyGoogleMap
								defaultZoom={2}
								defaultCenter={{ lat: 0, lng: 0 }}
								options={{
									draggable: false,
									streetViewControl: false,
									zoomControl: false
								}}
								onClick={this.onClickMap} />
						</Paper>
					</Grid>
				</Grid>

				<MyModalCountryData
					loadingData={this.state.loadingData}
					onClose={this.onCloseModal}
					open={this.state.showModal}
					selection={this.state.selection} />

			</Fragment>
		);
	}
};

const styles = theme => ({
	body: {
		padding: '0 3rem'
	},
	paper: {
		padding: '1.35rem'
	},
	title: {
		marginTop: '1.35rem',
		textAlign: 'center'
	}
});

export default withStyles(styles)(App);