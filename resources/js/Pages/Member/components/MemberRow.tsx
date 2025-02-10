// import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Button from '@/Components/Button';
import { User } from '@/types/User';
import * as StringUtil from '@/Utils/StringUtil';
import { useMemo } from 'react';
import BadgeList from './BadgeList';

interface MemberRowProps {
    member: User;
    onPressDetail: (id: number) => void;
}

const MemberRow = ({ member, onPressDetail }: MemberRowProps) => {
    const teluRelations = useMemo(() => {
        return StringUtil.parseJSONB(member?.user_detail?.telu_relation);
    }, [member?.user_detail?.telu_relation]);
    const preferredPositions = useMemo(() => {
        return StringUtil.parseJSONB(member?.user_detail?.preferred_positions);
    }, [member?.user_detail?.preferred_positions]);
    console.log('preferredPositions', preferredPositions);

    return (
        <tr
            key={member.id}
            className="border border-gray-300 dark:border-gray-700"
        >
            <td className="p-2">{member.id}</td>
            <td className="p-2">{member.name}</td>
            <td className="p-2">{member.email}</td>
            <td className="p-2">-</td>
            <td className="p-2">
                <BadgeList badges={teluRelations} />
            </td>
            <td className="p-2">
                {preferredPositions?.map((position: string, index: number) => (
                    <span
                        key={index}
                        className="mr-1 rounded-full bg-gray-200 px-2 py-1 text-xs uppercase dark:bg-gray-700"
                    >
                        {position}
                    </span>
                ))}
            </td>
            <td className="p-2">{member?.user_detail?.favorite_position}</td>
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
