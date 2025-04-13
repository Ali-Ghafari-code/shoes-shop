// app/api/shoes/[id]/route.ts
import { NextResponse } from "next/server"; 
import { prisma } from "@/lib/prisma"; 
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch product and category details
  const product = await prisma.shoe.findUnique({
    where: { id },
    include: {
      images: true, // Include images of the product
      category: true, // Include the category related to the shoe
    },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 }); // If the product is not found
  }

  return NextResponse.json(product); // Return the product with category details
}
