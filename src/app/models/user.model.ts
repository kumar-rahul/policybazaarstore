export class User {
    // public users: Userlist[] = new Array<Userlist>();
    public username: string;
    public email: string;
    public password: string;

    public updateFrom(src: User) {
        this.username = src.username;
        this.email = src.email;
        this.password = src.password;
    }
}
