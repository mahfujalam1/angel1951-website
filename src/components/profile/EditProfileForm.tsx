"use client";
import { useState } from "react";
import InputField from "../common/InputFiled";

export default function EditProfileForm() {
    const [userName, setUserName] = useState("Khushi Akter");
    const [email, setEmail] = useState("mstkhushiakter333@gmail.com");
    const [contact, setContact] = useState("+990005846848456");
    const [address, setAddress] = useState("58/ Joker Vila, Gotham City");

    const handleSave = () => {
        // handle save logic here
        console.log({ userName, email, contact, address });
    };

    return (
        <div className="flex flex-col gap-5 max-w-lg">
            <InputField
                label="User Name"
                value={userName}
                onChange={setUserName}
                placeholder="Enter your name"
            />
            <InputField
                label="Email"
                value={email}
                onChange={setEmail}
                placeholder="Enter your email"
                type="email"
            />
            <InputField
                label="Contact Number"
                value={contact}
                onChange={setContact}
                placeholder="+1 000 000 0000"
            />
            <InputField
                label="Address"
                value={address}
                onChange={setAddress}
                placeholder="Enter your address"
            />
            <div className="pt-2 flex justify-center">
                <button
                    onClick={handleSave}
                    className="bg-primary text-white text-sm font-semibold px-8 py-2.5 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-sm"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}