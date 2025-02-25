'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { AgenturProfilForm } from '@/components/AgenturProfilForm';
import { AgenturProfilTabMenu } from '@/components/AgenturProfilTabMenu';

export function AgenturProfilClient() {
  const [activeTab, setActiveTab] = useState("Grundinformationen");

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      {/* Vertikales Tab Menu neben der Sidebar */}
      <div className="w-[400px] border-r border-gray-200 bg-white h-screen overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] pl-[15px]">
            Agenturprofil
          </h2>
          <p className="text-sm text-gray-600 mt-1 pl-[15px]">
            Verwalten Sie Ihr Profil
          </p>
        </div>
        <AgenturProfilTabMenu activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <AgenturProfilForm activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </main>
    </div>
  );
} 