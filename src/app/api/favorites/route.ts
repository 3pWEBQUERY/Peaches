import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ favorites: [] }, { status: 401 });
  }

  // Temporär leeres Array zurückgeben
  return NextResponse.json({ favorites: [] });
}

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Temporär leeres Array zurückgeben
  return NextResponse.json({ favorites: [] });
} 