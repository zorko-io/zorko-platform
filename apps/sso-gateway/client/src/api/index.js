import axios from 'axios';
import { getHostName } from '../utils/browserUtils';

export * from './example';
export * from './users';

export function setDefaults(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.baseURL = getHostName();
}
