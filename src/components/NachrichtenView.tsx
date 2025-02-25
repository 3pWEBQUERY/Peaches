'use client';

import { useState } from 'react';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
}

interface Conversation {
  id: string;
  participants: {
    user: User;
  }[];
  messages: Message[];
}

interface NachrichtenViewProps {
  data: {
    user: User;
    conversations: Conversation[];
  };
}

export function NachrichtenView({ data }: NachrichtenViewProps) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Funktion zum Formatieren des Datums
  const formatDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);

    if (messageDate.toDateString() === today.toDateString()) {
      return format(messageDate, 'HH:mm');
    } else if (messageDate.getFullYear() === today.getFullYear()) {
      return format(messageDate, 'dd. MMM', { locale: de });
    }
    return format(messageDate, 'dd.MM.yyyy');
  };

  // Funktion zum Senden einer neuen Nachricht
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId: selectedConversation.id,
          content: newMessage,
        }),
      });

      if (response.ok) {
        setNewMessage('');
        // Hier würden Sie die Nachrichten neu laden
      }
    } catch (error) {
      console.error('Fehler beim Senden der Nachricht:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      {/* Conversations List (Bereich 2) */}
      <div className="w-[400px] border-r border-gray-200 bg-white h-screen overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[hsl(333.3,71.4%,50.6%)] pl-[25px]">Nachrichten</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {data.conversations.map((conversation) => {
            const otherParticipant = conversation.participants.find(
              (p) => p.user.id !== data.user.id
            )?.user;
            const lastMessage = conversation.messages[0];

            return (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  selectedConversation?.id === conversation.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <Image
                      src={otherParticipant?.profilbild || '/placeholder-avatar.jpg'}
                      alt={otherParticipant?.anzeigename || 'User'}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">
                        {otherParticipant?.anzeigename || otherParticipant?.email}
                      </h3>
                      {lastMessage && (
                        <span className="text-xs text-gray-500">
                          {formatDate(lastMessage.createdAt)}
                        </span>
                      )}
                    </div>
                    {lastMessage && (
                      <p className="text-sm text-gray-500 truncate">
                        {lastMessage.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Chat Area (Bereich 3) */}
      <main className="flex-1 h-screen flex flex-col bg-gray-50">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image
                    src={selectedConversation.participants.find(p => p.user.id !== data.user.id)?.user.profilbild || '/placeholder-avatar.jpg'}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h2 className="font-semibold">
                  {selectedConversation.participants.find(p => p.user.id !== data.user.id)?.user.anzeigename || 'Chat'}
                </h2>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === data.user.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.senderId === data.user.id
                        ? 'bg-[hsl(333.3,71.4%,50.6%)] text-white'
                        : 'bg-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {formatDate(message.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Schreibe eine Nachricht..."
                  className="flex-1"
                />
                <Button 
                  type="submit"
                  className="bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,40%)] text-white"
                >
                  Senden
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Wähle eine Konversation aus, um den Chat zu starten
          </div>
        )}
      </main>
    </div>
  );
} 