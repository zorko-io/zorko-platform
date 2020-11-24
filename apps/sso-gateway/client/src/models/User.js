export class CreateUser {
    constructor(props) {
        this.email = props.email;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.username = props.username;
        this.password = props.password;
    }

    get createData() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            username: this.username,
            credentials: [
                {
                    type: 'password',
                    value: this.password,
                    temporary: false,
                },
            ],
        };
    }
}
