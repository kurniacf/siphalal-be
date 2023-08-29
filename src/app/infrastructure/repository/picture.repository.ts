import { IPictureRepository } from "@app/core/repository/picture.repository.interface";
import { Inject, Injectable } from "@nestjs/common";
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
        let cld_upload_stream = cloudinary.uploader.upload_stream(
            {  folder: "foo" },
            function(error, result) {
                // console.log(error, result);
            });
        createReadStream(picture.data).pipe(cld_upload_stream);
        return;
    }

    findById(id: string): PictureModel
    {
        // let picture;
        // const imageMetadata = cloudinary.api.resource(id).then((result));
        // console.log(picture);
        // console.log(imageMetadata);
        // const picture = new PictureModel(imageMetadata, imageMetadata[1].secure_url, imageMetadata[1].created_at);
        // return picture;
        // return new PictureModel(null, null, null, null, null);

    }
    findByLink(link: string): PictureModel
    {
        // const imageData = await cloudinary.api.search()
        return null;
    }
}