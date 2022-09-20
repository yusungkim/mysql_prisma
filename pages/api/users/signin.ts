import type { NextApiRequest, NextApiResponse } from "next";

import client from "@libs/server/client";
import withMethodGuard from "@libs/server/withMethodGuard";
import bcrypt from 'bcrypt';

type SigninResponse = {
  ok: boolean;
  message?: string;
  userId?: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<SigninResponse>) {
  const {
    body: { email, password },
  } = req;

  const alreadyRegistered = await client.user.findFirst({
    where: {
      email
    },
    select: {
      id: true
    }
  })
  
  if (alreadyRegistered && alreadyRegistered.id) {
    // Bad request. Already registered.
    res.status(400).json({ ok: false, message: 'Cannot create user' });
  } else {
    const saltRound = Number.parseInt(process.env.PASSWORD_SALT_ROUND!) || 21;
    console.log("process.env.PASSWORD_SALT_ROUND! ", saltRound)
    bcrypt.hash(password, saltRound, async function(err, passwordHash) {
      console.log("passwordHash ", passwordHash)
      const user = await client.user.create({
        data: {
          email,
          password: passwordHash
        }
      })
      if (err || !user) {
        console.log(err);
        res.status(500).json({ ok: false, message: 'Cannot create user' });
      }
      res.status(201).json({ ok: true, userId: user.id.toString()});
    });
  }
}

export default withMethodGuard({ methods: ["POST"], handler });
