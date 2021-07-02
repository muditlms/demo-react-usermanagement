import React from 'react';
import { toast } from 'react-hot-toast';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Title from 'components/Title';
import UserFormModal from './UserFormModal';
import { deleteUser, getUsers } from 'helpers/http/users';


const useStyles = makeStyles(theme => ({
	table: {
		minWidth: 650,
	},
	margin: {
		margin: theme.spacing(1),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	button: {
		margin: theme.spacing(1),
	},
	name: {
		display: 'flex',
		alignItems: 'center',
	},
	avatar: {
		marginRight: theme.spacing(1),
	}
}));


export default function ManageUser() {
	const classes = useStyles();
	const [data, setData] = React.useState(null)
	const [open, setOpen] = React.useState(false);
	const [selectedUser, setSelectedUser] = React.useState(null)
	const fetchUsers = React.useCallback(async () => {
		const users = await getUsers();
		setData(users)
	}, [])

	React.useEffect(() => {
		fetchUsers()
	}, [fetchUsers])

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleEdit = (user) => () => {
		setSelectedUser(user);
		handleClickOpen()
	}
	const handleDelete = (user) => () => {
		// axios.delete(`http://localhost:4000/users/${user.id}`)
		deleteUser(user.id).then((res) => {
			if (res) {
				toast.success("User deleted.")
				fetchUsers()
			}
		})
	}
	const handleClose = () => {
		setSelectedUser(null);
		setOpen(false);
	};
	return (<>
		<Box display="flex" justifyContent="space-between">

			<Title>Manage Users</Title>
			<Button
				variant="contained"
				color="primary"
				size="large"
				className={classes.button}
				startIcon={<AddIcon />}
				onClick={handleClickOpen}
			>
				Add user
			</Button>
		</Box>
		<TableContainer component={Paper}>
			<Table className={classes.table} >
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Company name</TableCell>
						<TableCell>Role</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data?.map(user => (
						<TableRow key={user.id}>
							<TableCell component="th" scope="row">
								<div className={classes.name}>
									<Avatar className={classes.avatar}>
										{user.name[0]}
									</Avatar>
									<Typography variant="subtitle2" gutterBottom>
										{user.name}
									</Typography>

								</div>
							</TableCell>
							<TableCell>{user.company}</TableCell>
							<TableCell>user</TableCell>
							<TableCell>
								{user.isActive ?
									<Chip color="primary" size="small" label="active" /> :
									<Chip color="secondary" size="small" label="inactive" />}
							</TableCell>
							<TableCell>
								<IconButton aria-label="delete" className={classes.margin} onClick={handleDelete(user)}>
									<DeleteIcon color="action" />
								</IconButton>
								<IconButton aria-label="delete" className={classes.margin} onClick={handleEdit(user)} >
									<EditIcon color="action" />
								</IconButton>
							</TableCell>
						</TableRow>
					))}

				</TableBody>
			</Table>
		</TableContainer>
		<UserFormModal key={selectedUser?.id || 'create'} open={open} handleClose={handleClose} data={selectedUser} refetch={fetchUsers} />
	</>
	);
}