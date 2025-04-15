const BadgeList = ({ badges = [] }: { badges?: string[] }) => {
    return (
        <div>
            {Array.isArray(badges) &&
                badges.map((badge, index) => (
                    <div
                        key={index}
                        className="mr-1 inline-flex items-center rounded-md bg-gray-50 p-2 px-2 py-1 text-xs font-medium uppercase text-gray-600 ring-1 ring-inset ring-gray-500/10"
                    >
                        {badge}
                    </div>
                ))}
        </div>
    );
};
export default BadgeList;
