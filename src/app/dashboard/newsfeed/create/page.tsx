import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import NewsfeedCreate from '@/components/NewsfeedCreate';

// Server Component
async function getUserData() {
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

  return { user };
}

// Default export - Server Component
export default async function NewsfeedCreatePage() {
  const data = await getUserData();
  return <NewsfeedCreate data={data} />;
} 