import Base     from '../../Base.mjs';
import User     from '../../../model/User.mjs';


export default class Show extends Base {
    static validationRules = {
    }

    async execute({ id }) {
        try {
            if (!id) {
                const users = await User.findAllUsers();

                return { users }
            }

            const user = await User.findById(id);

            return { users: [user] };
        } catch(err) {
            throw Error(err);
        }
    }
}