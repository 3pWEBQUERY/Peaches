'use client';

import React, { useState } from 'react';
import { EscortFormData } from '@/types/escort';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  PhoneIcon,
  GlobeAltIcon,
  ClockIcon,
  CalendarIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface KontaktTabProps {
  formData: EscortFormData;
  setFormData: React.Dispatch<React.SetStateAction<EscortFormData>>;
  onTabChange: (tab: string) => void;
}

interface ContactMethod {
  id: string;
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  type: string;
}

interface SocialPlatform {
  id: string;
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  prefix?: string;
}

const contactMethods: ContactMethod[] = [
  { 
    id: 'telefon', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-600">
        <path fill="currentColor" d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02c-.37-1.11-.56-2.3-.56-3.53c0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
      </svg>
    ),
    label: 'Telefon', 
    placeholder: '+41 XX XXX XX XX', 
    type: 'tel' 
  },
  { 
    id: 'whatsapp', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#25D366]">
        <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l1.001-3.657l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
    label: 'WhatsApp', 
    placeholder: '+41 XX XXX XX XX', 
    type: 'tel' 
  },
  { 
    id: 'telegram', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#229ED9]">
        <path fill="currentColor" d="m20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42l10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001l-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15l4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
      </svg>
    ),
    label: 'Telegram', 
    placeholder: '@username', 
    type: 'text' 
  },
  {
    id: 'signal',
    icon: (
      <svg viewBox="0 0 512 512" className="w-5 h-5 text-[#3A76F0]">
        <path fill="currentColor" d="M256 0c13.3 0 26.3 1 39.1 3l-3.7 23.7C279.9 24.9 268 24 256 24s-23.9 .9-35.4 2.7L216.9 3C229.7 1 242.7 0 256 0zm60.8 7.3l-5.7 23.3c23.4 5.7 45.4 14.9 65.4 27.1l12.5-20.5c-22.1-13.4-46.4-23.6-72.2-29.9zm90.5 42.2L393.1 68.8c19.1 14 36 30.9 50.1 50.1l19.4-14.2C447 83.6 428.4 65 407.3 49.5zm67.5 73.6l-20.5 12.5c12.2 20 21.4 42 27.1 65.4l23.3-5.7c-6.3-25.8-16.5-50.1-29.9-72.2zM509 216.9l-23.7 3.7c1.8 11.5 2.7 23.4 2.7 35.4s-.9 23.9-2.7 35.4l23.7 3.7c1.9-12.7 3-25.8 3-39.1s-1-26.3-3-39.1zM454.3 376.5c12.2-20 21.4-42 27.1-65.4l23.3 5.7c-6.3 25.8-16.5 50.1-29.9 72.2l-20.5-12.5zm-11.1 16.6l19.4 14.2c-15.5 21.1-34.1 39.8-55.2 55.2l-14.2-19.4c19.1-14 36-30.9 50.1-50.1zm-66.7 61.2l12.5 20.5c-22.1 13.4-46.4 23.6-72.2 29.9l-5.7-23.3c23.4-5.7 45.4-14.9 65.4-27.1zm-85.1 31l3.7 23.7c-12.7 1.9-25.8 3-39.1 3s-26.3-1-39.1-3l3.7-23.7c11.5 1.8 23.4 2.7 35.4 2.7s23.9-.9 35.4-2.7zm-90.5-3.9l-5.7 23.3c-19.4-4.7-37.9-11.6-55.3-20.5l-24.3 5.7-5.5-23.4 32.8-7.7 7.8 4c15.7 8 32.5 14.3 50.1 18.6zM90 471.3l5.5 23.4-41.6 9.7C26 510.8 1.2 486 7.6 458.2l9.7-41.6L40.7 422 31 463.7c-2.4 10.4 6.9 19.7 17.3 17.3L90 471.3zM45.5 401.8l-23.4-5.5L27.8 372C18.9 354.7 12 336.1 7.3 316.7l23.3-5.7c4.3 17.6 10.6 34.4 18.6 50.1l4 7.8-7.7 32.8zM26.7 291.4L3 295.1C1 282.3 0 269.3 0 256s1-26.3 3-39.1l23.7 3.7C24.9 232.1 24 244 24 256s.9 23.9 2.7 35.4zm3.9-90.5L7.3 195.2c6.3-25.8 16.5-50.1 29.9-72.2l20.5 12.5c-12.2 20-21.4 42-27.1 65.4zm38.3-82.1L49.5 104.7C65 83.6 83.6 65 104.7 49.5l14.2 19.4c-19.1 14-36 30.9-50.1 50.1zm66.7-61.2L123.1 37.2c22.1-13.4 46.4-23.6 72.2-29.9l5.7 23.3c-23.4 5.7-45.4 14.9-65.4 27.1zM464 256c0 114.9-93.1 208-208 208c-36.4 0-70.7-9.4-100.5-25.8c-2.9-1.6-6.2-2.1-9.4-1.4L53.6 458.4l21.6-92.5c.7-3.2 .2-6.5-1.4-9.4C57.4 326.7 48 292.4 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208z"/>
      </svg>
    ),
    label: 'Signal',
    placeholder: '+41 XX XXX XX XX',
    type: 'tel'
  },
];

