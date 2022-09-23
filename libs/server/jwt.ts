const jwt = require("jsonwebtoken");
const Cryptr = require("cryptr");

const secret = process.env.JWT_SECRET; // for jwt create / verify
const cipherKey = process.env.JWT_CIPHER_SECRET; // for encrypt / decrypt
const cryptr = new Cryptr(cipherKey);

export interface TokenInfo {
  userId: number;
  nickname?: string | null;
  email: string;
}

interface JwtReturnType {
  ok: boolean;
  userInfo?: TokenInfo;
}

export function sign(userInfo: TokenInfo): string {
  // encrypt for futher security
  const encryptedUserInfo = cryptr.encrypt(JSON.stringify(userInfo));

  // create token
  const token = jwt.sign(
    {
      data: { encryptedUserInfo },
    },
    secret,
    { expiresIn: "24h" }
  );
  return token;
}

export function verify(token: string): JwtReturnType {
  try {
    const {
      data: { encryptedUserInfo },
    } = jwt.verify(token, secret);
    const userInfo = JSON.parse(cryptr.decrypt(encryptedUserInfo));
    return {
      ok: true,
      userInfo,
    };
  } catch (err) {
    console.log(err);
    return { ok: false };
  }
}
