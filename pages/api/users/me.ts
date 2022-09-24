import type { NextApiRequest, NextApiResponse } from "next";
import withMethodGuard from "@libs/server/withMethodGuard";
import { withApiSession } from "@libs/server/withSession";
import { sign, verify } from "@libs/server/jwt";

export type VerifiedUserResponse = {
  ok: boolean;
  user?: {
    uuid: string;
    email?: string;
    nickname: string | null;
  };
  message?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifiedUserResponse>
) {
  const token = req.session.token;
  const { query: { detail } } = req;

  if (!token) {
    return res.status(400).json({ ok: false, message: "Please Log in." });
  }

  // authenticate user
  const { ok, user } = verify(token);

  if (ok && user) {
    // re-issue token (updating expiry timeout)
    const newToken = sign(user);

    // refresh session
    req.session.token = newToken;
    await req.session.save();   

    // if requested, add detail info from db.
    let userInfo = user;
    if (detail === "include") {
      const userDetail = await client?.user.findFirst({
        where: {
          uuid: user.uuid,
        },
        select: {
          email: true,
        }
      })
      userInfo = {...userInfo, ...userDetail};
    }
    
    res.status(200).json({
      ok: true,
      user: userInfo
    });
  } else {
    res.status(400).json({ ok: false, message: "Please Log in." });
  }
}

export default withApiSession(withMethodGuard({ methods: ["GET"], handler }));
