import axios from 'axios';
import { keycloakAdminUrl } from '../keycloak';


export function getUsers() {
    return axios.get(`${keycloakAdminUrl}/users`).then((res) => res.data);
}

export function getUserById(id) {
    return axios.get(`${keycloakAdminUrl}/users/${id}`).then((res) => res.data);
}

export function getUsersCount() {
    return axios.get(`${keycloakAdminUrl}/users/count`).then((res) => res.data);
}

export function createUser(user) {
    return axios.post(`${keycloakAdminUrl}/users`, user).then((res) => res.headers.location);
}

export function updateUser(user) {
    return axios.put(`${keycloakAdminUrl}/users/${user.id}`, user).then((res) => res.data);
}

export function deleteUser(id) {
    return axios.delete(`${keycloakAdminUrl}/users/${id}`).then((res) => res.data);
}
