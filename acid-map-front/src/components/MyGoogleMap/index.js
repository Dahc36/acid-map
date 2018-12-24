import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core/';

import { GOOGLE_API_KEY, GOOGLE_URL_MAPS } from 'api/maps';
import ReactGoogleMap from 'components/MyGoogleMap/ReactGoogleMap';

const propTypes = {
	defaultCenter: PropTypes.object.isRequired,
	defaultZoom: PropTypes.number.isRequired,
	loadingElement: PropTypes.element,
	onClick: PropTypes.func.isRequired,
	options: PropTypes.object
};

const defaultProps = {
	loadingElement: (
		<div style={{ height: `80vh` }}>
			<div style={{
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<CircularProgress style={{ height: '60px', width: '60px' }} />
			</div>
		</div>
	),
	options: {}
};

const MyGoogleMap = (props) => {
	return <ReactGoogleMap
		containerElement={<div style={{ height: '80vh' }} />}
		defaultCenter={props.defaultCenter}
		defaultZoom={props.defaultZoom}
		googleMapURL={`${GOOGLE_URL_MAPS}?key=${GOOGLE_API_KEY}&v=3.exp&language=en`}
		loadingElement={props.loadingElement}
		mapElement={<div style={{ height: '100%' }} />}
		onClick={props.onClick}
		options={props.options} />
};

ReactGoogleMap.propTypes = propTypes;
ReactGoogleMap.defaultProps = defaultProps;

export default MyGoogleMap;