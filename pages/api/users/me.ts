import type { NextApiRequest, NextApiResponse } from "next";
import withMethodGuard from "@libs/server/withMethodGuard";
import { withApiSession } from "@libs/server/withSession";
import { sign, verify } from "@libs/server/jwt";

export type VerificationResponse = {
  ok: boolean;
  user?: {
    email: string;
    nickname: string | null;
  };
  message?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerificationResponse>
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
    // userId includes in session but not in the api response.
    req.session.user = {
      id,
      token: sign(user), // reissue token
      admin: false,
    };
    await req.session.save();

    res.status(200).json({ ok: true, user: {email: user.email, nickname: user.nickname || null}});
  } else {
    res.status(400).json({ ok: false, message: "Please Log in." });
  }
}

export default withApiSession(withMethodGuard({ methods: ["GET"], handler }));
