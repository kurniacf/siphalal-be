import { IPictureRepository } from "@app/core/repository/picture.repository.interface";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PictureModel } from "@app/core/models/picture.model";
import { v2 as cloudinary } from 'cloudinary';
import { createReadStream } from "streamifier";

@Injectable()
export class PictureRepository implements IPictureRepository {
    constructor(
    ){cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_KEY,
        api_secret: process.env.CLOUD_SECRET
    });}

    save(picture: PictureModel): null
    {
        let cld_upload_stream = cloudinary.uploader.upload_stream({  folder: picture.filePath });
        createReadStream(picture.data).pipe(cld_upload_stream);
        return;
    }

    async findById(id : string): Promise<PictureModel>
    {
        try{
            const imageMetadata = await cloudinary.api.resource(id);
            return new PictureModel(imageMetadata.asset_id, imageMetadata.secure_url, imageMetadata.created_at, imageMetadata.folder);
        }
        catch{
            throw new NotFoundException('Image not found');
        }
    }
    async findByLink(link: string): Promise<PictureModel>
    {
        return null;
    }
}