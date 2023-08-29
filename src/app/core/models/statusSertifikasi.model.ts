export type StatusSertifikasType = {
    _id: string;
    currentStatus: string;
    timestamp: Date;
    description: string;
    nextAction: string;
    createdAt: Date;
    updatedAt: Date;
}

export class StatusSertifikasiModel implements StatusSertifikasType{
    _id: string;
    currentStatus: string;
    timestamp: Date;
    description: string;
    nextAction: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        currentStatus: string,
        description: string,
        nextAction: string
    ) {
        this.currentStatus = currentStatus;
        this.description = description;
        this.nextAction = nextAction;
        this.timestamp = new Date();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}