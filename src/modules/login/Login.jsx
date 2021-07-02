import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from 'helpers/contexts/AuthContext';
import USER_ROLES from 'helpers/const/USER_ROLES';
import { useHistory } from 'react-router-dom';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { validateEmail } from 'helpers/utils/validateEmail';
import Copyright from 'components/Copyright';


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const DEFAULT_STATE = {
	email: '',
	password: '',
}

export default function SignIn() {
	const { login, user } = useAuth();
	const history = useHistory();
	const [errors, setErrors] = React.useState({});

	React.useEffect(() => {
		if (!user) return
		if (user.role === USER_ROLES.user) {
			history.push('/profile')
		}
		if (user.role === USER_ROLES.admin) {
			history.push('/dashboard')
		}
	}, [history, user])

	const [formState, setFormState] = React.useState(DEFAULT_STATE);
	const [role, setRole] = React.useState(USER_ROLES.user);
	const classes = useStyles();
	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validationLogin(formState);
		if (validationErrors) {
			setErrors(validationErrors)
			return
		};
		login({ ...formState, role })
	}
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormState(prev => ({ ...prev, [name]: value }))
	}
	const handleRoleChange = (e) => {
		setRole(e.target.value);
	}
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<FormControl component="fieldset">
					<Box display="flex" alignItems="center">
						<FormLabel component="legend">Role</FormLabel>
						<RadioGroup aria-label="gender" name="gender1" value={role} onChange={handleRoleChange}>
							<Box display="flex" p={1}>
								<FormControlLabel value={USER_ROLES.user} control={<Radio />} label="User" />
								<FormControlLabel value={USER_ROLES.admin} control={<Radio />} label="Admin" />
							</Box>
						</RadioGroup>
					</Box>
				</FormControl>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={handleInputChange}
						value={formState.email}
						error={!!errors.email}
						helperText={errors.email}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleInputChange}
						value={formState.password}
						error={!!errors.password}
						helperText={errors.password}

					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>

					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}


function validationLogin(data) {
	const errors = {};
	if (!data.email) {
		errors.email = "Please enter email address."
	}
	if (data.email && !validateEmail(data.email)) {
		errors.email = "Invalid email address."
	}
	if (!data.password) {
		errors.password = "Please enter password."
	}
	return Object.values(errors).length > 0 ? errors : false;
}