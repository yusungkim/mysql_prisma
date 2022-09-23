import type { NextApiRequest, NextApiResponse } from "next";
import withMethodGuard from "@libs/server/withMethodGuard";
import { withApiSession } from "@libs/server/withSession";

export type LoginResponse = {
  ok: boolean;
  token?: string;
  message?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  req.session.destroy();
  res.status(200).json({ ok: false });
}

export default withApiSession(withMethodGuard({ methods: ["GET"], handler }));
