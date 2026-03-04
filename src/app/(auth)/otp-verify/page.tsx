import AuthHeroSplit from "@/components/auth/AuthHeroSplit";
import OTPInput from "@/components/auth/OTPInput";
import { IMAGES } from "@/constants/index.image";

export default function OTPPage() {
    return (
        <AuthHeroSplit imgUrl={IMAGES.commonAuthImage.src}>
            <OTPInput />
        </AuthHeroSplit>
    );
}