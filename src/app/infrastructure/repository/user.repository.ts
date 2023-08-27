import { IUserRepository } from "@app/core/repository/user.repository.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { User } from "../schemas/user.schema";
import { UserModel } from "@app/core/models/user.model";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectModel(User.name) 
        private readonly userSchema: any,
    ) {}

    async save(user: UserModel): Promise<{userSaved: any}> {
        const createdUser = new this.userSchema(user);
        const userSaved = createdUser.save();
        return userSaved || {};
    }

    async findByEmail(email: string): Promise<any> {
        return this.userSchema.findOne({email: email});
    }

    async findById(id: string): Promise<UserModel> {
        return this.userSchema.findById(id);
    }

    async insertMany(dataUsers: any[]): Promise<any> {
        return this.userSchema.insertMany(dataUsers);
    }
}