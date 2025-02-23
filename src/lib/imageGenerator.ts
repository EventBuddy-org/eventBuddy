"use server";
export async function generateImage(data: {
  title: string;
  description: string;
  theme: string;
}) {
  const prompt = data.title;
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
      body: JSON.stringify({
        prompt,
      }),
    },
  );
  const json = await res.json();
  const dataURI = `data:image/jpeg;charset=utf-8;base64,${json.result.image}`;

  return dataURI;
}
