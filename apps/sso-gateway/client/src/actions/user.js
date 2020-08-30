import * as api from '../api';
import { CreateUser } from '../models/User';


export const userCreate = (data) => {
    const user = new CreateUser(data);
    return api.createUser(user.createData);
};
