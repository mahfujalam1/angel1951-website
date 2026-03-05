"use client";

import { useFormContext } from "react-hook-form";
import SectionCard from "../common/SectionCard";
import FormInput from "../common/FormInput";
import { OutPartnerFormData } from "@/types/hubPartner.types";

export default function AuthorizedContactSection() {
    const { register, formState: { errors } } = useFormContext<OutPartnerFormData>();

    return (
        <SectionCard number={2} title="Authorized Contact Person:">
            <div className="flex flex-col gap-4">
                <FormInput
                    label="Full Name:"
                    placeholder="Enter full name"
                    error={errors.contactFullName?.message}
                    {...register("contactFullName")}
                />
                <FormInput
                    label="Position / Title:"
                    placeholder="e.g. Operations Manager"
                    error={errors.contactPosition?.message}
                    {...register("contactPosition")}
                />
                <FormInput
                    label="Phone Number (WhatsApp preferred):"
                    placeholder="+1 000 000 0000"
                    error={errors.contactPhone?.message}
                    {...register("contactPhone")}
                />
                <FormInput
                    label="Email Address:"
                    type="email"
                    placeholder="contact@company.com"
                    error={errors.contactEmail?.message}
                    {...register("contactEmail")}
                />
                <FormInput
                    label="Company Website / Social Media (if any):"
                    placeholder="https://yourcompany.com"
                    error={errors.companyWebsite?.message}
                    {...register("companyWebsite")}
                />
            </div>
        </SectionCard>
    );
}