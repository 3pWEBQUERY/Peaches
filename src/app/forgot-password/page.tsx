"use client";

import AuthCard from "@/components/AuthCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [emailSent, setEmailSent] = React.useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailSent(true);
    }
  };

  return (
    <main className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/login-register-bg-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        {/* Spacer */}
        <div className="w-[40%]"></div>

        {/* Content Container */}
        <div className="flex-1 flex items-center gap-16 pr-[15%]">
          {/* Logo */}
          <Link href="/" className="w-48 brightness-0 invert flex-shrink-0">
            <Image src="/next.svg" alt="Next.js Logo" width={192} height={37} className="w-full" />
          </Link>

          {/* Form */}
          <div className="flex-1">
            <AuthCard title="Passwort zurücksetzen">
              {!emailSent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-Mail-Adresse
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(333.3,71.4%,50.6%)] focus:border-transparent"
                      placeholder="email@example.com"
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[hsl(333.3,71.4%,50.6%)] text-white rounded-md py-2 hover:bg-[hsl(333.3,71.4%,45%)] transition-colors"
                  >
                    Link zum Zurücksetzen senden
                  </button>

                  <div className="text-center">
                    <Link 
                      href="/login" 
                      className="text-sm text-[hsl(333.3,71.4%,50.6%)] hover:underline"
                    >
                      Zurück zur Anmeldung
                    </Link>
                  </div>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-green-600 mb-4">
                    ✓ E-Mail wurde gesendet
                  </div>
                  <p className="text-gray-600">
                    Wir haben Ihnen einen Link zum Zurücksetzen Ihres Passworts an {email} gesendet. 
                    Bitte überprüfen Sie Ihren Posteingang.
                  </p>
                  <div className="pt-2">
                    <Link 
                      href="/login" 
                      className="text-sm text-[hsl(333.3,71.4%,50.6%)] hover:underline"
                    >
                      Zurück zur Anmeldung
                    </Link>
                  </div>
                </div>
              )}
            </AuthCard>
          </div>
        </div>
      </div>
    </main>
  );
}
