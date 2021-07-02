import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import USER_ROLES from 'helpers/const/USER_ROLES';
import { createUser, editUser } from 'helpers/http/users';
import { validationUser } from 'helpers/validations/validateUser';

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
	"name": "",
	"email": "",
	"company": "",
	"isActive": false,
	"role": USER_ROLES.user
}
export default function UserFormModal({ open, handleClose, data, refetch }) {
	const classes = useStyles();
	const [formState, setFormState] = React.useState(data ? data : DEFAULT_STATE);
	const [errors, setErrors] = React.useState({})
	const isEditMode = Boolean(data?.id);
	const handleChange = e => {
		const { name, value } = e.target;
		setFormState(prev => ({ ...prev, [name]: value }))
	}
	const handleSubmit = () => {
		const validationErrors = validationUser(formState);
		if (validationErrors) {
			setErrors(validationErrors);
			return false;
		}
		createUser(formState).then((res) => {
			if (res.id) {
				setErrors({})
				handleClose();
				refetch()
			}
		})
	}
	const handleSave = () => {
		const validationErrors = validationUser(formState);
		if (validationErrors) {
			setErrors(validationErrors);
			return false;
		}
		editUser({ id: data.id, payload: formState }).then((res) => {
			if (res.id) {
				setErrors({})
				handleClose();
				refetch()
			}
		})
	}
	const handleStatusChange = (e) => {
		setFormState(prev => ({ ...prev, [e.target.name]: e.target.checked }));
	}
	return (
		<div>

			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add User</DialogTitle>
				<DialogContent>
					<form className={classes.form} noValidate>
						<TextField
							label="Name"
							style={{ margin: 8 }}
							placeholder="Name"
							fullWidth
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={handleChange}
							name="name"
							value={formState.name}
							error={Boolean(errors.name)}
							helperText={errors.name}
						/>
						<TextField
							label="Company Name"
							style={{ margin: 8 }}
							placeholder="Company"
							fullWidth
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
							name="company"
							onChange={handleChange}
							value={formState.company}
							error={Boolean(errors.company)}
							helperText={errors.company}
						/>
						<TextField
							label="Email"
							style={{ margin: 8 }}
							placeholder="Email"
							fullWidth
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
							name="email"
							onChange={handleChange}
							value={formState.email}
							error={Boolean(errors.email)}
							helperText={errors.email}
						/>
						<FormControlLabel
							control={
								<Switch
									checked={formState.isActive}
									onChange={handleStatusChange}
									name="isActive"
									color="primary"
								/>
							}
							label={formState.isActive ? "Active" : "Inactive"}
						/>

					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					{isEditMode ? <Button onClick={handleSave} color="primary">
						Save
					</Button> :
						<Button onClick={handleSubmit} color="primary">
							Add user
						</Button>}

				</DialogActions>
			</Dialog>
		</div>
	);
}