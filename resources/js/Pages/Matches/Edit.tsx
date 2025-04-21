import { PageProps } from '@/types';
import { Match } from '@/types/Match';
import MatchForm from './Form';

interface Props extends PageProps {
    match: Match;
    sports: { id: number; name: string }[];
    communities: { id: number; name: string }[];
}

export default function Edit(props: Props) {
    return <MatchForm {...props} />;
}
