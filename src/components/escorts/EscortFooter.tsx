'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function EscortFooter() {
  return (
    <footer className="bg-[hsl(222.2,84%,4.9%)] text-[#F2F2F2]">
      <div className="w-[90%] max-w-[1600px] mx-auto py-12">
        <div className="grid grid-cols-4 gap-8">
          {/* Über uns */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Über uns</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ueber-uns" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                  Unternehmen
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/karriere" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                  Karriere
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hilfe" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                  Hilfe & FAQ
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/sicherheit" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                  Sicherheit
                </Link>
              </li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/agb" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                  AGB
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                  Impressum
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Social Media</h3>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[hsl(333.3,71.4%,50.6%)] text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Peach. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
} 