"use client";

import { Timer, Globe, Headphones } from "lucide-react";

const features = [
    {
        icon: <Timer size={28} color="#F5A623" />,
        title: "Real Time Delivery",
        description: "This involves managing the process of receiving",
    },
    {
        icon: <Globe size={28} color="#F5A623" />,
        title: "World wide services",
        description: "This involves managing the process of receiving",
    },
    {
        icon: <Headphones size={28} color="#F5A623" />,
        title: "24/7 Online support",
        description: "This involves managing the process of receiving",
    },
];

export default function FeatureBar() {
    return (
        <div
            style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translate(-50%, 50%)",
                width: "calc(100% - 160px)",
                maxWidth: "1100px",
                zIndex: 10,
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    background: "linear-gradient(135deg, #0f2057 0%, #1a3bdb 100%)",
                    borderRadius: "16px",
                    boxShadow: "0 20px 60px rgba(0,0,20,0.35)",
                    overflow: "hidden",
                }}
            >
                {features.map((feature, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            padding: "28px 32px",
                            borderRight:
                                i < features.length - 1
                                    ? "1px solid rgba(255,255,255,0.1)"
                                    : "none",
                            transition: "background 0.25s",
                            cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLDivElement).style.background =
                                "rgba(255,255,255,0.06)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLDivElement).style.background = "transparent";
                        }}
                    >
                        {/* Icon circle */}
                        <div
                            style={{
                                flexShrink: 0,
                                width: "52px",
                                height: "52px",
                                borderRadius: "50%",
                                background: "rgba(245,166,35,0.12)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {feature.icon}
                        </div>

                        {/* Text */}
                        <div>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "17px",
                                    fontWeight: 700,
                                    color: "#ffffff",
                                    marginBottom: "4px",
                                }}
                            >
                                {feature.title}
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "13px",
                                    color: "rgba(255,255,255,0.55)",
                                    lineHeight: 1.5,
                                }}
                            >
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}