const socialPlatforms: SocialPlatform[] = [
  { 
    id: 'website', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41c0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
    label: 'Website', 
    placeholder: 'https://www.example.com' 
  },
  { 
    id: 'onlyfans', 
    icon: (
      <svg viewBox="0 0 90 90" className="w-5 h-5 text-[#00AFF0]">
        <path fill="currentColor" d="M30 15C13.431 15 0 28.431 0 45s13.431 30 30 30 30-13.431 30-30S46.569 15 30 15zm0 39c-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c.007 4.964-4.012 8.993-8.976 9-.008 0-.016 0-.024 0z"/>
        <path fill="currentColor" d="M63.72 37.5c7.622 2.194 16.62 0 16.62 0-2.611 11.4-10.891 18.54-22.831 19.409C52.777 67.893 41.96 75.007 30 75l9-28.606C48.252 16.992 52.994 15 74.935 15H90c-2.52 11.1-11.206 19.579-26.28 22.5z"/>
      </svg>
    ),
    label: 'OnlyFans', 
    placeholder: 'username', 
    prefix: 'onlyfans.com/' 
  },
  { 
    id: 'patreon', 
    icon: (
      <svg viewBox="0 0 567.18 545.8" className="w-5 h-5 text-[#E85B46]">
        <circle cx="362.59" cy="204.59" fill="currentColor" r="204.59"/>
        <path fill="currentColor" d="M0 0h100v545.8H0z"/>
      </svg>
    ),
    label: 'Patreon', 
    placeholder: 'username', 
    prefix: 'patreon.com/' 
  },
  { 
    id: 'fansly', 
    icon: (
      <svg viewBox="-.09 .15 800.05 657.84" className="w-5 h-5 text-[#2699F7]">
        <path fill="currentColor" d="m197.44.38c13.02.2 22.34.78 27.72 1.71 4.46.77 11.75 2.32 16.2 3.45 4.46 1.13 12.13 3.43 17.06 5.11s14.71 5.89 21.75 9.34 16.82 8.96 21.75 12.24 12.6 9.03 17.06 12.79 19.9 18.66 60.53 59.4l.01 7.67-61.85 61.79-7.65-.04-28.14-27.96c-18.84-18.71-30.12-29.26-34.12-31.89-3.28-2.16-9.23-5.46-13.22-7.35-3.99-1.88-10.9-4.4-15.35-5.59-4.46-1.19-11.94-2.48-16.63-2.87s-12.17-.4-16.63-.03-11.36 1.5-15.35 2.5c-3.99 1.01-10.51 3.23-14.5 4.94s-10.7 5.36-14.93 8.1c-4.22 2.74-10.98 8.29-15.03 12.34-4.04 4.04-9.6 10.8-12.34 15.02-2.75 4.22-6.39 10.93-8.11 14.92-1.71 3.98-3.94 10.5-4.95 14.49-1.01 3.98-2.13 10.89-2.51 15.34-.37 4.45-.36 11.93.03 16.62s1.68 12.17 2.88 16.62c1.19 4.45 3.71 11.36 5.59 15.34s5.19 9.93 7.34 13.21c2.75 4.19 15.24 17.32 79.97 82.25l140.72-140.49c77.4-77.27 143.99-143.08 147.97-146.24 3.99-3.16 10.9-8.18 15.35-11.14 4.46-2.97 11.75-7.33 16.2-9.68 4.46-2.36 12.32-6.01 17.48-8.12s13.99-5.17 19.62-6.79 15.22-3.85 21.32-4.94c9.69-1.73 13.82-1.98 32.84-1.98 19.01 0 23.14.25 32.84 1.98 6.1 1.09 15.69 3.31 21.32 4.94 5.63 1.62 14.46 4.68 19.62 6.79s13.03 5.79 17.48 8.17c4.46 2.38 11.36 6.47 15.35 9.09s10.9 7.68 15.35 11.25c4.46 3.57 12.34 10.87 17.52 16.21s11.75 12.78 14.59 16.53 7.18 9.89 9.65 13.64c2.46 3.75 7.3 12.57 10.75 19.6s7.8 17.39 9.66 23.01c1.86 5.63 4.35 14.64 5.53 20.03 1.19 5.39 2.56 13.06 3.05 17.05.49 3.98 1.14 12.04 1.43 17.9.3 6.03.1 15.83-.48 22.59-.55 6.56-1.78 15.96-2.73 20.88s-2.68 12.4-3.86 16.62-3.51 11.31-5.18 15.77c-1.67 4.45-4.68 11.55-6.7 15.77s-5.86 11.31-8.54 15.77c-2.68 4.45-7.44 11.55-10.57 15.77s-9.36 11.7-13.85 16.62-18.08 18.82-52.26 52.82l-8.53.01-29.73-29.61c-16.94-16.87-30.24-30.8-30.92-32.38-.67-1.57-.96-3.79-.65-5.11.36-1.56 9.55-11.45 27.54-29.62 17.65-17.83 28.51-29.49 31.34-33.67 2.38-3.52 5.68-9.08 7.33-12.36s4-9.13 5.23-13 2.81-10.39 3.52-14.49 1.28-10.62 1.28-14.49-.43-10-.94-13.64c-.51-3.63-1.89-9.87-3.05-13.85s-3.45-10.12-5.09-13.64c-1.63-3.52-5.02-9.46-7.51-13.21-2.5-3.75-7.18-9.52-10.4-12.81-3.22-3.3-8.54-8.02-11.82-10.49s-9.62-6.35-14.07-8.62c-4.46-2.27-11.36-5.11-15.35-6.3s-9.74-2.6-12.79-3.13-10.15-.95-15.78-.93-13.3.62-17.06 1.34c-3.75.72-9.7 2.27-13.22 3.45-3.52 1.17-8.89 3.39-11.94 4.92s-8.42 4.67-11.94 6.97c-4.73 3.1-16.23 13.97-81.91 79.31l101.08 101c92.7 92.62 101.08 101.23 101.08 103.77 0 1.52-.55 3.82-1.22 5.11s-56.42 57.41-123.88 124.71c-92.64 92.41-123.7 122.91-126.92 124.6-2.35 1.23-6.57 2.84-9.38 3.57s-7.42 1.32-10.23 1.31-6.84-.43-8.96-.92c-2.11-.49-5.95-1.87-8.53-3.07c-4.09-1.89-25.63-23.07-167.45-164.65-89.51-89.36-165.83-166.12-169.59-170.57s-9.26-11.74-12.21-16.19c-2.96-4.45-7.06-11.17-9.11-14.92s-5.21-10.08-7.03-14.06-4.61-11.08-6.21-15.77-3.83-12.17-4.95-16.62c-1.13-4.45-2.68-11.74-3.44-16.19-.82-4.79-1.57-15.4-1.83-26-.34-13.77-.12-20.36.96-28.55.77-5.86 2.39-15.06 3.6-20.46 1.21-5.39 3.71-14.21 5.56-19.6s5.67-14.6 8.48-20.46c2.82-5.86 6.89-13.53 9.05-17.05s7.22-10.8 11.23-16.19 11.91-14.41 17.55-20.05 14.67-13.53 20.06-17.54 12.69-9.06 16.2-11.22c3.52-2.16 11.19-6.23 17.06-9.05 5.86-2.81 15.07-6.63 20.47-8.48 5.39-1.85 14.22-4.35 19.62-5.57 5.39-1.21 13.84-2.78 18.76-3.47 6.49-.92 14.35-1.18 28.57-.96zm170.58 308.22c-2.81 1.01-8.76 3.72-13.22 6.03s-11.53 6.97-15.71 10.35-10.43 9.6-13.87 13.82c-4.15 5.09-7.99 11.12-11.38 17.9-3.17 6.35-5.96 13.46-7.34 18.75-1.73 6.6-2.32 11.31-2.65 20.88-.31 9.19-.07 14.22.94 19.6.75 3.98 2.16 9.74 3.14 12.78.98 3.05 3.44 8.99 5.47 13.21s5.97 10.74 8.76 14.49 8.01 9.6 11.61 13 9.51 8.13 8.13 13.15 10.5c3.64 2.38 8.91 5.42 11.73 6.75 2.81 1.33 7.52 3.22 10.45 4.2s8.11 2.37 11.51 3.1 10.02 1.55 14.71 1.82c4.95.29 11.75.06 16.2-.55 4.22-.57 10.94-1.99 14.93-3.15s10.32-3.54 14.07-5.29 9.89-5.27 13.65-7.82c3.75-2.56 9.89-7.72 13.65-11.47 3.75-3.75 8.92-9.89 11.48-13.64s6.08-9.89 7.83-13.64 4.12-10.08 5.28-14.06 2.58-11.08 3.17-15.77c.61-4.9.85-11.78.55-16.19-.28-4.22-1.09-10.36-1.79-13.64s-2.1-8.46-3.1-11.51c-1.01-3.05-3.71-9.18-6-13.64-2.3-4.45-6.05-10.59-8.35-13.64-2.29-3.05-7-8.24-10.46-11.53-3.46-3.3-9.16-7.94-12.68-10.32s-8.32-5.3-10.66-6.48c-2.35-1.18-7.72-3.37-11.94-4.85s-10.94-3.26-14.93-3.94c-3.99-.69-11.86-1.21-17.48-1.18-6.51.04-13.03.66-17.91 1.68-4.22.89-9.98 2.43-12.79 3.44zm33.69 29.31c3.99.19 9.28.86 11.75 1.47 3.47.86 4.37 1.41 3.94 2.4-.31.7-1.07 2.62-1.69 4.26s-1.14 4.61-1.16 6.61c-.02 1.99.72 5.64 1.65 8.1s2.79 5.82 4.14 7.46 4.52 4.13 7.05 5.54c3.97 2.21 5.48 2.56 11 2.56 5.64 0 6.97-.33 16.2-5.54l1.78 4.05c.98 2.23 2.57 7.12 3.52 10.87 1.45 5.68 1.66 8.52 1.28 17.05-.32 7.3-.99 11.81-2.32 15.77-1.03 3.05-2.98 7.65-4.34 10.23s-4.32 6.99-6.57 9.8c-2.26 2.81-6.39 6.96-9.18 9.22s-8.15 5.58-11.9 7.39c-3.75 1.8-9.51 3.92-12.79 4.72-4.54 1.09-8.52 1.35-16.63 1.06-8.72-.31-11.9-.8-17.48-2.7-3.75-1.28-9.51-3.98-12.79-6.01-3.31-2.04-8.82-6.68-12.37-10.41-4.59-4.83-7.41-8.77-9.97-13.95-1.97-3.97-4.2-9.71-4.97-12.76s-1.59-8.61-1.82-12.36c-.26-4.13.06-9.5.81-13.64.68-3.75 2.24-9.31 3.48-12.36s3.49-7.64 5.02-10.2c1.52-2.56 5.47-7.36 8.77-10.65 3.3-3.3 8.1-7.24 10.66-8.76s7.16-3.78 10.21-5.02 8.23-2.77 11.51-3.39c3.38-.65 9.11-.99 13.22-.79z"/>
      </svg>
    ),
    label: 'Fansly', 
    placeholder: 'username', 
    prefix: 'fansly.com/' 
  },
  { 
    id: 'instagram', 
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#E4405F]">
        <path fill="currentColor" d="M12 0C8.74 0 8.333.015 7.053.072C5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053C.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913c.306.788.717 1.459 1.384 2.126c.667.666 1.336 1.079 2.126 1.384c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558c.788-.306 1.459-.718 2.126-1.384c.666-.667 1.079-1.335 1.384-2.126c.296-.765.499-1.636.558-2.913c.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913c-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071c1.17.055 1.805.249 2.227.415c.562.217.96.477 1.382.896c.419.42.419.819.896 1.381c.164.422.36 1.057.413 2.227c.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227c-.224.562-.479.96-.899 1.382c-.419.419-.824.679-1.38.896c-.42.164-1.065.36-2.235.413c-1.274.057-1.649.07-4.859.07c-3.211 0-3.586-.015-4.859-.074c-1.171-.061-1.816-.256-2.236-.421c-.569-.224-.96-.479-1.379-.899c-.421-.419-.69-.824-.9-1.38c-.165-.42-.359-1.065-.42-2.235c-.045-1.26-.061-1.649-.061-4.844c0-3.196.016-3.586.061-4.861c.061-1.17.255-1.814.42-2.234c.21-.57.479-.96.9-1.381c.419-.419.81-.689 1.379-.898c.42-.166 1.051-.361 2.221-.421c1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162c0 3.405 2.76 6.162 6.162 6.162c3.405 0 6.162-2.76 6.162-6.162c0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44c-.795 0-1.44-.646-1.44-1.44c0-.794.646-1.439 1.44-1.439c.793-.001 1.44.645 1.44 1.439z"/>
      </svg>
    ),
    label: 'Instagram', 
    placeholder: 'username', 
    prefix: 'instagram.com/' 
  },
  { 
    id: 'x', 
    icon: (
      <svg viewBox="0 0 512 512" className="w-5 h-5 text-black">
        <path fill="currentColor" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
      </svg>
    ),
    label: 'X (Twitter)', 
    placeholder: 'username', 
    prefix: 'twitter.com/' 
  },
];

