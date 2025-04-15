"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ProductDetailsProps = {
  name: string;
  category: string;
  imageUrl: string[];
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageUrl.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // هر ۳ ثانیه یکبار

    return () => clearInterval(interval);
  }, [imageUrl]);

  return (
    <>
      <div className="relative h-[86vh] w-full flex items-center justify-around overflow-y-clp mt-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=""
        >
          <h1>{name}</h1>
          <p>{description}</p>
        </motion.div>

        {imageUrl.length > 0 && (
          <motion.div
            key={currentImageIndex} // مهم برای اجرای انیمیشن هنگام تعویض عکس
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Image
              src={imageUrl[currentImageIndex]}
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
