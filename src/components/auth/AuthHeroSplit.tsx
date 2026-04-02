interface AuthHeroSplitProps {
    imgUrl: string;
    children: React.ReactNode;
    topAction?: React.ReactNode;
}

export default function AuthHeroSplit({ imgUrl, children, topAction }: AuthHeroSplitProps) {
    return (
        <div className="min-h-screen grid md:grid-cols-[40%_60%]">
            {/* Left — Hero Image */}
            <div className="relative overflow-hidden md:block hidden">
                <img src={imgUrl} alt="Ship" className="w-full h-full object-cover" />
                <div className="absolute inset-0 " />
            </div>

            {/* Right — Form */}
            <div className="relative flex flex-col px-16 py-12 overflow-y-auto">
                {topAction && (
                    <div className="absolute top-6 right-6">{topAction}</div>
                )}
                <div className="my-auto pt-14">{children}</div>
            </div>
        </div>
    );
}