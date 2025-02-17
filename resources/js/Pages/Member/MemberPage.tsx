import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types/User';
import { Head } from '@inertiajs/react';
import MemberRow from './components/MemberRow';

export default function MemberPage({ members }: { members: User[] }) {
    const onMemberDetail = (id: number) => {
        console.log(`Member ID: ${id}`);
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Members
                </h2>
            }
        >
            <Head title="Members" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="mb-4 text-lg font-semibold">
                                Members of 
                            </h3>

                            <div className="overflow-x-auto">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold">
                                        Total Members: {members.length}
                                    </h3>
                                </div>
                                <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                                    <thead>
                                        <tr className="bg-gray-200 dark:bg-gray-700">
                                            <th className="border border-gray-300 p-2 dark:border-gray-600">
                                                #
                                            </th>
                                            <th className="border border-gray-300 p-2 dark:border-gray-600">
                                                Name
                                            </th>
                                            <th className="border border-gray-300 p-2 dark:border-gray-600">
                                                Username
                                            </th>
                                            <th className="border border-gray-300 p-2 dark:border-gray-600">
                                                Role
                                            </th>
                                            <th className="border border-gray-300 p-2 dark:border-gray-600">
                                                Relation
                                            </th>

                                            <th className="border border-gray-300 p-2 dark:border-gray-600">
                                                Menu
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {members.length > 0 ? (
                                            members.map((member, index) => {
                                                return (
                                                    <MemberRow
                                                        index={index}
                                                        key={member.id}
                                                        member={member}
                                                        onPressDetail={
                                                            onMemberDetail
                                                        }
                                                    />
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td className="p-4 text-center">
                                                    No members found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
