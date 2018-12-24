import React, { Component } from 'react';
import { Button, Modal, Typography, withStyles } from '@material-ui/core/';

class MyModal extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Modal
				open={this.props.open}
				onClose={this.props.onClose}>
				<div className={classes.modalDiv}>
					<Typography variant="h6" id="modal-title">
						Text in a modal
					</Typography>
					<Typography variant="subtitle1" id="simple-modal-description">
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
					<Button onClick={this.props.onClose} variant="contained" color="primary">
						Open Modal
					</Button>
				</div>
			</Modal>
		);
	}
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