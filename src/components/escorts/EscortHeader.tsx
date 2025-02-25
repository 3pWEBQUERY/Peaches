'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { 
  Heart, 
  MessageCircle, 
  Bell, 
  LayoutDashboard, 
  User, 
  Building2, 
  Newspaper, 
  PlayCircle, 
  Settings, 
  LogOut,
  Crown,
  ChevronDown
} from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function EscortHeader() {
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header className="w-full bg-[hsl(222.2,84%,4.9%)] border-b border-[hsl(333.3,71.4%,50.6%)]">
        <div className="w-[90%] max-w-[1600px] mx-auto">
          <div className="py-4 px-6 flex items-center justify-between">
            {/* Logo und Navigation */}
            <div className="flex items-center gap-8">
              <Link href="/" className="h-6">
                <img src="/next.svg" alt="Next.js Logo" className="h-full brightness-0 invert" />
              </Link>
              
              {/* Separator */}
              <div className="h-8 w-[2px] bg-[hsl(333.3,71.4%,50.6%)]"></div>
              
              {/* Navigation */}
              <nav>
                <ul className="flex gap-6 text-[#F2F2F2]">
                  <li>
                    <Link href="/escorts" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                      Escorts
                    </Link>
                  </li>
                  <li>
                    <Link href="/agenturen" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                      Agenturen
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Rechte Seite */}
            <div className="flex items-center gap-6">
              {session ? (
                <>
                  {/* Icons für eingeloggte Benutzer */}
                  <div className="flex items-center gap-4 text-[#F2F2F2]">
                    <Link href="/favorites" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                      <Heart className="w-5 h-5" />
                    </Link>
                    <Link href="/messages" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </Link>
                    <Link href="/notifications" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                      <Bell className="w-5 h-5" />
                    </Link>
                  </div>
                  
                  {/* Profilbild und Name mit Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-3 hover:opacity-90 transition-opacity focus:outline-none">
                      <div className="w-8 h-8 rounded-full overflow-hidden relative bg-[hsl(333.3,71.4%,50.6%)] flex items-center justify-center">
                        {session.user?.profilbild ? (
                          <Image
                            src={session.user.profilbild}
                            alt="Profilbild"
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        ) : (
                          <span className="text-white">{session.user?.anzeigename?.[0] || 'U'}</span>
                        )}
                      </div>
                      <span className="text-[#F2F2F2] text-sm">
                        {session.user?.anzeigename || 'User'}
                      </span>
                      <ChevronDown className="w-4 h-4 text-[#F2F2F2] opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64">
                      <DropdownMenuLabel>Mein Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <Link href="/dashboard">Dashboard</Link>
                        </DropdownMenuItem>
                        {session.user?.kontotyp === 'AGENTUR' && (
                          <>
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              <Link href="/dashboard/escort-profil">Escort Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Building2 className="mr-2 h-4 w-4" />
                              <Link href="/dashboard/agentur-profil">Agenturprofil</Link>
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem>
                          <Newspaper className="mr-2 h-4 w-4" />
                          <Link href="/newsfeed">Newsfeed</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <PlayCircle className="mr-2 h-4 w-4" />
                          <Link href="/stories">Stories</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageCircle className="mr-2 h-4 w-4" />
                          <Link href="/messages">Nachrichten</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <Link href="/settings">Einstellungen</Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onSelect={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Ausloggen
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <div className="p-4 bg-gradient-to-r from-pink-50 to-red-50">
                        <div className="flex items-center gap-2 mb-2">
                          <Crown className="h-4 w-4 text-[hsl(333.3,71.4%,50.6%)]" />
                          <h4 className="font-semibold text-sm">Premium Mitgliedschaft</h4>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">
                          Genieße exklusive Vorteile und erweiterte Funktionen mit unserer Premium-Mitgliedschaft.
                        </p>
                        <Link 
                          href="/premium"
                          className="block text-center text-sm bg-[hsl(333.3,71.4%,50.6%)] text-white py-2 rounded-md hover:bg-[hsl(335.1,77.6%,42%)] transition-colors"
                        >
                          Jetzt upgraden
                        </Link>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex gap-4">
                  <Link 
                    href="/login" 
                    className="px-3 py-1.5 text-sm text-[#F2F2F2] hover:bg-[hsl(333.3,71.4%,50.6%)] rounded-md transition-colors"
                  >
                    Anmelden
                  </Link>
                  <Link 
                    href="/register" 
                    className="px-3 py-1.5 text-sm bg-[hsl(333.3,71.4%,50.6%)] text-white rounded-md hover:bg-[hsl(335.1,77.6%,42%)] transition-colors"
                  >
                    Registrieren
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
} 