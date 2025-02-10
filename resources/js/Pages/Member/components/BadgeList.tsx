const BadgeList = ({ badges }: { badges: string[] }) => {
    return (
        <>
            {badges?.map((badge, index) => (
                <span
                    key={index}
                    className="mr-1 inline-flex items-center rounded-md bg-gray-50 p-2 px-2 py-1 text-xs font-medium uppercase text-gray-600 ring-1 ring-inset ring-gray-500/10"
                >
                    {badge}
                </span>
            ))}
        </>
    );
};
export default BadgeList;
