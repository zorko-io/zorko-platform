import Base                 from '../../Base.mjs';
import User                 from '../../../model/User.mjs';
import Exception            from '../../../model/Exception.mjs';
import { generateToken }    from'../../../utils/jwtUtils.mjs';


export default class Create extends Base {
    static validationRules = {
        email: ['required', 'email'],
        password: ['required']
    }

    async execute(params) {
        try {
            const user = await User.findByEmail(params.email);

            if (!User.checkPassword(params.password, user.password)) {
                throw new Exception({
                    code: 'AUTHENTICATION_FAILED_ERROR',
                    message: 'Wrong password or email'
                })
            }

            return {
                access_token: generateToken(user)
            }
        } catch (err) {
            console.error(err);
            throw Error(err);
        }
    }
}