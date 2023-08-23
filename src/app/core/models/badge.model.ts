export type BadgeType = {
    badgeType: string;
    badgeTier: number;
    description: string;
    earnedDate: Date;
    visualReference: string;
    createdAt: Date;
    updatedAt: Date;
}

export class BadgeModel implements BadgeType {
    badgeType: string;
    badgeTier: number;
    description: string;
    earnedDate: Date;
    visualReference: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(badgeType: string, badgeTier: number, description: string, earnedDate: Date, visualReference: string, createdAt?:Date, updatedAt?:Date) {
        this.badgeType = badgeType;
        this.badgeTier = badgeTier;
        this.description = description;
        this.earnedDate = earnedDate;
        this.visualReference = visualReference;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
    
    getBadgeType() {
        return this.badgeType;
    }

    getBadgeTier() {
        return this.badgeTier;
    }

    getDescription() {
        return this.description;
    }

    getEarnedDate() {
        return this.earnedDate;
    }

    getVisualReference() {
        return this.visualReference;
    }

    getCreatedAt() {
        this.createdAt;
    }

    getUpdatedAt() {
        this.updatedAt;
    }
}