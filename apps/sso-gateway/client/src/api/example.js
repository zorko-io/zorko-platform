import axios from 'axios';


export function infoRequest() {
    return axios.get('/info').then(res => res.data);
}
