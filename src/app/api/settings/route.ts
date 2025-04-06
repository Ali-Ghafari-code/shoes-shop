import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("خطا در دریافت تنظیمات سایت:", error);
    return NextResponse.json({ error: "خطا در دریافت تنظیمات سایت" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {  theme } = await req.json();

    const existingSettings = await prisma.siteSettings.findFirst();

    let updatedSettings;
    if (existingSettings) {
      updatedSettings = await prisma.siteSettings.update({
        where: { id: existingSettings.id },
        data: { theme },
      });
    } else {
      updatedSettings = await prisma.siteSettings.create({
        data: { theme },
      });
    }

    return NextResponse.json(updatedSettings, { status: 201 });
  } catch (error) {
    console.error("خطا در ذخیره تنظیمات:", error);
    return NextResponse.json({ error: "خطا در ذخیره تنظیمات" }, { status: 500 });
  }
}
