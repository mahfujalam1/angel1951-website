interface AuthHeroSplitProps {
    imgUrl: string;
    children: React.ReactNode;
    topAction?: React.ReactNode;
}

export default function AuthHeroSplit({ imgUrl, children, topAction }: AuthHeroSplitProps) {
    return (
        <div className="min-h-screen flex w-full overflow-hidden relative">
            {/* Left — Hero Image (Half-Half এর জন্য md:w-1/2) */}
            <div className="relative hidden md:block md:w-1/2 shrink-0 overflow-hidden">
                <img
                    src={imgUrl}
                    alt="Auth Hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
            </div>

            {/* Right — Form Container */}
            <div className="flex-1 relative flex flex-col bg-white overflow-y-auto px-6 md:px-12 lg:px-20 py-12 isolate">
                {/* Home/Top Action Button (এটির উইডথ ফিক্সড করা হয়েছে যাতে এটি মাঝখানে না আসে) */}
                {topAction && (
                    <div className="absolute top-6 right-6 z-50 pointer-events-none">
                        <div className="pointer-events-auto">
                            {topAction}
                        </div>
                    </div>
                )}

                {/* Form Content — এটিকে relative এবং high z-index দেওয়া হয়েছে */}
                <div className="my-auto pt-10 relative z-20 w-full max-w-lg mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
