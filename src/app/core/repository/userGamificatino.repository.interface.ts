import { UserGamificationModel } from "../models/userGamification.model";

export interface IUserGamificationRepository {
    save(userGamification: UserGamificationModel): Promise<any>;
    findById(userGamificationId: string): Promise<UserGamificationModel>;
    findByUserId(userId: string): Promise<UserGamificationModel>;
}