import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      admin?: boolean;
    };
  }
}

const sessionConfigs = {
  cookieName: process.env.SESSION_NAME || "mysql_prisma",
  password: process.env.SESSION_SECRET!,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
  ttl: process.env.SESSION_TTL_IN_SEC ||  60 * 60,
}

export function withApiSession(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionConfigs)
}
