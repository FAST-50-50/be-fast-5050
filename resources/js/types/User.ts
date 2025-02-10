export interface UserDetail {
    benefit: string;
    birth_year: string;
    created_at: string;
    experience_level: string;
    favorite_position: string;
    favorite_team: string;
    fullname: string;
    game_types: string[];
    id: number;
    instagram_handle: string;
    joined_since: string;
    least_favorite_position: string[];
    nickname: string;
    owned_jerseys: string[];
    photo: string;
    preferred_positions: string[];
    skills: string[];
    suggestion: string;
    telu_relation: string[];
    total_matches: number;
    updated_at: string;
    user_id: number;
    whatsapp_number: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    user_detail: UserDetail;
}
