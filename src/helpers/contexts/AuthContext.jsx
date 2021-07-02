import React from 'react'
import * as auth from 'helpers/http/auth'
import { useAsync } from '../hooks/useAsync'
import ErrorFallback from 'components/ErrorFallback'
import FullPageSpinner from 'components/FullPageSpinner'
import { getToken, setToken, removeToken } from 'helpers/utils/auth-provider'
import { toast } from 'react-hot-toast';

async function bootstrapAppData() {
	let user = null
	const token = getToken()
	if (token) {
		const data = await auth.user(token);
		user = data
	}
	return user
}

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
	const {
		data: user,
		status,
		error,
		isLoading,
		isIdle,
		isError,
		isSuccess,
		run,
		setData,
	} = useAsync()
	React.useEffect(() => {
		const appDataPromise = bootstrapAppData()
		run(appDataPromise)
	}, [run])

	const login = React.useCallback((form) => {
		auth.login(form).then(res => {
			setToken(res.token)
			setData(res.user)
		}).catch(err => {
			toast.error(err.message)
		})
	}, [setData]);

	const logout = React.useCallback((cb) => {
		removeToken();
		setData(null);
		cb()
	}, [setData])

	const value = React.useMemo(
		() => ({ user, logout, login }),
		[login, user, logout],
	)

	if (isLoading || isIdle) {
		return <FullPageSpinner />
	}

	if (isError) {
		return <ErrorFallback error={error} />
	}

	if (isSuccess) {
		return <AuthContext.Provider value={value} {...props} />
	}

	throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
	const context = React.useContext(AuthContext)
	if (context === undefined) {
		throw new Error(`useAuth must be used within a AuthProvider`)
	}
	return context
}

export { AuthProvider, useAuth }
