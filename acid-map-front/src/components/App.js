import React, { Component, Fragment } from 'react';
import { CssBaseline, Grid, Paper, Typography, withStyles } from '@material-ui/core/';
import axios from 'axios';

import MyGoogleMap from './MyGoogleMap';
import MyModalCountryData from './MyModal/MyModalCountryData';

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
		this.loadStuff(e);
	}

	loadStuff = async (e) => {
		const filterSearch = (data) => {
			for(const result of data.results){
				for(const addressComponent of result['address_components']) {
					if(addressComponent.types.indexOf('country') > -1) {
						return {
							long: addressComponent.long_name,
							short: addressComponent.short_name
						};
					}
				}
			}
			return null;
		}

		const countryResponse = await axios.get(
			'https://maps.googleapis.com/maps/api/geocode/json',
			{
				params: {
					key: 'AIzaSyDg_2zag9cVs0-EsOE3KLj6fKFu67uohHc',
					latlng: `${e.latLng.lat()},${e.latLng.lng()}`
				}
			});
		const country = filterSearch(countryResponse.data);

		const capitalResponse = await axios.get(`https://restcountries.eu/rest/v2/alpha/${country.short}`);
		const capital = capitalResponse.data.capital;

		const capitalCoordsResponse = await axios.get(
			'https://maps.googleapis.com/maps/api/geocode/json',
			{
				params: {
					address: capital,
					components: `country:${country.short}`,
					key: 'AIzaSyDg_2zag9cVs0-EsOE3KLj6fKFu67uohHc'
				}
			}
		);
		const capitalCoords = capitalCoordsResponse.data.results[0].geometry.location;

		this.setState({
			selection: {
				country: country.long,
				capital,
				coords: capitalCoords
			},
			loadingData: false
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