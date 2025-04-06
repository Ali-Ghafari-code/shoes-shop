import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  const shoes = await prisma.shoe.findMany({
    include: {
      category: true,
      images: true,
    },
  });

  return NextResponse.json(shoes);
}


export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const categoryId = formData.get("categoryId") as string;
    const mainColor = formData.get("mainColor") as string; // دریافت رنگ اصلی
    const secondaryColor = formData.get("secondaryColor") as string; // دریافت رنگ فرعی
    const sizes = formData.get("sizes")
      ? formData
          .get("sizes")
          ?.toString()
          .split(",")
          .map((size) => ({ size: parseInt(size) }))
      : [];
    const existing = formData.get("existing") === "true";
    const image = formData.get("image") as File;

    let imageUrl = "";

    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filePath = join(process.cwd(), "public/uploads", image.name);
      await writeFile(filePath, buffer); // ذخیره عکس در `public/uploads`

      imageUrl = `/uploads/${image.name}`;
    }

    const newShoe = await prisma.shoe.create({
      data: {
        name,
        description,
        price,
        categoryId,
        mainColor,
        secondaryColor,
        sizes: {
          create: sizes,
        },
        existing,
        images: imageUrl
          ? {
              create: [{ url: imageUrl }],
            }
          : undefined,
      },
    });

    return NextResponse.json(newShoe, { status: 201 });
  } catch (error) {
    console.error("❌ خطا در ذخیره کفش:", error);
    return NextResponse.json({ error: "خطا در ذخیره کفش" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json(); // دریافت ID از body

    if (!id) {
      return NextResponse.json({ error: "شناسه نامعتبر است" }, { status: 400 });
    }

    await prisma.shoe.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "کفش با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ خطا در حذف کفش:", error);
    return NextResponse.json({ error: "خطا در حذف کفش" }, { status: 500 });
  }
}
