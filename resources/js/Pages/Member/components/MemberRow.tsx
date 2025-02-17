// import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Button from '@/Components/Button';
import { User } from '@/types/User';
import * as StringUtil from '@/Utils/StringUtil';
import { useMemo } from 'react';
import BadgeList from './BadgeList';

interface MemberRowProps {
    index: number;
    member: User;
    onPressDetail: (id: number) => void;
}

const MemberRow = ({ index, member, onPressDetail }: MemberRowProps) => {
    const teluRelations = useMemo(() => {
        return StringUtil.parseJSONB(member?.user_detail?.telu_relation);
    }, [member?.user_detail?.telu_relation]);

    return (
        <tr
            key={member.id}
            className="border border-gray-300 dark:border-gray-700"
        >
            <td className="p-2">{index + 1}</td>
            <td className="p-2">{member?.user_detail?.fullname}</td>
            <td className="p-2">{member?.username}</td>
            <td className="p-2">{member?.role}</td>
            <td className="p-2">
                <BadgeList badges={teluRelations} />
            </td>
            <td>
                <div className="m-2">
                    <Button
                        variant="primary"
                        onClick={() => {
                            onPressDetail(member.id);
                        }}
                    >
                        Detail
                    </Button>
                </div>
            </td>
        </tr>
    );
};

export default MemberRow;
