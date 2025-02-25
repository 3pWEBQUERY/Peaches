'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  HomeIcon, 
  UserIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface SubNavItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubNavItem[];
  isOpen?: boolean;
}

type FilteredSubItems = SubNavItem[] | undefined;

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    label: 'Profil',
    href: '/profile',
    icon: UserIcon,
    subItems: [
      {
        label: 'Mein Profil',
        href: '/dashboard/mitglied-profil/view',
      } as SubNavItem,
      {
        label: 'Profil bearbeiten',
        href: '/dashboard/mitglied-profil/edit',
      } as SubNavItem,
      {
        label: 'Escort Profile',
        href: '/dashboard/escort-profil/view',
      } as SubNavItem,
      {
        label: 'Escort-Profil erstellen',
        href: '/dashboard/escort-profil',
      } as SubNavItem,
      {
        label: 'Agenturprofil',
        href: '/dashboard/agentur-profil/view',
      } as SubNavItem,
      {
        label: 'Agenturprofil erstellen',
        href: '/dashboard/agentur-profil',
      } as SubNavItem
    ]
  },
  {
    label: 'Newsfeed',
    href: '/dashboard/newsfeed',
    icon: UserGroupIcon,
    subItems: [
      {
        label: 'Mein Newsfeed',
        href: '/dashboard/newsfeed/view',
      } as SubNavItem,
      {
        label: 'Newsfeed erstellen',
        href: '/dashboard/newsfeed/create',
      } as SubNavItem
    ]
  },
  {
    label: 'Likes',
    href: '/likes',
    icon: HeartIcon,
  },
  {
    label: 'Statistiken',
    href: '/stats',
    icon: ChartBarIcon,
  },
  {
    label: 'Nachrichten',
    href: '/dashboard/nachrichten',
    icon: UsersIcon,
  },
];

const bottomNavItems: NavItem[] = [
  {
    label: 'Einstellungen',
    href: '/settings',
    icon: Cog6ToothIcon,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  // Filtere die Untermenüpunkte basierend auf dem Kontotyp
  const getFilteredSubItems = (item: NavItem) => {
    if (!item.subItems) return undefined;
    
    return item.subItems.filter(subItem => {
      // Nur MITGLIED kann Mitglied-Profile sehen und bearbeiten
      if ((subItem.href.includes('/dashboard/mitglied-profil/view') || 
           subItem.href.includes('/dashboard/mitglied-profil/edit')) && 
          session?.user?.kontotyp !== 'MITGLIED') return false;
      
      // Nur ESCORT und AGENTUR können Escort-Profile erstellen
      if (subItem.href.includes('/dashboard/escort-profil') && 
          session?.user?.kontotyp !== 'ESCORT' && 
          session?.user?.kontotyp !== 'AGENTUR') return false;
      
      // Nur AGENTUR kann ein Agenturprofil erstellen oder ansehen
      if (subItem.href.includes('/dashboard/agentur-profil') && 
          session?.user?.kontotyp !== 'AGENTUR') return false;
      
      return true;
    });
  };

  // Finde den aktiven Hauptmenüpunkt und öffne sein Untermenü
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.subItems?.some(subItem => pathname === subItem.href)) {
        setOpenMenus(prev => ({
          ...prev,
          [item.href]: true
        }));
      }
    });
  }, [pathname]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <div className="relative">
      <div className={`flex flex-col h-screen bg-[hsl(333.3,71.4%,10%)] text-white border-r border-dashed border-[hsl(333.3,71.4%,50.6%)]/20 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        {/* Toggle Button */}
        <div className="absolute right-0 top-4 translate-x-full">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 bg-[hsl(333.3,71.4%,10%)] text-[hsl(333.3,71.4%,50.6%)] rounded-r-lg border-r border-t border-b border-dashed border-[hsl(333.3,71.4%,50.6%)]/20"
          >
            {isCollapsed ? (
              <Bars3Icon className="h-5 w-5" />
            ) : (
              <XMarkIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Logo */}
        <div className="p-4 border-b border-[hsl(333.3,71.4%,50.6%)]/20">
          <div className="flex items-center gap-2">
            <UserGroupIcon className="h-6 w-6 text-[hsl(333.3,71.4%,50.6%)]" />
            {!isCollapsed && (
              <span className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)]">Peach</span>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const filteredSubItems = getFilteredSubItems(item);
            const hasSubItems = filteredSubItems && filteredSubItems.length > 0;
            const isActive = pathname === item.href || 
              (filteredSubItems?.some(subItem => pathname === subItem.href));
            
            return (
              <div key={item.href}>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        onClick={() => {
                          if (hasSubItems) {
                            // Nur das Menü umschalten, nicht navigieren
                            setOpenMenus(prev => ({
                              ...prev,
                              [item.href]: !prev[item.href]
                            }));
                          } else {
                            // Nur bei Menüpunkten ohne Untermenü navigieren
                            router.push(item.href);
                          }
                        }}
                        className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                          isActive 
                            ? 'bg-[hsl(333.3,71.4%,50.6%)]/10 text-[hsl(333.3,71.4%,50.6%)]' 
                            : 'text-gray-400 hover:bg-[hsl(333.3,71.4%,50.6%)]/10 hover:text-[hsl(333.3,71.4%,50.6%)]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {typeof item.icon !== 'undefined' && <item.icon className="h-5 w-5" />}
                          {!isCollapsed && <span>{item.label}</span>}
                        </div>
                        {!isCollapsed && item.subItems && (
                          <svg
                            className={`w-4 h-4 transition-transform ${
                              openMenus[item.href] ? 'transform rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </div>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right" className="bg-zinc-800 text-white border-zinc-700">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>

                {/* Untermenü */}
                {!isCollapsed && hasSubItems && openMenus[item.href] && (
                  <div className="ml-4 mt-1 space-y-1">
                    {filteredSubItems.map((subItem: SubNavItem) => (
                      <TooltipProvider key={subItem.href} delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={subItem.href}
                              className={`block px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                                pathname === subItem.href
                                  ? 'bg-[hsl(333.3,71.4%,50.6%)]/10 text-[hsl(333.3,71.4%,50.6%)]' 
                                  : 'text-gray-400 hover:bg-[hsl(333.3,71.4%,50.6%)]/10 hover:text-[hsl(333.3,71.4%,50.6%)]'
                              }`}
                            >
                              <span className="pl-2">{subItem.label}</span>
                            </Link>
                          </TooltipTrigger>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-[hsl(333.3,71.4%,50.6%)]/20 space-y-2">
          {bottomNavItems.map((item) => (
            <TooltipProvider key={item.href} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 text-gray-400 rounded-lg hover:bg-[hsl(333.3,71.4%,50.6%)]/10 hover:text-[hsl(333.3,71.4%,50.6%)]"
                  >
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="bg-zinc-800 text-white border-zinc-700">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-3 py-2 text-gray-400 rounded-lg hover:bg-[hsl(333.3,71.4%,50.6%)]/10 hover:text-[hsl(333.3,71.4%,50.6%)] w-full"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                  {!isCollapsed && <span>Abmelden</span>}
                </button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="bg-zinc-800 text-white border-zinc-700">
                  Abmelden
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 text-xs text-gray-500 border-t border-[hsl(333.3,71.4%,50.6%)]/20">
            <div>Powered by Peach</div>
          </div>
        )}
      </div>
    </div>
  );
}
