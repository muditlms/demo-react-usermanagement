import Routes from './router/Routes';
import { AuthProvider } from 'helpers/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

const App = () => (
	<AuthProvider>
		<Routes />
		<Toaster />
	</AuthProvider>
);


export default App;
