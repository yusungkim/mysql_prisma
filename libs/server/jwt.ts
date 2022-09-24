const jwt = require("jsonwebtoken");
// const Cryptr = require("cryptr");

const secret = process.env.JWT_SECRET; // for jwt create / verify
// const cipherKey = process.env.JWT_CIPHER_SECRET; // for encrypt / decrypt
// const cryptr = new Cryptr(cipherKey);

export interface TokenInfo {
  uuid: string;
  nickname: string | null;
}

interface JwtReturnType {
  ok: boolean;
  user?: TokenInfo;
}

export function sign(user: TokenInfo): string {
  // encrypt for futher security
  // const encryptedUser = cryptr.encrypt(JSON.stringify(user));

  // create token
  const token = jwt.sign(
    {
      data: { user },
    },
    secret,
    { expiresIn: "1h" }
  );
  return token;
}

export function verify(token: string): JwtReturnType {
  try {
    const {
      data: { user },
    } = jwt.verify(token, secret);
    // const user = JSON.parse(cryptr.decrypt(encryptedUserInfo)) as TokenInfo;
    return {
      ok: true,
      user,
    };
  } catch (err) {
    console.log(err);
    return { ok: false };
  }
}
