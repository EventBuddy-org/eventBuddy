import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  try {
    const { chatId, email } = body;
  
    const user = await prisma.user.findUnique({
      where: {
        email:"hellotushar67@gmail.com",
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        updatedUser:"",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
