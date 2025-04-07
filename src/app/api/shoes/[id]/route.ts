// app/api/shoes/[id]/route.ts یا pages/api/shoes/[id].ts

import { NextResponse } from "next/server"; // برای App Router
// یا: import type { NextApiRequest, NextApiResponse } from 'next' برای Pages Router
import { prisma } from "@/lib/prisma"; // مسیر اتصال Prisma
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const product = await prisma.shoe.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
