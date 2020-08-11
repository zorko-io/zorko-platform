import Sequelize from 'sequelize';
import Exception from './Exception.mjs';


export default class Base extends Sequelize.Model {
    static init(sequelize, options) {
        super.init(this.schema, { sequelize, ...options })
    }

    static async findById(id) {
        const entity = await this.findOne({ where: { id } });

        if (!entity) {
            throw new Exception({
                message : `There is no ${this.name} with id = "${id}"`,
                field   : 'id'
            });
        }

        return entity;
    }

    static async findAllUsers() {
        const result = await this.findAll();

        if (!result) {
            throw new Exception({
                message: 'There is no users'
            })
        }

        return result;
    }

    static async create(user) {
        try {
            return await super.create(user);
        } catch (err) {
            throw err;
        }
    }
}