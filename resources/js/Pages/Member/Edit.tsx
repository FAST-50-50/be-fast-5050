import { PageProps } from '@/types';
import { User } from '@/types/User';
import MemberForm from './Form';

interface Props extends PageProps {
    member: User;
}

export default function Edit(props: Props) {
    return <MemberForm {...props} />;
} 