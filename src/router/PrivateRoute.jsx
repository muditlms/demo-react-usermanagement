import USER_ROLES from 'helpers/const/USER_ROLES';
import { useAuth } from 'helpers/contexts/AuthContext';
import { Route, Redirect } from 'react-router-dom';

/**
 * this component handles route authentications 
 *
 * @param {*} { children, role=USER_ROLES.user, ...rest }
 * @return {*} 
 */
function PrivateRoute({ children, role=USER_ROLES.user, ...rest }) {
	const { user } = useAuth();
	return (
		<Route {...rest} render={({ location }) => {
			return user && user.role === role
				? children
				: <Redirect to={{
					pathname: '/login',
					state: { from: location }
				}}
				/>
		}} />
	)
}

export default PrivateRoute;