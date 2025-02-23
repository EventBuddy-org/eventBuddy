import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); // Parse the request body

    console.log({ body });

    return NextResponse.json({ error: false });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: true, message: "Invalid request body" },
      { status: 400 }
    );
  }
};
