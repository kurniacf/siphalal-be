import { PreconditionFailedException } from "@nestjs/common"
export type UserGamificationType = {
    currentXp: number;
    currentRank: number;
    maxExpRank: number;
    rankName: string;
    totalCoints: number;
    assignedUmkmCount: number;
    availabilityStatus:  number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class UserGamificationModel implements UserGamificationType {
    
        currentXp: number;
        currentRank: number;
        maxExpRank: number;
        rankName: string;
        totalCoints: number;
        assignedUmkmCount: number;
        availabilityStatus:  number;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    
        constructor(currentXp: number, currentRank: number, maxExpRank: number, rankName: string, totalCoints: number, assignedUmkmCount: number, availabilityStatus: number, createdAt?:Date, updatedAt?:Date) {
            this.currentXp = currentXp;
            this.currentRank = currentRank;
            this.maxExpRank = maxExpRank;
            this.rankName = rankName;
            this.totalCoints = totalCoints;
            this.assignedUmkmCount = assignedUmkmCount;
            this.availabilityStatus = availabilityStatus;
            this.createdAt = createdAt || new Date();
            this.updatedAt = updatedAt || new Date();
        }
    
        getCurrentXp() {
            return this.currentXp;
        }
    
        getCurrentRank() {
            return this.currentRank;
        }
    
        getMaxExpRank() {
            return this.maxExpRank;
        }
    
        getRankName() {
            return this.rankName;
        }
    
        getTotalCoints() {
            return this.totalCoints;
        }
    
        getAssignedUmkmCount() {
            return this.assignedUmkmCount;
        }
    
        getAvailabilityStatus() {
            return this.availabilityStatus;
        }

        addCurrentXP(xp: number) {
            if(xp <= 0)
                throw new PreconditionFailedException('Index out of bounds, XP must be a positive number.');
            this.currentXp = this.currentXp + xp;
        }
}