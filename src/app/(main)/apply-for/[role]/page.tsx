"use client";

import { useParams } from "next/navigation";
import HubProviderPage from "@/components/hub-provider/HubProviderPage";
import OutPartnerPage from "@/components/hub-partner/OutPartnerPage";

export default function ApplyForPage() {
  const params = useParams();
  const role = params?.role as string;

  if (role === "become-hub") {
    return (
      <div className="">
        <HubProviderPage />
      </div>
    );
  }

  return (
    <div className="">
      <OutPartnerPage role={role} />
    </div>
  );
}
