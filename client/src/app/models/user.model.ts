export class User {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public name: string,
        public role: string,
        public active: boolean
    ) { }

    static getProps() {
        return Object.keys(new User(
            '',
            '',
            '',
            '',
            '',
            false
        ));
    }
}