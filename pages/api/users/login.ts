import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withMethodGuard from "@libs/server/withMethodGuard";
import bcrypt from "bcrypt";
import { withApiSession } from "@libs/server/withSession";
import { sign } from "@libs/server/jwt";

export type LoginResponse = {
  ok: boolean;
  token?: string;
  message?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  const {
    body: { email, password },
  } = req;

  const user = await client.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    const authenticated = bcrypt.compareSync(password, user.password);
    if (authenticated) {
      // issue jwt, which does not require db access
      const token = sign({
        userId: user.id,
        email: user.email,
        nickname: user.nickname,
      });
      // session (in cookie) save
      req.session.user = {
        id: user.id,
        token: token,
        admin: false,
      };
      await req.session.save();
      res.status(200).json({ ok: true, token });
    } else {
      res
        .status(400)
        .json({ ok: false, message: "Email or Password is not correct." });
    }
  } else {
    res
      .status(400)
      .json({ ok: false, message: "Email or Password is not correct." });
  }
}

export default withApiSession(withMethodGuard({ methods: ["POST"], handler }));
