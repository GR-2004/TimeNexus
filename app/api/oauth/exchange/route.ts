import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/app/lib/nylas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await requireUser();
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json("No code found", { status: 400 });
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      code,
      clientId: nylasConfig.clientId,
      clientSecret: nylasConfig.apiKey,
      redirectUri: nylasConfig.redirectUri,
    });
    const { grantId, email } = response;

    await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        grantId,
        grantEmail: email,
      },
    });
  } catch (error: any) {
    console.log("Error something went wrong", error.message);
    return Response.json(error.message, { status: 400 });
  }

  redirect("/dashboard");
}
