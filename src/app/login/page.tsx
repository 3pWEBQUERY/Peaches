"use client";

import AuthCard from "@/components/AuthCard";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [bgImage, setBgImage] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const randomNum = Math.floor(Math.random() * 11) + 1;
    setBgImage(`/login-register-bg-${randomNum}.jpg`);
  }, []);
  
  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email && !showPassword) {
      setShowPassword(true);
      return;
    }

    if (!email || !password) {
      setError("Bitte füllen Sie alle Felder aus");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard"
      });

      if (!result) {
        setError("Ein unerwarteter Fehler ist aufgetreten");
        return;
      }

      if (result.error) {
        switch (result.error) {
          case "CredentialsSignin":
            setError("E-Mail oder Passwort ist falsch");
            break;
          default:
            setError(`Anmeldefehler: ${result.error}`);
        }
        return;
      }

      // Erfolgreiche Anmeldung
      if (result.url) {
        router.push(result.url);
      } else {
        router.push("/dashboard");
      }
      router.refresh();
      
    } catch (error) {
      console.error("Login error:", error);
      setError("Ein Fehler ist bei der Anmeldung aufgetreten");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
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
            <AuthCard title="Anmelden">
              <div className="mb-6">
                <p className="text-gray-600 mb-2">
                  Willkommen zurück! Bitte melden Sie sich mit Ihren Zugangsdaten an.
                </p>
                <p className="text-sm text-gray-500">
                  Noch kein Konto? {" "}
                  <Link href="/register" className="text-[hsl(333.3,71.4%,50.6%)] hover:underline">
                    Jetzt registrieren
                  </Link>
                </p>
              </div>
              <form onSubmit={handleContinue} className="space-y-4">
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
                    disabled={showPassword}
                  />
                </div>

                {showPassword && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passwort
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(333.3,71.4%,50.6%)] focus:border-transparent"
                      placeholder="••••••••"
                      required
                      autoFocus
                    />
                  </div>
                )}

                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}

                <button 
                  type="submit" 
                  className="w-full bg-[hsl(333.3,71.4%,50.6%)] text-white rounded-md py-2 hover:bg-[hsl(333.3,71.4%,45%)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? "Wird angemeldet..." : (showPassword ? "Anmelden" : "Weiter")}
                </button>

                {showPassword && (
                  <div className="text-center mt-2">
                    <Link href="/forgot-password" className="text-sm text-[hsl(333.3,71.4%,50.6%)] hover:underline">
                      Passwort vergessen?
                    </Link>
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Oder</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-[hsl(333.3,71.4%,50.6%)] hover:text-white hover:border-transparent transition-colors">
                    <Image src="/google.svg" alt="Google" width={20} height={20} className="w-5 h-5" />
                    Weiter mit Google
                  </button>
                </div>

                <div className="text-center">
                  <a href="#" className="text-sm text-[hsl(333.3,71.4%,50.6%)] hover:underline">
                    Hilfe bei der Anmeldung
                  </a>
                </div>
              </form>
            </AuthCard>
          </div>
        </div>
      </div>
    </main>
  );
}
