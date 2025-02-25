'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart, MessageCircle, Share2, AlertTriangle } from 'lucide-react';

interface ActionButtonsProps {
  escortId: string;
  escortName: string;
  userId?: string;
}

export default function ActionButtons({ escortId, escortName, userId }: ActionButtonsProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isVoted, setIsVoted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showMembershipDialog, setShowMembershipDialog] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Lade gespeicherte Zustände beim Mounten
  useEffect(() => {
    const votedProfiles = JSON.parse(localStorage.getItem('votedProfiles') || '[]');
    setIsVoted(votedProfiles.includes(escortId));
    
    // Prüfe Favoriten-Status über API
    const checkFavoriteStatus = async () => {
      if (!session) return;
      
      try {
        const response = await fetch('/api/favorites');
        if (response.ok) {
          const data = await response.json();
          const isFav = data.favorites.some((fav: any) => fav.escort.id === escortId);
          setIsFavorite(isFav);
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };
    
    checkFavoriteStatus();
  }, [escortId, session]);

  const handleVote = () => {
    const votedProfiles = JSON.parse(localStorage.getItem('votedProfiles') || '[]');
    
    if (!isVoted) {
      const newVotedProfiles = [...votedProfiles, escortId];
      localStorage.setItem('votedProfiles', JSON.stringify(newVotedProfiles));
      setIsVoted(true);
      toast({
        title: "Danke für deine Stimme!",
        description: `Du hast erfolgreich für ${escortName} gestimmt.`
      });
    } else {
      toast({
        title: "Bereits abgestimmt",
        description: "Du hast für dieses Profil bereits abgestimmt.",
        variant: "destructive"
      });
    }
  };

  const handleMessage = () => {
    if (!session) {
      setShowMembershipDialog(true);
      return;
    }

    if (userId) {
      router.push(`/messages?userId=${userId}`);
    }
  };

  const handleReport = () => {
    setShowReportDialog(true);
  };

  const submitReport = () => {
    if (reportReason.trim().length < 10) {
      toast({
        title: "Fehler",
        description: "Bitte gib einen ausführlicheren Grund an (mindestens 10 Zeichen).",
        variant: "destructive"
      });
      return;
    }

    // Hier könnte später eine API-Integration erfolgen
    toast({
      title: "Meldung eingereicht",
      description: "Vielen Dank für deine Meldung. Wir werden sie überprüfen."
    });
    setShowReportDialog(false);
    setReportReason("");
  };

  const handleFavorite = async () => {
    if (!session) {
      toast({
        title: "Nicht eingeloggt",
        description: "Bitte logge dich ein um Favoriten zu speichern.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ escortId }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Aktualisieren der Favoriten');
      }

      const data = await response.json();
      const isFav = data.favorites.some((fav: any) => fav.escort.id === escortId);
      setIsFavorite(isFav);

      toast({
        title: isFav ? "Zu Favoriten hinzugefügt" : "Aus Favoriten entfernt",
        description: isFav 
          ? `${escortName} wurde zu deinen Favoriten hinzugefügt.`
          : `${escortName} wurde aus deinen Favoriten entfernt.`
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Beim Aktualisieren der Favoriten ist ein Fehler aufgetreten.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const text = `Schau dir das Profil von ${escortName} an!`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(escortName)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast({
          title: "Link kopiert!",
          description: "Der Profillink wurde in die Zwischenablage kopiert."
        });
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share({
              title: escortName,
              text: text,
              url: url
            });
            toast({
              title: "Geteilt!",
              description: "Das Profil wurde erfolgreich geteilt."
            });
          } catch (error) {
            if ((error as Error).name !== 'AbortError') {
              toast({
                title: "Fehler beim Teilen",
                description: "Das Profil konnte nicht geteilt werden.",
                variant: "destructive"
              });
            }
          }
        }
    }
  };

  return (
    <>
      <Dialog open={showMembershipDialog} onOpenChange={setShowMembershipDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kostenlose Mitgliedschaft erforderlich</DialogTitle>
            <DialogDescription>
              Um Nachrichten an Escorts zu senden, benötigst du einen Account. 
              Die Registrierung ist komplett kostenlos und ermöglicht dir:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Direkte Nachrichten an Escorts</li>
                <li>Favoriten speichern</li>
                <li>Bewertungen abgeben</li>
                <li>Und vieles mehr!</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button onClick={() => router.push("/register")}>
              Jetzt kostenlos registrieren
            </Button>
            <Button variant="outline" onClick={() => router.push("/login")}>
              Anmelden
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profil melden</DialogTitle>
            <DialogDescription>
              Bitte gib einen Grund für deine Meldung an.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Beschreibe hier, warum du dieses Profil melden möchtest..."
              className="w-full min-h-[100px] p-2 border rounded-md"
            />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowReportDialog(false)}>
              Abbrechen
            </Button>
            <Button onClick={submitReport}>
              Meldung einreichen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleFavorite}
                className={`text-white hover:text-pink-500 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Add to favorites"
                disabled={isLoading}
              >
                <Heart 
                  className={`h-6 w-6 ${isFavorite ? 'fill-current text-pink-500' : ''}`} 
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Als Favorit speichern</p>
            </TooltipContent>
          </Tooltip>

          <div className="w-px h-6 bg-white/20" />

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleMessage}
                className="text-white hover:text-purple-400 transition-colors"
                aria-label="Send message"
              >
                <MessageCircle className="h-6 w-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Nachricht senden</p>
            </TooltipContent>
          </Tooltip>

          <div className="w-px h-6 bg-white/20" />

          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="text-white hover:text-blue-400 transition-colors"
                    aria-label="Share profile"
                  >
                    <Share2 className="h-6 w-6" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('telegram')}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Telegram
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('email')}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    E-Mail
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('copy')}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Link kopieren
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>Profil teilen</p>
            </TooltipContent>
          </Tooltip>

          <div className="w-px h-6 bg-white/20" />

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleReport}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-full 
                         transition-colors uppercase tracking-wider text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Melden
                </span>
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Gründe für eine Meldung:</h3>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Fake Profil oder falsche Identität</li>
                  <li>Verwendung gestohlener Bilder</li>
                  <li>Betrugsversuch oder verdächtige Aktivitäten</li>
                  <li>Belästigung oder unangemessenes Verhalten</li>
                  <li>Minderjährige Person</li>
                  <li>Spam oder Werbung</li>
                </ul>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
} 