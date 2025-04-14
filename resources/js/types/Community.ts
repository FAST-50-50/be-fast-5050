export interface Community {
    id: number;
    organization_id: number;
    sport_id: number;
    name: string;
    description: string;
    logo: string;
    contact: string;
    ig: string;
    created_at: string;
    updated_at: string;
    organization_name?: string;
    member_count?: number;
    organization?: {
        id: number;
        name: string;
    };
    sport?: {
        id: number;
        name: string;
    };
} 