import React, { Component, Fragment } from 'react';

import ReactGoogleMap from './ReactGoogleMap';

const MyGoogleMap = (props) => {
	return <ReactGoogleMap
		googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDg_2zag9cVs0-EsOE3KLj6fKFu67uohHc&v=3.exp&libraries=places"
		loadingElement={<div style={{ height: `100%` }} />}
		containerElement={<div style={{ height: `80vh` }} />}
		mapElement={<div style={{ height: `100%` }} />}
		onClick={props.onClick}/>
};

export default MyGoogleMap;