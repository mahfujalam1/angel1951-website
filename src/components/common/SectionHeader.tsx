import SectionTag from "./SectionTag";

interface SectionHeaderProps {
    tag?: string;
    tagIcon?: string;
    title: string;
    subtitle?: string;
}

export default function SectionHeader({
    tag,
    tagIcon,
    title,
    subtitle,
}: SectionHeaderProps) {
    return (
        <div className="text-center mb-14">
            {tag && <SectionTag icon={tagIcon}>{tag}</SectionTag>}
            <h2 className="
        text-[clamp(28px,3vw,40px)] font-extrabold
        text-[#1F2937] font-sora mb-3
      ">
                {title}
            </h2>
            {subtitle && (
                <p className="
          text-[15px] text-[#6B7280] max-w-[560px]
          mx-auto leading-relaxed
        ">
                    {subtitle}
                </p>
            )}
        </div>
    );
}