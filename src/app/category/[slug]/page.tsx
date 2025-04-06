import { notFound } from "next/navigation";
import Image from "next/image";
import prisma from "@/lib/prisma";

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
    <div className="relative p-6">
      <h1 className="text-2xl font-bold">{category.name}</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {category.shoes.map((shoe) => (
          <div key={shoe.id} className="border p-4 rounded-lg shadow-md">      
            {shoe.images.length > 0 && (
              <Image
                src={shoe.images[0].url}
                alt={shoe.name}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-md"
                unoptimized 
              />
            )}
            <h2 className="text-lg font-semibold mt-2">{shoe.name}</h2>
            <p>{shoe.description}</p>
            <p className="text-gray-600">{shoe.price} تومان</p>
          </div>
        ))}
      </div>
    </div>
  );
}
