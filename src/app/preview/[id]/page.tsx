import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from 'framer-motion';
import Link from "next/link";

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

  const images = product.images || [];

  return (
    <div className="relative p-6 space-y-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.length > 0 ? (
                images.map((img: { url: string }, idx: number) => (
                  <Image
                    key={idx}
                    src={img.url}
                    alt={`عکس ${idx + 1}`}
                    width={300}
                    height={300}
                    className="rounded-lg object-cover"
                    unoptimized
                  />
                ))
              ) : (
                <p>تصویری برای نمایش موجود نیست</p>
              )}
            </div>
          </motion.div>

          {/* Right: Product Details */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 space-y-6"
          >
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-lg text-gray-700">{product.description}</p>
            <h3 className="text-xl font-semibold">قیمت: {product.price.toLocaleString()} تومان</h3>

            {/* Dropdown for selecting size */}
            <div className="flex flex-col gap-2 w-64">
              <label htmlFor="size" className="text-right font-medium">انتخاب سایز:</label>
              {/* Add your size dropdown options here */}
            </div>

            <Link
              href={`/preview/${product.id}`}
              passHref
            >
              <motion.button
                className="w-full md:w-auto mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                پیش‌نمایش محصول
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