const availabilityPresets = [
  { id: 'fulltime', label: '24/7 Verfügbar', icon: '🌙', description: 'Rund um die Uhr erreichbar' },
  { id: 'daytime', label: 'Tagsüber', icon: '☀️', description: '08:00 - 20:00 Uhr' },
  { id: 'evening', label: 'Abends', icon: '🌅', description: '18:00 - 02:00 Uhr' },
  { id: 'nighttime', label: 'Nachts', icon: '🌜', description: '22:00 - 06:00 Uhr' },
  { id: 'weekend', label: 'Wochenende', icon: '🎉', description: 'Fr-So ganztägig' },
  { id: 'custom', label: 'Individuell', icon: '📅', description: 'Eigene Zeiten' },
];

export function KontaktTab({ formData, setFormData, onTabChange }: KontaktTabProps) {
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [showSocialPlatforms, setShowSocialPlatforms] = useState(false);
  const [activeSocialPlatforms, setActiveSocialPlatforms] = useState<string[]>([]);

  const toggleAvailability = (id: string) => {
    setSelectedAvailability(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleSocialPlatform = (id: string) => {
    setActiveSocialPlatforms(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)] pb-2">
          Kontakt
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Geben Sie Ihre Kontaktmöglichkeiten und Erreichbarkeit an.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Hauptkontaktmethoden */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Kontaktmöglichkeiten</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactMethods.map((method) => (
                <div key={method.id} className="space-y-2">
                  <Label htmlFor={method.id} className="flex items-center gap-2">
                    <span>{method.icon}</span>
                    <span>{method.label}</span>
                  </Label>
                  <Input
                    id={method.id}
                    type={method.type}
                    value={formData[method.id as keyof EscortFormData] as string}
                    onChange={(e) => setFormData({...formData, [method.id]: e.target.value})}
                    placeholder={method.placeholder}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Media & Websites */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Soziale Medien & Websites</h3>
              <Switch
                checked={showSocialPlatforms}
                onCheckedChange={setShowSocialPlatforms}
                className="data-[state=checked]:bg-[hsl(333.3,71.4%,50.6%)]"
              />
            </div>
            
            {showSocialPlatforms && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {socialPlatforms.map((platform) => (
                    <Badge
                      key={platform.id}
                      variant={activeSocialPlatforms.includes(platform.id) ? 'default' : 'outline'}
                      className={cn(
                        "cursor-pointer",
                        activeSocialPlatforms.includes(platform.id) 
                          ? 'bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,45%)]' 
                          : ''
                      )}
                      onClick={() => toggleSocialPlatform(platform.id)}
                    >
                      <span className="inline-flex gap-2 items-center">
                        <span>{platform.icon}</span>
                        <span>{platform.label}</span>
                      </span>
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {activeSocialPlatforms.map((platformId) => {
                    const platform = socialPlatforms.find(p => p.id === platformId);
                    if (!platform) return null;
                    
                    return (
                      <div key={platform.id} className="space-y-2">
                        <Label htmlFor={platform.id} className="flex items-center gap-2">
                          <span>{platform.icon}</span>
                          <span>{platform.label}</span>
                        </Label>
                        <div className="relative">
                          {platform.prefix && (
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              {platform.prefix}
                            </span>
                          )}
                          <Input
                            id={platform.id}
                            value={formData.socialMedia?.[platform.id] || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              socialMedia: {
                                ...formData.socialMedia,
                                [platform.id]: e.target.value
                              }
                            })}
                            placeholder={platform.placeholder}
                            className={platform.prefix ? 'pl-[140px]' : ''}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Erreichbarkeit */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Erreichbarkeit</h3>
            
            {/* Schnellauswahl */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {availabilityPresets.map((preset) => (
                <Button
                  key={preset.id}
                  type="button"
                  variant={selectedAvailability.includes(preset.id) ? 'default' : 'outline'}
                  className={cn(
                    "h-auto py-3 px-4 flex flex-col items-center gap-1",
                    selectedAvailability.includes(preset.id) 
                      ? 'bg-[hsl(333.3,71.4%,50.6%)] text-white hover:bg-[hsl(333.3,71.4%,45%)]' 
                      : ''
                  )}
                  onClick={() => toggleAvailability(preset.id)}
                >
                  <span className="text-2xl">{preset.icon}</span>
                  <span className="font-medium">{preset.label}</span>
                  <span className="text-xs opacity-80">{preset.description}</span>
                </Button>
              ))}
            </div>

            {/* Zusätzliche Optionen */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Switch
                  id="termine_spontan"
                  checked={formData.termine_spontan}
                  onCheckedChange={(checked) => setFormData({...formData, termine_spontan: checked})}
                  className="data-[state=checked]:bg-[hsl(333.3,71.4%,50.6%)]"
                />
                <Label htmlFor="termine_spontan">Spontane Termine möglich</Label>
              </div>

              <div>
                <Label htmlFor="erreichbarkeit">Zusätzliche Informationen zur Erreichbarkeit</Label>
                <textarea
                  id="erreichbarkeit"
                  value={formData.erreichbarkeit}
                  onChange={(e) => setFormData({...formData, erreichbarkeit: e.target.value})}
                  placeholder="z.B. Bevorzugte Kontaktzeiten, Antwortzeit, Buchungsvorlauf..."
                  className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onTabChange("Standort")}
          >
            Zurück
          </Button>
          <Button
            type="button"
            className="bg-[hsl(333.3,71.4%,50.6%)] text-white hover:bg-[hsl(333.3,71.4%,45%)]"
            onClick={() => onTabChange("Veröffentlichen")}
          >
            Weiter
          </Button>
        </div>
      </div>
    </div>
  );
} 