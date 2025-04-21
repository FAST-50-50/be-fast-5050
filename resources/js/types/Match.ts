export interface Match {
    id: number;
    name: string;
    description: string;
    poster: string;
    game_type: string;
    venue: string;
    address: string;
    location_link: string;
    date: string;
    time: string;
    with_fg: boolean;
    with_vg: boolean;
    with_referee: boolean;
    with_linesman: boolean;
    max_players: number;
    min_players: number;
    price: number;
    community_id: number;
    social_link: {
        whatsapp?: string;
        telegram?: string;
    };
    community?: {
        id: number;
        name: string;
        sport?: {
            id: number;
            name: string;
        };
    };
    positions: {
        position: string;
        quota: number;
    }[];
    participants: number;
}

export interface MatchPosition {
    id: number;
    match_id: number;
    position: string;
    quota: number;
    created_at: string;
    updated_at: string;
}

export interface MatchParticipant {
    id: number;
    user_id: number;
    match_id: number;
    position: string;
    team: string | null;
    team_rank: number | null;
    goal: number | null;
    assist: number | null;
    clean_sheet: number | null;
    rating: number | null;
    status: 'JOINED' | 'PAID' | 'CANCELED' | null;
    created_at: string;
    updated_at: string;
    user?: {
        id: number;
        name: string;
        username: string;
    };
} 