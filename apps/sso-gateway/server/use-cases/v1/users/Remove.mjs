import Base         from '../../Base.mjs';
import User         from '../../../model/User.mjs';
import Exception    from '../../../model/Exception.mjs';


export default class Remove extends Base {
    static validationRules = {
        id: ['required']
    }

    async execute({ id }) {
        try {
            const user = await User.findById(id);

            if (!user) {
                throw new Exception({
                    code: 'NOT_FOUND_ERROR',
                    message:  `User with id = ${id} not found`,
                })
            } else {
                user.destroy();
            }

            return { };
        } catch(err) {
            throw new Exception(err);
        }
    }
}