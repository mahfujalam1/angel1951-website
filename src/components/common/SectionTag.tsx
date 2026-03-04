interface SectionTagProps {
    icon?: string;
    children: React.ReactNode;
}

export default function SectionTag({ icon, children }: SectionTagProps) {
    return (
        <div className="flex justify-center mb-4">
            <span className="
        inline-flex items-center gap-1.5 px-4 py-1.5
        border border-[#1A3BDB] rounded-full
        text-[#1A3BDB] text-[13px] font-semibold
        bg-[#1A3BDB]/5
      ">
                {icon && <span className="text-[13px]">{icon}</span>}
                {children}
            </span>
        </div>
    );
}