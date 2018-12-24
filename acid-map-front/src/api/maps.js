import axios from 'axios';

export const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const GOOGLE_URL_GEOCODE = 'https://maps.googleapis.com/maps/api/geocode/json';
export const GOOGLE_URL_MAPS = 'https://maps.googleapis.com/maps/api/js';
const REST_COUNTRIES_URL = 'https://restcountries.eu/rest/v2/alpha';

const axiosGoogleGeocode = axios.create({
	baseURL: GOOGLE_URL_GEOCODE,
	params: {
		key: GOOGLE_API_KEY
	}
});

export const loadCountryInfo = async (latitude, longitude) => {
	function filterCoordSearch(response) {
		for(const result of response.data.results){
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

	try {
		const countryResponse = await axiosGoogleGeocode.get(
			'',
			{
				params: {
					latlng: `${latitude},${longitude}`
				}
			});
		const country = filterCoordSearch(countryResponse);

		const capitalResponse = await axios.get(`${REST_COUNTRIES_URL}/${country.short}`);
		const capital = capitalResponse.data.capital;

		const capitalCoordsResponse = await axiosGoogleGeocode.get(
			'',
			{
				params: {
					address: capital,
					components: `country:${country.short}`
				}
			}
		);
		const capitalCoords = capitalCoordsResponse.data.results[0].geometry.location;

		return {
			country: country.long,
			capital,
			coords: capitalCoords
		};
	} catch(error) {
		throw error;
	}
}