import React, { Component, Fragment } from 'react';
import { CssBaseline, Button, Grid, Paper, Typography, withStyles } from '@material-ui/core/';

// import MyGoogleMap from './MyGoogleMap';
import MyModal from './MyModal';

class App extends Component {
	state = {
		showModal: false
	};

	onOpenModal = () => {
		this.setState({ showModal: true });
	}

	onCloseModal = () => {
		this.setState({ showModal: false });
	}

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<CssBaseline/>
				<Typography className={classes.title} variant="h2" gutterBottom>
					Acid Map
				</Typography>
				<Grid container className={classes.body}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Button onClick={this.onOpenModal} variant="contained" color="primary">
								Open Modal
							</Button>
						</Paper>
					</Grid>
				</Grid>
				<MyModal open={this.state.showModal} onClose={this.onCloseModal}/>
			</Fragment>
		);
	}
};

const styles = theme => ({
	body: {
		padding: '0 3rem'
	},
	paper: {
		padding: '1.35rem'
	},
	title: {
		marginTop: '1.35rem',
		textAlign: 'center'
	}
});

export default withStyles(styles)(App);