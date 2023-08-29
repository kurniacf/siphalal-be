export class PictureModel {
    id: string;
    filePath?: string;
    imageLink?: string;
    data: Buffer;
    createdAt: Date;
    updatedAt?: Date;

    constructor(id: string, imageLink: string, data: Buffer, createdAt: Date, filePath?: string)
    {
        this.id = id;
        this.imageLink = imageLink;
        this.createdAt = createdAt;
        this.data = data;  
        this.filePath = filePath;
    }

}