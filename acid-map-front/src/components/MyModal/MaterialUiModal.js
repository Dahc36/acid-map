import React from 'react';
import PropTypes from 'prop-types';
import { Modal, withStyles } from '@material-ui/core/';

const propTypes = {
	children: PropTypes.element.isRequired,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
};

const MaterialUiModal = (props) => {
	return (
		<Modal
			onClose={props.onClose}
			open={props.open}>
			<div className={props.classes.modalDiv}>
				{props.children}
			</div>
		</Modal>
	);
};

MaterialUiModal.propTypes = propTypes;

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
	}
});

export default withStyles(styles)(MaterialUiModal);