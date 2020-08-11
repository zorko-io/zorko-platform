import * as UUID    from 'uuid';
import Base         from '../../Base.mjs';
import User         from '../../../model/User.mjs';
import Exception    from '../../../model/Exception.mjs';


export default class Create extends Base {
    static validationRules = {
        firstName: ['required'],
        lastName: ['required'],
        status: {one_of: ['ACTIVE', 'BLOCKED', 'PENDING']},
        email: ['required', 'email'],
        role: ['required'],
        password: ['required']
    }

    async execute(params) {
        try {
            const userExist = await User.findOne({ where: { email: params.email } });
            if (userExist) {
                throw new Exception({
                    code: 'VALIDATION_ERROR',
                    message: 'Users with this email already exist'
                });
            }

            const id = UUID.v4();
            const now = new Date();
            const password = User.hashPassword(params.password);

            await User.create({
                ...params,
                id,
                password,
                createdAt: now,
                updatedAt: now,
            });

            const user = await User.findById(id);

            return { users: [user] };
        } catch (err) {
            console.error(err);
            throw Error(err);
        }
    }
}
