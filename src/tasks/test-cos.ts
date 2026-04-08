import { sendEmail } from "../core";
import config from "../config";

export async function main() {
  const res = await fetch(
    `https://workers.19981105.xyz/common/get-cos-auth?authKey=${config.COS_AUTH_KEY}`,
  );
  const data = (await res.json()) as {
    data: unknown;
    code: number;
    msg: string;
  };
  if (data.code !== 0) {
    await sendEmail("获取 COS 授权失败", JSON.stringify(data));
    return;
  }
  console.log("cos授权成功");
}

main();
