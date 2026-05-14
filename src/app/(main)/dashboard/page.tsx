'use client'
import HubDashboardPage from '@/components/hub-dashboard/HubDashboardPage'
import BusinessDashboard from '@/components/corporate/BusinessDashboard'
import PersonalizedCargoDashboard from '@/components/corporate/PersonalizedCargoDashboard'
import CorporatePartnerDashboard from '@/components/corporate/CorporatePartnerDashboard'
import UserDashboard from '@/components/dashboard/UserDashboard'
import { useEffect, useState } from 'react'

function HubProviderDashboard() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
  }, [])

  return (
    <div>
      {role === "hubProvider" && <HubDashboardPage />}
      {role === "businessCustomer" && <BusinessDashboard />}
      {role === "personalizedCargo" && <PersonalizedCargoDashboard />}
      {role === "corporatePartner" && <CorporatePartnerDashboard />}
      {role === "customer" && <UserDashboard />}
    </div>
  )
}

export default HubProviderDashboard