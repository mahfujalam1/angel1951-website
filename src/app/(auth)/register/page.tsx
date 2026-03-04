import AuthHeroSplit from "@/components/auth/AuthHeroSplit";
import RegisterForm from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/constants/index.image";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <AuthHeroSplit
            imgUrl={IMAGES.register.src}
            topAction={
                <Link href="/n">
                    <Button className="bg-[#0D1117] hover:bg-[#1a2233] text-white rounded-xl px-5">
                        Home
                    </Button>
                </Link>
            }
        >
            <RegisterForm />
        </AuthHeroSplit>
    );
}