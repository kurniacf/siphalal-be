export class PictureModel {
    id: string;
    filePath?: string;
    imageLink?: string;
    data?: Buffer;
    createdAt: Date;
    updatedAt?: Date;

    constructor(id: string, imageLink: string, createdAt: Date, filePath?: string, data?: Buffer)
    {
        this.id = id;
        this.imageLink = imageLink;
        this.createdAt = createdAt;
        this.filePath = filePath;
        this.data = data;
    }

}