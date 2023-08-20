import { dataUsers } from "./dataUsers.seed";
import { UserModelMongo } from "@app/infrastructure/schemas/user.schema";
import mongoose from "mongoose";
import { load } from 'ts-dotenv';

export const seed = async () => {
    const env = load({
        MONGO_URI: String,
    });
    mongoose.connect(env.MONGO_URI)
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log(err);
    });

    const inputUsers = dataUsers.map((user) => {
        return new UserModelMongo(user);
    });

    await UserModelMongo.insertMany(inputUsers);

    console.log('Data users inserted');

    mongoose.disconnect();
}

seed();
