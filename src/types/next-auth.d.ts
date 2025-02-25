import 'next-auth';
import { KontoTyp } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      kontotyp: KontoTyp;
      profilbild?: string | null;
      anzeigename?: string | null;
    }
  }

  interface User {
    id: string;
    email: string;
    kontotyp: KontoTyp;
    profilbild?: string | null;
    anzeigename?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    kontotyp: KontoTyp;
    profilbild?: string | null;
    anzeigename?: string | null;
  }
}
