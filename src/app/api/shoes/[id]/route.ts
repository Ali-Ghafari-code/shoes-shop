// app/api/shoes/[id]/route.ts (برای App Router)
import { NextResponse } from "next/server"; // برای App Router
import { prisma } from "@/lib/prisma"; // مسیر اتصال Prisma
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // گرفتن محصول از دیتابیس با Prisma
  const product = await prisma.shoe.findUnique({
    where: { id },
    include: { images: true }, // تصاویر محصول رو هم دریافت می‌کنیم
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 }); // اگر محصول پیدا نشد
  }

  return NextResponse.json(product); // ارسال داده‌های محصول
}
