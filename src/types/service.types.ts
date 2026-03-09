import { LucideIcon } from "lucide-react";

export interface Service {
    icon: LucideIcon;
    tag: string;
    title: string;
    desc: string;
}

export interface HeroSlide {
    bg: string;
    badges: string[];
    title: string;
    titleHighlight: string;
    subtitle: string;
    imgUrl: string;
}

export interface TeamMember {
    role: string;
    name: string;
    avatar: string;
}

export interface Testimonial {
    quote: string;
    name: string;
    role: string;
    company: string;
    avatar: string;
}

export interface FAQ {
    q: string;
    a: string;
}

export interface StatItem {
    number: string;
    label: string;
}