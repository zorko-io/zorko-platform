import axios from 'axios';
import { getHostName } from '../utils/browserUtils';
export * from './example';


export function setDefaults(user) {
    axios.defaults.headers.common['Authorization'] = user.token;
    axios.defaults.baseURL = getHostName();
}
