export interface UserDetail {
    benefit: string;
    birth_year: string;
    created_at: string;
    fullname: string;
    game_types: string[];
    id: number;
    ig: string;
    nickname: string;
    photo: string;
    skills: string[];
    suggestion: string;
    telu_relation: string[];
    updated_at: string;
    user_id: number;
    wa: string;
    phone_number?: string;
    instagram?: string;
    favorite_position?: string;
    total_matches?: number;
    join_date?: string;
    experience_level?: string;
}

export interface UserCommunity {
    id: number;
    user_id: number;
    community_id: number;
    joined_since: string;
    total_matches: number;
    preferred_positions: string[];
    favorite_position: string;
    least_favorite_position: string[];
    game_types: string[];
    favorite_team: string;
    experience_level: string;
    owned_jerseys: string[];
    photo: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    phone: string;
    phone_verified_at: string | null;
    created_at: string;
    updated_at: string;
    user_detail?: UserDetail;
    user_community?: UserCommunity[];
    organization?: {
        id: number;
        name: string;
    };
    communities?: {
        id: number;
        name: string;
    }[];
}
