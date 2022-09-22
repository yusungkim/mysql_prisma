import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withMethodGuard from "@libs/server/withMethodGuard";
import bcrypt from "bcrypt";
import { withApiSession } from "@libs/server/withSession";

export type LoginResponse = {
  ok: boolean;
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
    select: {
      id: true,
      password: true,
    },
  });

  if (user) {
    const authenticated = bcrypt.compareSync(password, user.password);
    if (authenticated) {
      req.session.user = {
        id: user.id,
        admin: false,
      };
      await req.session.save();
      res.status(200).json({ ok: true });
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
