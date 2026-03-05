interface SectionCardProps {
    number: number;
    title: string;
    children: React.ReactNode;
}

export default function SectionCard({ number, title, children }: SectionCardProps) {
    return (
        <div className="border border-gray-200 rounded-xl p-5 sm:p-6 bg-white shadow-sm">
            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-5 flex items-center gap-2 font-inter">
                <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {number}
                </span>
                {title}
            </h2>
            {children}
        </div>
    );
}