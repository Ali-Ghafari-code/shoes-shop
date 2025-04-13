"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ProductDetailsProps = {
  name: string;
  category: string;
  imageUrl: string;
  price: number;
  description: string;
};

const ProductDetails = ({
  name,
  category,
  imageUrl,
  price,
  description,
}: ProductDetailsProps) => {
  return (
    <>
      <div className="relative h-[86vh] w-full flex items-center justify-around overflow-y-clp mt-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=""
        >
          {name}
          <p>{description}</p>
        </motion.h1>

        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Image
              src={imageUrl}
              alt={name}
              width={400}
              height={300}
              className="object-cover"
              unoptimized
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="my-auto"
        >
          <p>
            <strong>قیمت:</strong> {price} تومان
          </p>
          <p>
            <strong>دسته بندی:</strong> {category}
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center"
      >
        <Link href={""} className="btn -mt-20 btn-primary">
          اضافه کردن به سبد خرید
        </Link>
      </motion.div>
    </>
  );
};

export default ProductDetails;
