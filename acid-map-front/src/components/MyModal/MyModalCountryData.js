import React from 'react';
import PropTypes from 'prop-types';
import { Typography, CircularProgress, Icon } from '@material-ui/core/';

import MyModal from 'components/MyModal';

const propTypes = {
	loadingData: PropTypes.bool.isRequired,
	loadingError: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selection: PropTypes.object
};

const defaultProps = {
	selection: null
};

const MyModalCountryData = (props) => {
	const renderLoader = ({ loadingData, loadingError, selection }) => {
		return (
			loadingData ?
				<div>
					<CircularProgress style={{ display: 'block', margin: '1.35rem auto', height: '60px', width: '60px' }} />
					<Typography variant="h5" gutterBottom>Cargando información del país</Typography>
				</div> :
				loadingError ?
					<div>
						<Icon style={{ display: 'block', margin: '1.35rem auto', fontSize: '5rem' }} color="error">error_outline</Icon>
						<Typography variant="h6" gutterBottom>
							No se encontraron resultados
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							Asegurate de hacer click dentro de un país
						</Typography>
					</div> :
					selection ?
						<div>
							<Typography variant="h2" id="modal-title">
								{props.selection.country}
							</Typography>
							<Typography variant="h5" id="simple-modal-description">
								Capital: {props.selection.capital}
							</Typography>
							<Typography variant="subtitle1" id="simple-modal-description">
								Coordinates: {`${props.selection.coords.lat}°N, ${props.selection.coords.lng}°E`}
							</Typography>
						</div> :
						null
		);
	}

	return (
		<MyModal
			onClose={props.onClose}
			open={props.open}>
			<div style={{
				height: '50vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				{renderLoader(props)}
			</div>
		</MyModal>
	);
};

MyModalCountryData.propTypes = propTypes;
MyModalCountryData.defaultProps = defaultProps;

export default MyModalCountryData;