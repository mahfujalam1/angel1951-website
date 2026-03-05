export function StatCard({
    label,
    count,
    color,
}: {
    label: string;
    count: number;
    color: string;
}) {
    return (
        <div className="flex-1 min-w-0 flex items-center  gap-2">
            <span className={`text-sm font-semibold px-6 py-4 rounded-md ${color}`}>{label}</span>
            <span className={`text-lg font-bold px-3 py-3 rounded-md ${color}`}>{count}</span>
        </div>
    );
}