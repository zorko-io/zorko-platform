export default class Exception extends Error {
    constructor(data) {
        super();

        this.code = data.code;
        this.message = data.message;
    }
}
