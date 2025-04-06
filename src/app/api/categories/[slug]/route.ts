import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: params.slug },
      include: { shoes: true },
    });

    if (!category) {
      return NextResponse.json({ error: "دسته‌بندی پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("خطا در دریافت محصولات دسته:", error);
    return NextResponse.json({ error: "خطا در دریافت محصولات" }, { status: 500 });
  }
}
