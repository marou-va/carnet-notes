// src/types/express-session.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: {
      id: number;
      Nomuser: string;
      Prenomuser:string
      email: string;
    };
  }
}
