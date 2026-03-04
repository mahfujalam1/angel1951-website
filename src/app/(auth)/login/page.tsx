import AuthHeroSplit from "@/components/auth/AuthHeroSplit";
import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/constants/index.image";
import Link from "next/link";

export default function LoginPage() {
    return (
        <AuthHeroSplit
            imgUrl={IMAGES.commonAuthImage.src}
            topAction={
                <Link href="/">
                    <Button className="bg-[#0D1117] hover:bg-[#1a2233] text-white rounded-xl px-5">
                        Home
                    </Button>
                </Link>
            }
        >
            <LoginForm />
        </AuthHeroSplit>
    );
}