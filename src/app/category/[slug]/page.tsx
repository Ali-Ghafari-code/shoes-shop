import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import CategoryClientView from "../components/CategoryClientView";
import { div } from "framer-motion/client";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      shoes: {
        include: { images: true },
      },
    },
  });

  if (!category) return notFound();

  return (
    <div className="relative text-center mt-20 w-full">
      <CategoryClientView shoes={category.shoes} />
    </div>
  );
}
