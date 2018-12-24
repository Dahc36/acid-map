import React, { Component, Fragment } from 'react';
import { CssBaseline, Grid, Paper, Typography, withStyles } from '@material-ui/core/';
import axios from 'axios';

import MyGoogleMap from './MyGoogleMap';
import MyModal from './MyModal';

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
// console.log(country);
		const capitalResponse = await axios.get(`https://restcountries.eu/rest/v2/alpha/${country.short}`);
		const capital = capitalResponse.data.capital;
// console.log(capital);
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
// console.log(capitalCoords);
		this.setState({
			selection: {
				country: country.long,
				capital,
				coords: capitalCoords
			},
			loadingData: false
		});
		console.log('Done');
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
							<MyGoogleMap onClick={this.onClickMap}/>
						</Paper>
					</Grid>
				</Grid>

				<MyModal open={this.state.showModal} onClose={this.onCloseModal} loadingData={this.state.loadingData} selection={this.state.selection}/>
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