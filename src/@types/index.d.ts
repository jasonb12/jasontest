import type admin from "firebase-admin";

export const { auth } = admin;

declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
}

export type tEmpty = Record<string, never>;
