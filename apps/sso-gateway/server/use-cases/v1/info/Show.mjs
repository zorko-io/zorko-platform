import Base     from '../../Base.mjs';


export default class Show extends Base {
    static validationRules = {
    }

    async execute({ id }) {
        try {
            return { info: 'Server Info' };
        } catch(err) {
            throw Error(err);
        }
    }
}
