import * as api from '../api';
import { CreateUser } from '../models/User';


export const userCreate = (data) => {
    const user = new CreateUser(data);
    return api.createUser(user.createData).then((url) => {
        const userId = url.substring(url.lastIndexOf('/') + 1);
        return api.getUserById(userId);
    });
};

export const userDelete = (id) => api.deleteUser(id);
