import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core/';

import MaterialUiModal from 'components/MyModal/MaterialUiModal';

const propTypes = {
	children: PropTypes.element,
	closeButtonShow: PropTypes.bool,
	closeButtonText: PropTypes.string,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
};

const defaultProps = {
	children: <div>Hello Modal!</div>,
	closeButtonShow: true,
	closeButtonText: 'Cerrar'
};

const MyModal = (props) => {
	function renderButton(closeButtonShow) {
		return (
			closeButtonShow ? 
				<Button
					color="secondary"
					className={props.classes.button}
					onClick={props.onClose}
					variant="contained">
					{props.closeButtonText}
				</Button> :
				null
		);
	}

	return (
		<MaterialUiModal
			onClose={props.onClose}
			open={props.open}>
			<Fragment>
				{props.children}
				{renderButton(props.closeButtonShow)}
			</Fragment>
		</MaterialUiModal>
	);
};

MyModal.propTypes = propTypes;
MyModal.defaultProps = defaultProps;

const styles = theme => ({
	button: {
		float: 'right'
	}
});

export default withStyles(styles)(MyModal);