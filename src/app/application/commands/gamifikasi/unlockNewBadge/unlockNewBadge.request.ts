export type UnlockNewBadgeRequest = {
    user_id: string;
    badge_type: string;
    badge_tier: number;
    badge_description: string;
    visual_reference: string;
}