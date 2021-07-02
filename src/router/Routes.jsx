import USER_ROLES from 'helpers/const/USER_ROLES';
import React from 'react'
import {
	BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom'
import FullPageSpinner from '../components/FullPageSpinner';
import PrivateRoute from './PrivateRoute';

const Login = React.lazy(() =>
	import(/* webpackPrefetch: true */ '../modules/login'),
)
// const Dashboard = React.lazy(() =>
// 	import(/* webpackPrefetch: true */ '../modules/dashboard'),
// )
const Profile = React.lazy(() =>
	import(/* webpackPrefetch: true */ '../modules/profile'),
)
const Admin = React.lazy(() =>
	import(/* webpackPrefetch: true */ '../modules/admin'),
)
function Routes() {
	return (
		<React.Suspense fallback={<FullPageSpinner />}>
			<Router>
				<Switch>
					<Route exact path="/login" component={Login} />
					<PrivateRoute role={USER_ROLES.admin} path="/dashboard" exact>
						<Admin />
					</PrivateRoute>
					<PrivateRoute exact path="/profile" >
						<Profile />
					</PrivateRoute>
					<Redirect from="/" to="/login" />
					<Route path="*" >
						<div>404 not found</div>
						{/* TODO: 404 Page to be added  */}
					</Route>

				</Switch>
			</Router>
		</React.Suspense>
	)
}

export default Routes



