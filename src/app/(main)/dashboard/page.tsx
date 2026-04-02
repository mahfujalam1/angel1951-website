'use client'
import HubDashboardPage from '@/components/hub-dashboard/HubDashboardPage'
import PartnerDashboard from '@/components/partner-dashboard/PartnerDashboard'
import { useEffect, useState } from 'react'

function HubProviderDashboard() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
  }, [])

  return (
    <div>
      {
        role === "hubProvider" && <HubDashboardPage />
      }
      {
        role === "partner" && <PartnerDashboard />
      }
    </div>
  )
}

export default HubProviderDashboard