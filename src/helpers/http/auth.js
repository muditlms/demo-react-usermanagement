import client from "./client";
import USER_ROLES from "helpers/const/USER_ROLES";

/**
 * mock login api 
 *
 * @param {*} { email, password, role }
 * @return {*} 
 */
export const login = ({ email, password, role }) => {

	return new Promise(async (resolve, reject) => {
		if (role === USER_ROLES.admin) {
			if (email === process.env.REACT_APP_ADMIN_EMAIL && password === process.env.REACT_APP_ADMIN_PASSWORD) {
				const user = { email, password, role, timestamp: Date.now() }
				const token = btoa(JSON.stringify(user))
				resolve({ user, token })
			} else {
				reject({ message: "Invalid email and password" })
			}
			return;
		}
		if (password !== process.env.REACT_APP_USER_PASSWORD) {
			reject({ message: 'Invalid password' });
			return;
		}
		const users = await client.get('/users').catch(err => {
			reject({ message: 'Internal server error. ' });
		});
		const user = users?.data.find(u => u.email === email);
		if (!user) {
			reject({ message: 'User not found' });
			return;
		}
		const token = btoa(JSON.stringify(user));
		resolve({ user, token })
	})
}

 /**
 *	Mock api for user
 * 
 * @param {*} token
 * @return {*} 
 */
export const user = (token) => {

	return new Promise(async (resolve, reject) => {
		if (!token) {
			reject({ message: 'Invalid token' });
			return;
		}
		try {
			const user = atob(token);
			resolve(JSON.parse(user));
		} catch (err) {
			reject({ message: 'Invalid token' });
		}
	})
}


