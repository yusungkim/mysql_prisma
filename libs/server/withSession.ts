import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      token: string;
      admin: boolean;
    };
  }
}

const ttl = process.env.SESSION_TTL_IN_SEC ? parseInt(process.env.SESSION_TTL_IN_SEC) : 60 * 60;

const sessionConfigs = {
  cookieName: process.env.SESSION_NAME || "mysql_prisma",
  password: process.env.SESSION_SECRET!,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
  ttl
}

export function withApiSession(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionConfigs)
}
