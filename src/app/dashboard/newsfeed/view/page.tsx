import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { NewsfeedView } from '@/components/NewsfeedView';
import { Post, User, EscortProfil, Prisma, PostLike, Comment } from '@prisma/client';

interface NewsfeedPost {
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

interface NewsfeedUser extends User {
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
}

interface NewsfeedData {
  user: NewsfeedUser;
  posts: NewsfeedPost[];
}

type PrismaPost = Post & {
  author: User;
  escortProfil: {
    id: string;
    künstlername: string;
    anzeigebild: string | null;
  } | null;
  likes: (PostLike & {
    user: User;
  })[];
  comments: (Comment & {
    author: User;
  })[];
};

// Server Component
async function getNewsfeedData(): Promise<NewsfeedData> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/login');
  }

  const include = {
    author: true,
    escortProfil: {
      select: {
        id: true,
        künstlername: true,
        anzeigebild: true,
      }
    },
    likes: {
      include: {
        user: true
      }
    },
    comments: {
      include: {
        author: true
      }
    }
  } satisfies Prisma.PostInclude;

  // Hole den aktuellen Benutzer mit seinen Posts und Beziehungen
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      authoredPosts: {
        include,
        orderBy: {
          createdAt: 'desc'
        }
      },
      escortProfil: {
        select: {
          id: true,
          künstlername: true,
          anzeigebild: true,
        }
      },
      verwalteteEscorts: {
        select: {
          id: true,
          künstlername: true,
          anzeigebild: true,
        }
      },
      followers: {
        include: {
          follower: true
        }
      },
      following: {
        include: {
          following: true
        }
      },
      likedBy: {
        include: {
          fromUser: true
        }
      }
    }
  });

  if (!user) {
    redirect('/login');
  }

  // Hole die IDs der gefolgten Benutzer
  const following = await prisma.follow.findMany({
    where: {
      followerId: user.id
    },
    select: {
      followingId: true
    }
  });

  const followingIds = following.map(f => f.followingId);

  // Hole die Posts der gefolgten Benutzer
  const followingPosts = await prisma.post.findMany({
    where: {
      authorId: {
        in: followingIds
      }
    },
    include,
    orderBy: {
      createdAt: 'desc'
    }
  }) as PrismaPost[];

  // Wenn der User eine Agentur ist, hole auch die Posts der verwalteten Escort-Profile
  let escortProfilePosts: PrismaPost[] = [];
  if (user.kontotyp === 'AGENTUR' && user.verwalteteEscorts) {
    const escortProfileIds = user.verwalteteEscorts.map(profil => profil.id);
    escortProfilePosts = await prisma.post.findMany({
      where: {
        authorId: {
          in: escortProfileIds
        }
      },
      include,
      orderBy: {
        createdAt: 'desc'
      }
    }) as PrismaPost[];
  }

  // Kombiniere und sortiere alle Posts
  const allPosts = [...user.authoredPosts, ...followingPosts, ...escortProfilePosts]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map((post: PrismaPost) => ({
      ...post,
      likes: post.likes.map(like => ({
        user: like.user
      })),
      comments: post.comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        author: comment.author,
        createdAt: comment.createdAt
      }))
    }));

  // Transformiere die Daten in das erwartete Format
  return {
    user: {
      ...user,
      followers: user.followers.map(f => f.follower),
      following: user.following.map(f => f.following),
      likedBy: user.likedBy.map(l => l.fromUser),
      escortProfil: user.escortProfil || undefined,
      verwalteteEscorts: user.verwalteteEscorts || undefined
    },
    posts: allPosts
  };
}

// Default export - Server Component
export default async function NewsfeedViewPage() {
  const data = await getNewsfeedData();
  return <NewsfeedView data={data} />;
} 