import { Testimonial } from "@/types/service.types";
import { IMAGES } from "./index.image";

export const testimonials: Testimonial[] = [
    {
        quote:
            "LogistiCore transformed our entire supply chain operation. Their warehouse automation solution reduced our processing time by 65% while maintaining 99.9% accuracy. The ROI was evident within just 3 months.",
        name: "Sarah Johnson",
        role: "Supply Chain Director",
        company: "Global Manufacturing Co.",
        avatar: IMAGES.client.src,
    },
    {
        quote:
            "Working with Buan Logistics has been a game-changer for our imports from China. Their sea cargo service is reliable, affordable, and the team is always responsive. Highly recommended!",
        name: "Kwame Asante",
        role: "Operations Manager",
        company: "West Africa Traders Ltd.",
        avatar: IMAGES.client.src,
    },
    {
        quote:
            "The air cargo service saved us weeks of waiting. Our frozen produce arrived in perfect condition. Professional team, transparent pricing. We've made them our exclusive logistics partner.",
        name: "Amina Diallo",
        role: "Founder & CEO",
        company: "Fresh Foods Africa",
        avatar: IMAGES.client.src,
    },
];