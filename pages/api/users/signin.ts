import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withMethodGuard from "@libs/server/withMethodGuard";
import bcrypt from "bcrypt";

export type SigninResponse = {
  ok: boolean;
  message?: string;
  userId?: number;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SigninResponse>
) {
  const {
    body: { email, password },
  } = req;

  const alreadyRegistered = await client.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (alreadyRegistered && alreadyRegistered.id) {
    // Bad request. Already registered.
    res.status(400).json({ ok: false, message: "Cannot create user" });
  } else {
    const saltRounds = Number.parseInt(process.env.PASSWORD_SALT_ROUND || "10")
    const passwordHash = bcrypt.hashSync(password, saltRounds);
    console.log("process.env.PASSWORD_SALT_ROUND! ", saltRounds);
    console.log("passwordHash ", passwordHash);
    const user = await client.user.create({
      data: {
        email,
        password: passwordHash,
      },
    });
    if (user) {
      res.status(201).json({ ok: true, userId: user.id });
    } else {
      res.status(500).json({ ok: false, message: "Cannot create user." });
    }
  }
}

export default withMethodGuard({ methods: ["POST"], handler });
