import { LOCAL_STORAGE } from '../common/constants';


export function getHostName() {
    return localStorage.getItem(LOCAL_STORAGE.HOST);
}
