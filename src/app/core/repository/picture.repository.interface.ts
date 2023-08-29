import { PictureModel } from "../models/picture.model";

export interface IPictureRepository {
    save(picture: PictureModel): null;
    findById(id: string): PictureModel;
    findByLink(link: string): PictureModel;
}