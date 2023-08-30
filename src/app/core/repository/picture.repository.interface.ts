import { PictureModel } from "../models/picture.model";

export interface IPictureRepository {
    save(picture: PictureModel): null;
    findById(id: string): Promise<PictureModel>;
    findByLink(link: string): Promise<PictureModel>;
}