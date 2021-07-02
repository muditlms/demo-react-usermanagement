import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://usage.ai/">
				Usage.ai
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}
export default Copyright;