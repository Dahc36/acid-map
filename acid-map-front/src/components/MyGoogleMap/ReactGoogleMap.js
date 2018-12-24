import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

const propTypes = {
	defaultZoom: PropTypes.number.isRequired,
	defaultCenter: PropTypes.object.isRequired,
	options: PropTypes.object,
	onClick: PropTypes.func.isRequired
};

const defaultProps = {
	options: {},
};

const ReactGoogleMap = withScriptjs(withGoogleMap(props => {
	return (
		<GoogleMap
			defaultZoom={props.defaultZoom}
			defaultCenter={props.defaultCenter}
			options={props.options}
			onClick={props.onClick} />
	);
}));

ReactGoogleMap.propTypes = propTypes;
ReactGoogleMap.defaultProps = defaultProps;

export default ReactGoogleMap;