import axios from 'axios';
import { getToken } from 'helpers/utils/auth-provider';
const client = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

const AUTH_TOKEN = getToken();
client.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default client;