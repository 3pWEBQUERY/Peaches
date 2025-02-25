import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { NachrichtenView } from '@/components/NachrichtenView';

// Server Component
async function getMessagesData() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect('/login');
  }

  // Hole die Konversationen des Benutzers
  const conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          userId: user.id
        }
      }
    },
    include: {
      participants: {
        include: {
          user: true
        }
      },
      messages: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1,
        include: {
          sender: true
        }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  return {
    user,
    conversations
  };
}

// Default export - Server Component
export default async function NachrichtenPage() {
  const data = await getMessagesData();
  return <NachrichtenView data={data} />;
} 