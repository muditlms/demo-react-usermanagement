import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 600,
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function Bio({ user }) {
	const classes = useStyles();
	return (
		<List className={classes.root}>
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<ImageIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary="NAME : " secondary={user?.name} />
			</ListItem>
			<Divider variant="inset" component="li" />
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<WorkIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary="Role" secondary={user?.role} />
			</ListItem>
			<Divider variant="inset" component="li" />
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<BeachAccessIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary="EMAIL" secondary={user?.email} />
			</ListItem>

		</List>
	);
}