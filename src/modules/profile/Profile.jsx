import React from "react";
import { Grid, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Bio from './Bio'
import AppHeader from 'components/AppHeader'
import Container from '@material-ui/core/Container';
import { useAuth } from "helpers/contexts/AuthContext";

const useStyles = makeStyles({
	card: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});


export default function Profile() {
	const { user } = useAuth();
	const classes = useStyles();
	return (<>
		<AppHeader />
		<Container maxWidth="sm">
			<Bio user={user} />
			<Grid item xs={12}  >
				<Box fontWeight="fontWeightLight" m={2} >
					<Typography variant="h5" color="primary" component="p" >
						WORKING EXPERIENCES
					</Typography>
				</Box>

				<Box fontWeight="fontWeightLight" m={2} >
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="h5" component="h2">
								{user.company}
							</Typography>
							<Typography className={classes.pos} color="textSecondary">
								Company
							</Typography>
							<Typography variant="body2" component="p">
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat eum tempore similique repudiandae itaque rem perspiciatis eius ex dicta veniam id dignissimos cupiditate, blanditiis, eos, consectetur fugit unde dolorum? Nemo.
							</Typography>
						</CardContent>
					</Card>
				</Box>
			</Grid>
		</Container>
	</>
	)
};
