'use client';

import { useState } from 'react';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import ProfileLayout from '@/components/ProfileLayout';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Post {
  id: string;
  content: string;
  images: string[];
  authorId: string;
  author: User;
  escortProfil?: {
    id: string;
    künstlername: string;
    anzeigebild?: string | null;
  } | null;
  likes: {
    user: User;
  }[];
  comments: {
    id: string;
    content: string;
    author: User;
    createdAt: Date;
  }[];
  createdAt: Date;
}

interface NewsfeedViewProps {
  data: {
    user: User & {
      followers: User[];
      following: User[];
      likedBy: User[];
      escortProfil?: {
        id: string;
        künstlername: string;
        anzeigebild?: string | null;
      } | null;
      verwalteteEscorts?: {
        id: string;
        künstlername: string;
        anzeigebild?: string | null;
      }[];
    };
    posts: Post[];
  };
}

export function NewsfeedView({ data }: NewsfeedViewProps) {
  const [posts, setPosts] = useState(data.posts);
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});

  // Profildaten für das ProfileLayout
  const profileData = {
    name: data.user.anzeigename || data.user.email,
    photosCount: data.user.likedBy?.length || 0,
    followersCount: data.user.followers?.length || 0,
    description: data.user.beschreibung || '',
    profilbild: data.user.profilbild || '/placeholder-avatar.jpg',
    activity: data.user.kontotyp,
    location: '',
    favoriteTags: [
      { name: 'newsfeed' },
      { name: 'social' }
    ],
    favoriteProfiles: [],
    openingHours: [] // Leeres Array für Newsfeed-View
  };

  // Funktion zum Formatieren des Datums
  const formatDate = (date: Date) => {
    return format(new Date(date), 'dd. MMM yyyy, HH:mm', { locale: de });
  };

  // Like/Unlike Funktion
  const handleLike = async (postId: string) => {
    try {
      const response = await fetch('/api/posts/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Liken/Unliken');
      }

      // Aktualisiere den Post-Status
      setPosts(currentPosts => 
        currentPosts.map(post => {
          if (post.id === postId) {
            const hasLiked = post.likes.some(like => like.user.id === data.user.id);
            if (hasLiked) {
              // Unlike
              return {
                ...post,
                likes: post.likes.filter(like => like.user.id !== data.user.id),
              };
            } else {
              // Like
              return {
                ...post,
                likes: [...post.likes, { user: data.user }],
              };
            }
          }
          return post;
        })
      );
    } catch (error) {
      toast.error('Fehler beim Liken/Unliken des Posts');
    }
  };

  // Kommentar hinzufügen
  const handleComment = async (postId: string) => {
    const content = commentText[postId]?.trim();
    if (!content) return;

    try {
      const response = await fetch('/api/posts/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, content }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Kommentieren');
      }

      const { comment } = await response.json();

      // Aktualisiere den Post-Status
      setPosts(currentPosts =>
        currentPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, comment],
            };
          }
          return post;
        })
      );

      // Lösche den Kommentartext
      setCommentText(prev => ({ ...prev, [postId]: '' }));
      toast.success('Kommentar erfolgreich hinzugefügt');
    } catch (error) {
      toast.error('Fehler beim Hinzufügen des Kommentars');
    }
  };

  // Teilen-Funktion
  const handleShare = async (post: Post, method: 'copy' | 'whatsapp' | 'telegram' | 'facebook') => {
    try {
      const postUrl = `${window.location.origin}/dashboard/newsfeed/view`;
      
      switch (method) {
        case 'copy':
          await navigator.clipboard.writeText(postUrl);
          toast.success('Link wurde in die Zwischenablage kopiert');
          break;
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(postUrl)}`, '_blank');
          break;
        case 'telegram':
          window.open(`https://t.me/share/url?url=${encodeURIComponent(postUrl)}`, '_blank');
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank');
          break;
      }
    } catch (error) {
      toast.error('Teilen ist derzeit nicht möglich');
      console.error('Share error:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      {/* Profile Layout (Bereich 2) */}
      <div className="w-[400px] border-r border-gray-200 bg-white h-screen overflow-y-auto">
        <ProfileLayout {...profileData} />
      </div>
      
      {/* Newsfeed (Bereich 3) */}
      <main className="flex-1 h-screen overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto p-8">
          {/* Post erstellen */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10">
                  <Image
                    src={data.user.profilbild || '/placeholder-avatar.jpg'}
                    alt={data.user.anzeigename || 'User'}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <Button
                  variant="outline"
                  className="flex-1 justify-start text-gray-500 font-normal"
                  onClick={() => window.location.href = '/dashboard/newsfeed/create'}
                >
                  Was möchtest du teilen?
                </Button>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  className="flex-1 text-gray-600"
                  onClick={() => window.location.href = '/dashboard/newsfeed/create'}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Foto/Video
                </Button>
                <Button
                  variant="ghost"
                  className="flex-1 text-gray-600"
                  onClick={() => window.location.href = '/dashboard/newsfeed/create'}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Gefühle/Aktivitäten
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="pt-6">
                  {/* Post Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12">
                      <Image
                        src={post.escortProfil?.anzeigebild || post.author.profilbild || '/placeholder-avatar.jpg'}
                        alt={post.escortProfil?.künstlername || post.author.anzeigename || 'User'}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">
                        {post.escortProfil ? (
                          <>
                            <span>{post.escortProfil.künstlername}</span>
                            <span className="text-sm text-gray-500 ml-2">
                              (gepostet von {post.author.anzeigename || post.author.email})
                            </span>
                          </>
                        ) : (
                          post.author.anzeigename || post.author.email
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(post.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-600 mb-4 whitespace-pre-wrap">{post.content}</p>

                  {/* Post Images */}
                  {post.images && post.images.length > 0 && (
                    <div className={`grid ${post.images.length === 1 ? '' : 'grid-cols-2'} gap-4 mb-4`}>
                      {post.images.map((image, index) => (
                        <div key={index} className="relative aspect-video">
                          <Image
                            src={image}
                            alt={`Bild ${index + 1}`}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Likes & Comments Count */}
                  <div className="flex items-center justify-between py-2 text-sm text-gray-500 border-t border-b">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <svg className="w-5 h-5 text-[hsl(333.3,71.4%,50.6%)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        {post.likes.length}
                      </span>
                    </div>
                    <span>{post.comments.length} Kommentare</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="ghost"
                      className={`flex-1 ${
                        post.likes.some(like => like.user.id === data.user.id)
                          ? 'text-[hsl(333.3,71.4%,50.6%)]'
                          : 'text-gray-600'
                      }`}
                      onClick={() => handleLike(post.id)}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      Gefällt mir
                    </Button>
                    <Button
                      variant="ghost"
                      className={`flex-1 ${showComments[post.id] ? 'text-[hsl(333.3,71.4%,50.6%)]' : 'text-gray-600'}`}
                      onClick={() => setShowComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="flex items-center gap-2">
                        Kommentieren
                        <span className="text-sm text-gray-500">({post.comments.length})</span>
                      </span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex-1 text-gray-600"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          Teilen
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleShare(post, 'copy')} className="gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          <span>Link kopieren</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare(post, 'whatsapp')} className="gap-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#25D366">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                          <span className="text-[#128C7E]">Via WhatsApp</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare(post, 'telegram')} className="gap-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#229ED9">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.306.025.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                          </svg>
                          <span className="text-[#229ED9]">Via Telegram</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare(post, 'facebook')} className="gap-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          <span className="text-[#1877F2]">Via Facebook</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Comments Section */}
                  {showComments[post.id] && (
                    <div className="mt-4 pt-4 space-y-4">
                      {/* Comment Input */}
                      <div className="flex gap-3">
                        <div className="relative w-8 h-8 flex-shrink-0">
                          <Image
                            src={data.user.profilbild || '/placeholder-avatar.jpg'}
                            alt={data.user.anzeigename || 'User'}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1 flex gap-2">
                          <Input
                            value={commentText[post.id] || ''}
                            onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                            placeholder="Schreibe einen Kommentar..."
                            className="flex-1"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleComment(post.id);
                              }
                            }}
                          />
                          <Button
                            onClick={() => handleComment(post.id)}
                            className="bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,40%)] text-white"
                          >
                            Senden
                          </Button>
                        </div>
                      </div>

                      {/* Comments List */}
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-3">
                          <div className="relative w-8 h-8 flex-shrink-0">
                            <Image
                              src={comment.author.profilbild || '/placeholder-avatar.jpg'}
                              alt={comment.author.anzeigename || 'User'}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1 bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">
                                {comment.author.anzeigename || comment.author.email}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 