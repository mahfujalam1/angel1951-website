import AuthHeroSplit from "@/components/auth/AuthHeroSplit";
import ForgotForm from "@/components/auth/ForgotForm";
import { IMAGES } from "@/constants/index.image";

export default function ForgotPasswordPage() {
    return (
        <AuthHeroSplit imgUrl={IMAGES.commonAuthImage.src}>
            <ForgotForm />
        </AuthHeroSplit>
    );
}