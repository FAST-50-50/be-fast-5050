import { Organization } from './Organization';

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
    phone: string;
    phone_verified_at: string | null;
    role: string;
    created_at: string;
    updated_at: string;
    user_detail?: UserDetail;
    user_community?: UserCommunity;
    organization: Organization;
}
