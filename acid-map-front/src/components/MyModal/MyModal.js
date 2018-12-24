import React, { Component } from 'react';
import { Button, Modal, Typography, withStyles } from '@material-ui/core/';

const MyModal = (props) => {
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
							Longitud: {props.selection.coords.lon}
						</Typography>
					</div> :
					<div>Hello World!</div>
		);
	}

	return (
		<Modal
			open={props.open}
			onClose={props.onClose}>
			<div className={props.classes.modalDiv}>
				{renderLoader(props.loadingData, props.selection)}
				<Button onClick={props.onClose} variant="contained" color="primary">
					Open Modal
				</Button>
			</div>
		</Modal>
	);
};

const styles = theme => ({
	modalDiv: {
		top: '45%',
		left: '45%',
		transform: 'translate(-45%, -45%)',
		position: 'absolute',
		width: theme.spacing.unit * 100,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
	},
});

export default withStyles(styles)(MyModal);