import { Document, Model } from 'mongoose';
export interface User extends Document {
    fullname: {
        firstname: string;
        lastname: string;
    };
    email: string;
    password: string;
    socketId: string;
    generateAuthToken: () => string;
    comparePassword: (password: string) => Promise<boolean>;
}
export interface UserModelType extends Model<User> {
    hashPassword(password: string): Promise<string>;
}
declare const UserModel: UserModelType;
export default UserModel;
//# sourceMappingURL=user.model.d.ts.map