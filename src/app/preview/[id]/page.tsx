import { notFound } from "next/navigation";
import Image from "next/image";

async function getProduct(id: string) {
  const res = await fetch(`http://localhost:3000/api/shoes/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPreviewPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) return notFound();

  return (
    <div className="relative p-6 space-y-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <h3 className="text-lg">قیمت: {product.price}</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {product.images.map((img: { url: string }, idx: number) => (
          <Image
            key={idx}
            src={img.url}
            alt={`عکس ${idx + 1}`}
            width={300}
            height={300}
            className="rounded-lg object-cover"
            unoptimized
          />
        ))}
      </div>
    </div>
  );
}
