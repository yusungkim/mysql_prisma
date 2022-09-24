import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withMethodGuard from "@libs/server/withMethodGuard";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { TokenInfo } from "@libs/server/jwt";

export type SigninResponse = {
  ok: boolean;
  message?: string;
  user?: {
    uuid: string;
    email: string;
    nickname: string | null;
  };
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SigninResponse>
) {
  const {
    body: { email, password, nickname },
  } = req;

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: "Cannot create user." });
  }

  const alreadyRegistered = await client.user.findFirst({
    where: {
      email,
    },
    select: {
      uuid: true,
    },
  });

  if (alreadyRegistered && alreadyRegistered.uuid) {
    // Bad request. Already registered.
    res.status(400).json({ ok: false, message: "Cannot create user" });
  } else {
    const saltRounds = Number.parseInt(process.env.PASSWORD_SALT_ROUND || "10")
    const passwordHash = bcrypt.hashSync(password, saltRounds);
    const userInfo = {
      email,
      nickname,
      uuid: uuidv4(),
    }
    const user = await client.user.create({
      data: {
        ...userInfo,
        password: passwordHash,
      },
    });
    if (user) {
      res.status(201).json({ ok: true, user: userInfo });
    } else {
      res.status(500).json({ ok: false, message: "Cannot create user." });
    }
  }
}

export default withMethodGuard({ methods: ["POST"], handler });
