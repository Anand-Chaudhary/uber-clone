import { User } from "../models/user.model";
interface CreateUser {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}
export declare const createUser: ({ firstname, lastname, email, password }: CreateUser) => Promise<User>;
export {};
//# sourceMappingURL=user.service.d.ts.map