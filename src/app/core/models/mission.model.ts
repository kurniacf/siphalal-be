export type MissionType = {
    description: string;
    status: string;
    assignedDate: Date;
    completedDate: Date;
    deadline : Date;
    createdAt: Date;
    updatedAt: Date;
}

export class MissionModel implements MissionType {
    description: string;
    status: string;
    assignedDate: Date;
    completedDate: Date;
    deadline : Date;
    createdAt: Date;
    updatedAt: Date;

    constructor(description: string, status: string, assignedDate: Date, completedDate: Date, deadline: Date, createdAt?:Date, updatedAt?:Date) {
        this.description = description;
        this.status = status;
        this.assignedDate = assignedDate;
        this.completedDate = completedDate;
        this.deadline = deadline;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
    
    getDescription() {
        return this.description;
    }

    getStatus() {
        return this.status;
    }

    getAssignedDate() {
        return this.assignedDate;
    }

    getCompletedDate() {
        return this.completedDate;
    }

    getDeadline() {
        return this.deadline;
    }

    getCreatedAt() {
        this.createdAt;
    }

    getUpdatedAt() {
        this.updatedAt;
    }
}