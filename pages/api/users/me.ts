import type { NextApiRequest, NextApiResponse } from "next";
import withMethodGuard from "@libs/server/withMethodGuard";
import { withApiSession } from "@libs/server/withSession";
import { sign, verify } from "@libs/server/jwt";

export type VerifiedUserResponse = {
  ok: boolean;
  user?: {
    id: number;
    email: string;
    nickname: string | null;
    admin: boolean;
  };
  message?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifiedUserResponse>
) {
  const user = req.session.user;

  if (!user) {
    return res.status(400).json({ ok: false, message: "Please Log in." });
  }
  const { id, token, admin } = user;

  if (!token) {
    return res.status(400).json({ ok: false, message: "Please Log in." });
  }

  const authenticated = verify(token);

  if (authenticated.ok && authenticated.userInfo?.userId === id) {
    // renew token and session
    const user = authenticated.userInfo;
    req.session.user = {
      id,
      token: sign(user), // reissue token
      admin: false,
    };
    await req.session.save();

    res.status(200).json({
      ok: true,
      user: {
        id: user.userId,
        email: user.email,
        nickname: user.nickname || null,
        admin: false,
      },
    });
  } else {
    res.status(400).json({ ok: false, message: "Please Log in." });
  }
}

export default withApiSession(withMethodGuard({ methods: ["GET"], handler }));
