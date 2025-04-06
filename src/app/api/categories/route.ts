import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify"; // اضافه کردن کتابخانه‌ی slugify

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("خطا در دریافت دسته‌بندی‌ها:", error);
    return NextResponse.json(
      { error: "خطا در دریافت دسته‌بندی‌ها" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, slug } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "نام دسته‌بندی الزامی است" },
        { status: 400 }
      );
    }

    // اگر کاربر `slug` وارد نکرده بود، خودکار مقدار دهی شود
    const finalSlug = slug?.trim()
      ? slug.trim().toLowerCase()
      : slugify(name, { lower: true, strict: true });

    const newCategory = await prisma.category.create({
      data: { name, slug: finalSlug },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("خطا در ذخیره دسته‌بندی:", error);
    return NextResponse.json(
      { error: "خطا در ذخیره دسته‌بندی" },
      { status: 500 }
    );
  }
}
