import React from 'react';
import { cn } from "@/lib/utils";

interface AgenturProfilTabMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AGENTUR_TABS = [
  {
    id: "Grundinformationen",
    label: "Grundinformationen",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    id: "Beschreibung",
    label: "Beschreibung",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    )
  },
  {
    id: "Medien",
    label: "Medien",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: "Infrastruktur",
    label: "Infrastruktur",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    id: "Standort",
    label: "Standort",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    id: "Veröffentlichen",
    label: "Veröffentlichen",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
] as const;

export function AgenturProfilTabMenu({ activeTab, onTabChange }: AgenturProfilTabMenuProps) {
  return (
    <div className="flex flex-col">
      {AGENTUR_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex items-center gap-4 px-6 py-4 text-sm font-medium transition-colors border-l-4 group",
            activeTab === tab.id
              ? "bg-[hsl(333.3,71.4%,50.6%)] text-white border-white"
              : "text-gray-600 hover:bg-[hsl(333.3,71.4%,50.6%)] hover:text-white border-transparent hover:border-white"
          )}
        >
          <span className={cn(
            "flex-shrink-0 p-2 rounded-lg transition-colors",
            activeTab === tab.id
              ? "bg-white/20"
              : "bg-[hsl(333.3,71.4%,50.6%)] bg-opacity-10 group-hover:bg-white/20"
          )}>
            <span className={cn(
              "block transition-colors",
              activeTab === tab.id
                ? "text-white"
                : "text-[hsl(333.3,71.4%,50.6%)] group-hover:text-white"
            )}>
              {tab.icon}
            </span>
          </span>
          <span className="truncate">{tab.label}</span>
        </button>
      ))}
    </div>
  );
} 