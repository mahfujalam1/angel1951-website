"use client";

import Slider from "react-slick";
import { useRouter } from "next/navigation";
import { heroSlides } from "@/constants/heroSlides";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FeatureBar from "./FeatureBar";

export default function HeroSlider() {
    const router = useRouter();

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4500,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: false,
        appendDots: (dots: React.ReactNode) => (
            <div
                style={{
                    position: "absolute",
                    bottom: "32px",
                    left: "80px",
                    width: "auto",
                    padding: 0,
                }}
            >
                <ul style={{ margin: 0, padding: 0, display: "flex", gap: "10px" }}>
                    {dots}
                </ul>
            </div>
        ),
        customPaging: (_i: number) => (
            <div
                style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.4)",
                    transition: "all 0.3s",
                    cursor: "pointer",
                }}
            />
        ),
    };

    return (
        <>
            <style>{`
                .hero-slider .slick-dots li div {
                    background: rgba(255,255,255,0.35) !important;
                    width: 10px !important;
                    height: 10px !important;
                    border-radius: 50% !important;
                    transition: all 0.3s !important;
                }
                .hero-slider .slick-dots li.slick-active div {
                    background: #F5A623 !important;
                    width: 28px !important;
                    border-radius: 5px !important;
                }
                .hero-slider .slick-dots {
                    text-align: left !important;
                    bottom: 32px !important;
                    left: 80px !important;
                    width: auto !important;
                }
                .hero-slider .slick-dots li {
                    width: auto !important;
                    height: auto !important;
                    margin: 0 !important;
                }
                .hero-slider .slick-slide > div {
                    line-height: 0;
                }
                .hero-content {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    max-width: 800px;
                    padding-left: 80px;
                    padding-right: 40px;
                }
                @media (max-width: 768px) {
                    .hero-content {
                        padding-left: 16px !important;
                        padding-right: 16px !important;
                        max-width: 100% !important;
                    }
                    .hero-subtitle {
                        max-width: 100% !important;
                    }
                    .hero-slider .slick-dots {
                        left: 16px !important;
                    }
                }
            `}</style>
            <div
                className="hero-slider"
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden",
                }}
            >
                <Slider {...settings}>
                    {heroSlides.map((slide, i) => (
                        <div key={i}>
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "100vh",
                                    display: "flex",
                                    alignItems: "center",
                                    background: "#0A0E1A",
                                }}
                            >
                                {/* Background Image */}
                                <img
                                    src={slide.imgUrl}
                                    alt=""
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                />
                                
                                {/* Dark Overlay for readability */}
                                <div 
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                                        zIndex: 1
                                    }}
                                />

                                {/* Content */}
                                <div className="hero-content">
                                    {/* Badges */}
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            marginBottom: "28px",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        {slide.badges.map((badge, bi) => (
                                            <span
                                                key={bi}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "6px",
                                                    padding: "20px 14px",
                                                    background:
                                                        "linear-gradient(275deg,rgba(33,33,158,1) 36%, rgba(0,212,255,1) 100%)",
                                                    borderRadius: "10px",
                                                    color: "#fff",
                                                    fontSize: "13px",
                                                    fontWeight: 500,
                                                    backdropFilter: "blur(10px)",
                                                }}
                                            >
                                                <span style={{ color: "#F5A623" }}>⭐</span>
                                                {badge}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Title */}
                                    <h1
                                        style={{
                                            fontSize: "clamp(40px, 5vw, 64px)",
                                            fontWeight: 500,
                                            color: "#fff",
                                            lineHeight: 1.1,
                                            marginBottom: "16px",
                                            fontFamily: "var(--font-sora), sans-serif",
                                        }}
                                    >
                                        {slide.title}{" "}
                                        <span style={{ color: "#F5A623" }}>
                                            {slide.titleHighlight}
                                        </span>
                                    </h1>

                                    {/* Subtitle */}
                                    <p
                                        className="hero-subtitle"
                                        style={{
                                            fontSize: "16px",
                                            color: "#fff",
                                            fontWeight: 500,
                                            lineHeight: 1.7,
                                            marginBottom: "36px",
                                            maxWidth: "440px",
                                        }}
                                    >
                                        {slide.subtitle}
                                    </p>

                                    {/* CTA Buttons */}
                                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                        <button
                                            onClick={() => router.push("/register")}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                padding: "18px 28px",
                                                background: "#F5A623",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "10px",
                                                fontSize: "15px",
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                fontFamily: "var(--font-sora), sans-serif",
                                                transition: "all 0.25s",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = "#D4891A";
                                                e.currentTarget.style.transform = "translateY(-2px)";
                                                e.currentTarget.style.boxShadow = "0 8px 24px rgba(245,166,35,0.4)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = "#F5A623";
                                                e.currentTarget.style.transform = "translateY(0)";
                                                e.currentTarget.style.boxShadow = "none";
                                            }}
                                        >
                                            Send your first Packages
                                        </button>

                                        <button
                                            onClick={() => router.push("/register")}
                                            style={{
                                                width: "46px",
                                                height: "35px",
                                                borderRadius: "10%",
                                                border: "2px solid rgba(255,255,255,0.4)",
                                                background: "transparent",
                                                color: "#fff",
                                                fontSize: "18px",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                transition: "all 0.2s",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = "#fff";
                                                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                                                e.currentTarget.style.background = "transparent";
                                            }}
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* ✅ FeatureBar — Slider শেষে, কিন্তু wrapper-এর ভেতরে */}
                <div className="md:block hidden">
                    <FeatureBar />
                </div>
            </div>
        </>
    );
}