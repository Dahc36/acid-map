import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const ReactGoogleMap = withScriptjs(withGoogleMap(props => {
	return (
		<GoogleMap
			defaultZoom={2}
			defaultCenter={{ lat: 0, lng: 0 }}
			options={{
				draggable: false,
				streetViewControl: false,
				zoomControl: false
			}}
			onClick={props.onClick}>
		</GoogleMap>
	);
}));

export default ReactGoogleMap;