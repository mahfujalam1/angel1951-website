import AuthHeroSplit from "@/components/auth/AuthHeroSplit";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { IMAGES } from "@/constants/index.image";

export default function NewPasswordPage() {
    return (
        <AuthHeroSplit imgUrl={IMAGES.commonAuthImage.src}>
            <NewPasswordForm />
        </AuthHeroSplit>
    );
}