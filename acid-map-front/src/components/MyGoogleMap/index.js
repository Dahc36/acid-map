import React from 'react';
import PropTypes from 'prop-types';

import ReactGoogleMap from './ReactGoogleMap';

const propTypes = {
	defaultCenter: PropTypes.object.isRequired,
	defaultZoom: PropTypes.number.isRequired,
	loadingElement: PropTypes.element,
	onClick: PropTypes.func.isRequired,
	options: PropTypes.object
};

const defaultProps = {
	loadingElement: <div style={{ height: `100%` }}>Loading...</div>,
	options: {}
};

const MyGoogleMap = (props) => {
	return <ReactGoogleMap
		containerElement={<div style={{ height: `80vh` }} />}
		defaultCenter={props.defaultCenter}
		defaultZoom={props.defaultZoom}
		googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDg_2zag9cVs0-EsOE3KLj6fKFu67uohHc&v=3.exp&language=en"
		loadingElement={props.loadingElement}
		mapElement={<div style={{ height: `100%` }} />}
		onClick={props.onClick}
		options={props.options} />
};

ReactGoogleMap.propTypes = propTypes;
ReactGoogleMap.defaultProps = defaultProps;

export default MyGoogleMap;