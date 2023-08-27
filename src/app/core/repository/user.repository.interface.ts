import { UserModel } from '../models/user.model';

export interface IUserRepository {
    save(user: UserModel): Promise<any>;
    findByEmail(email: string): Promise<any>;
    findById(id: string): Promise<UserModel>;
    insertMany(dataUsers: any): Promise<any>;
}