// pretend this is firebase, netlify, or auth0's code.
// you shouldn't have to implement something like this in your own app
const localStorageKey = '__auth_provider_token__'

function getToken() {
	// to retrieve the user's token.
	return window.localStorage.getItem(localStorageKey)
}
function setToken(token) {
	// to retrieve the user's token.
	return window.localStorage.setItem(localStorageKey, token)
}


async function removeToken() {
	window.localStorage.removeItem(localStorageKey)
}

// an auth provider wouldn't use your client, they'd have their own
// so that's why we're not just re-using the client
// const authURL = process.env.REACT_APP_AUTH_URL



export { getToken, removeToken, localStorageKey, setToken }
