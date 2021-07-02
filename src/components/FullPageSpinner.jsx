import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		width: '100vw',
		height: '100vh',
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

export default function FullPageSpinner() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	);
}