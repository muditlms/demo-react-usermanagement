import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useAuth } from 'helpers/contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import USER_ROLES from 'helpers/const/USER_ROLES';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
}));

function ActionMenu() {
	const { logout } = useAuth();
	const history = useHistory()
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = () => {
		logout(() => {
			history.push('/')
		})
	}
	return (<div>
		<IconButton
			aria-label="account of current user"
			aria-controls="menu-appbar"
			aria-haspopup="true"
			onClick={handleMenu}
			color="inherit"
		>
			<AccountCircle />
		</IconButton>
		<Menu
			id="menu-appbar"
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={open}
			onClose={handleClose}
		>
			<MenuItem onClick={handleLogout}>Logout</MenuItem>
		</Menu>
	</div>)
}
export function UserAppBar() {
	const classes = useStyles();
	const { user } = useAuth();
	return (
		<div className={classes.root}>
			<AppBar position="static" >
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Welcome,  {user?.name}
					</Typography>
					<ActionMenu />
				</Toolbar>
			</AppBar>
		</div>
	);
}


function AdminAppBar({ onDrawerOpen, open }) {
	const classes = useStyles();
	return (<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
		<Toolbar className={classes.toolbar}>
			<IconButton
				edge="start"
				color="inherit"
				aria-label="open drawer"
				onClick={onDrawerOpen}
				className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
			>
				<MenuIcon />
			</IconButton>
			<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
				Admin
			</Typography>
			<ActionMenu />
		</Toolbar>
	</AppBar>)
}

export default function AppHeaderBar(props) {
	const { user } = useAuth();
	return user.role === USER_ROLES.admin ? <AdminAppBar {...props} /> : <UserAppBar {...props} />
}