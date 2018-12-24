import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core/';

import MyModal from '../MyModal';

const propTypes = {
	loadingData: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selection: PropTypes.object
};

const defaultProps = {
	selection: null
};

const MyModalCountryData = (props) => {
	const renderLoader = (loadingData, selection) => {
		return (
			loadingData ?
				<div>Loading...</div> :
				selection ?
					<div>
						<Typography variant="h6" id="modal-title">
							{props.selection.country}
						</Typography>
						<Typography variant="subtitle1" id="simple-modal-description">
							Capital: {props.selection.capital}
							Latitud: {props.selection.coords.lat}
							Longitud: {props.selection.coords.lng}
						</Typography>
					</div> :
					<div>Hello World!</div>
		);
	}

	return (
		<MyModal
			onClose={props.onClose}
			open={props.open}>
			{renderLoader(props.loadingData, props.selection)}
		</MyModal>
	);
};

MyModalCountryData.propTypes = propTypes;
MyModalCountryData.defaultProps = defaultProps;

export default MyModalCountryData;