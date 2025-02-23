import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  chatId: z.string(),
  token: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { chatId, token } = bodySchema.parse(body);

  const user = await prisma.user.update({
    where: {
      id: token,
    },
    data: {
      telegramChatId: chatId,
    },
  });

  return NextResponse.json(
    {
      user,
    },
    {
      status: 200,
    }
  );
}
