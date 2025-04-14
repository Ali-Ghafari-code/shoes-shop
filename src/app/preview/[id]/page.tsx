import { notFound } from "next/navigation";
import ProductDetails from "@/app/preview/components/Product/ProductDetails";

type Params = {
  params: { id: string };
};

export default async function ProductPreview({ params }: Params) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/shoes/${params.id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return notFound();

  const product = await res.json();

  // Check if category is available, otherwise use a default message
  const categoryName = product.category
    ? product.category.name
    : "دسته بندی نامشخص";

  return (
    <ProductDetails
      name={product.name}
      category={categoryName}
      imageUrl={product.images.map((img: any) => img.url)}
      price={product.price}
      description={product.description}
    />
  );
}
