import { SignJWT } from 'jose';

// import { sendEmail } from '../core';
import config from '../config';

function generateToken(data: Record<string, unknown>, secret: string) {
  return new SignJWT(data)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('4h')
    .sign(new TextEncoder().encode(secret));
}

export async function main() {
  const res = await fetch(`https://workers.19981105.xyz/common/get-cos-auth?authKey=${config.COS_AUTH_KEY}`,  {
    headers: {
      'Authorization': `Bearer ${generateToken({}, config.COS_AUTH_KEY )}`
    }
  });
  const data = (await res.json()) as {
    data: unknown;
    code: number;
    msg: string;
  };
  if (data.code !== 0) {
    throw new Error('获取 COS 授权失败'+ JSON.stringify(data) )
    // await sendEmail('获取 COS 授权失败', JSON.stringify(data));
    return;
  }
  console.log('cos授权成功');
}

main();
