import bcrypt       from 'bcrypt';
import Sequelize    from 'sequelize';
import Base         from './Base.mjs';
import Exception    from './Exception.mjs';


const DT = Sequelize.DataTypes;
const saltRounds = 10;

export default class User extends Base {
    static schema = {
        id:         { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
        firstName:  { type: DT.STRING, defaultValue: '' },
        lastName:   { type: DT.STRING, defaultValue: '' },
        status:     { type: DT.ENUM('ACTIVE', 'BLOCKED', 'PENDING'), defaultValue: 'ACTIVE' },
        email:      { type: DT.STRING(126), allowNull: false, unique: true },
        createdAt:  { type: DT.DATE, defaultValue: new Date() },
        removedAt:  { type: DT.DATE, defaultValue: null },
        updatedAt:  { type: DT.DATE, defaultValue: new Date() },
        role:       { type: DT.STRING, defaultValue: '' },
        password:   { type: DT.STRING, defaultValue: '' },
    }

    static async findById(id) {
        return super.findById(id)
    }

    static async findByEmail(email) {

        const user = await this.findOne({ where: { email }});

        if (!user) {
            throw new Exception({
                code: 'VALIDATION_ERROR',
                message: 'User with this email not exist'
            })
        }
        return user;
    }

    static hashPassword(plainPassword) {
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(plainPassword, salt);
    }

    static checkPassword(plainPassword, hashedPassword) {
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }
}