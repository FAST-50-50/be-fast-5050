import { PageProps } from '@/types';
import { Sport } from '@/types/Sport';
import SportForm from './Form';

interface Props extends PageProps {
    sport: Sport;
}

export default function Edit(props: Props) {
    return <SportForm {...props} />;
}
