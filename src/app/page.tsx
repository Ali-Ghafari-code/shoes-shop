import Products from "./components/porducts/products";
import prisma from "@/lib/prisma";

export default async function HomePage() {
  const products = await prisma.shoe.findMany({
    include: {
      images: true,
      category: true,
    },
  });

  return (
    <div className="mt-20">
      <Products initialProducts={products} />
    </div>
  );
}
