"use client";

import AuthCard from "@/components/AuthCard";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [showPasswordFields, setShowPasswordFields] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [anzeigename, setAnzeigename] = React.useState("");
  const [profilbild, setProfilbild] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [bgImage, setBgImage] = React.useState("");

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleProfilbildChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Zeige eine Vorschau des Bildes
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilbild(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return null;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Bildupload fehlgeschlagen');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Fehler beim Bildupload:', error);
      throw error;
    }
  };

  React.useEffect(() => {
    const randomNum = Math.floor(Math.random() * 11) + 1;
    setBgImage(`/login-register-bg-${randomNum}.jpg`);
  }, []);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email && !showPasswordFields) {
      setShowPasswordFields(true);
      return;
    }

    if (!email || !password || !confirmPassword || !anzeigename) {
      setError("Bitte füllen Sie alle Felder aus");
      return;
    }

    if (password !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein");
      return;
    }

    if (password.length < 8) {
      setError("Das Passwort muss mindestens 8 Zeichen lang sein");
      return;
    }

    setIsLoading(true);

    try {
      // Lade zuerst das Bild hoch, falls vorhanden
      let profilbildUrl = null;
      if (selectedFile) {
        try {
          profilbildUrl = await uploadImage();
        } catch (error) {
          setError('Fehler beim Hochladen des Profilbilds');
          return;
        }
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          password, 
          anzeigename, 
          profilbild: profilbildUrl 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registrierung fehlgeschlagen");
      }

      // Erfolgreiche Registrierung
      router.push("/login");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Ein Fehler ist aufgetreten");
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
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
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
            <AuthCard title="Konto erstellen">
              <div className="mb-6">
                <p className="text-gray-600 mb-2">
                  Erstellen Sie ein neues Konto, um fortzufahren.
                </p>
                <p className="text-sm text-gray-500">
                  Bereits registriert? {" "}
                  <Link href="/login" className="text-[hsl(333.3,71.4%,50.6%)] hover:underline">
                    Jetzt anmelden
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
                    disabled={showPasswordFields}
                  />
                </div>

                {showPasswordFields && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Anzeigename
                    </label>
                    <input
                      type="text"
                      value={anzeigename}
                      onChange={(e) => setAnzeigename(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(333.3,71.4%,50.6%)] focus:border-transparent"
                      placeholder="Max Mustermann"
                      required
                    />
                  </div>
                )}

                {showPasswordFields && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profilbild
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilbildChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(333.3,71.4%,50.6%)] focus:border-transparent"
                    />
                    {profilbild && (
                      <div className="mt-2">
                        <img
                          src={profilbild}
                          alt="Profilvorschau"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}

                {showPasswordFields && (
                  <>
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
                        minLength={8}
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Passwort bestätigen
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(333.3,71.4%,50.6%)] focus:border-transparent"
                        placeholder="••••••••"
                        required
                        minLength={8}
                      />
                    </div>

                    {error && (
                      <div className="text-red-500 text-sm">{error}</div>
                    )}
                  </>
                )}

                <button 
                  type="submit" 
                  className="w-full bg-[hsl(333.3,71.4%,50.6%)] text-white rounded-md py-2 hover:bg-[hsl(333.3,71.4%,45%)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? "Wird registriert..." : (showPasswordFields ? "Registrieren" : "Weiter")}
                </button>

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
              </form>
            </AuthCard>
          </div>
        </div>
      </div>
    </main>
  );
}
