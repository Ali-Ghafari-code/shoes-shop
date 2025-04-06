import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getPaletteFromURL } from "color-thief-node";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) return NextResponse.json({ error: "تصویری ارسال نشده." }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // مسیر جدید برای ذخیره‌سازی فایل در public/uploads
    const uploadDir = path.join("D:", "assets", "Shop", "shop", "public", "uploads");
    const tempPath = path.join(uploadDir, file.name);

    await fs.writeFile(tempPath, buffer);
    console.log("📥 فایل در این آدرس ذخیره شد:", tempPath);

    const palette = await getPaletteFromURL(`${tempPath}`, 2);

    const hexColors = palette.map(([r, g, b]) =>
      `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
    );

    await fs.unlink(tempPath);

    return NextResponse.json({ colors: hexColors });
  } catch (error) {
    console.error("❌ خطا در API:", error);
    return NextResponse.json({ error: "خطا در پردازش تصویر" }, { status: 500 });
  }
}
