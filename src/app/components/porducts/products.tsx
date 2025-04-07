"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Shoe } from "@/types/shoe";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";

function Products() {
  const [products, setProducts] = useState<Shoe[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/shoes");
      const data: Shoe[] = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const activeProduct = products.length > 0 ? products[activeIndex] : null;

  useEffect(() => {
    if (activeProduct) {
      document.documentElement.style.setProperty(
        "--main-color",
        activeProduct.mainColor
      );
      document.documentElement.style.setProperty(
        "--secondary-color",
        activeProduct.secondaryColor
      );
    }
  }, [activeProduct]);

  return (
    <div className="relative h-[86vh] w-full flex flex-col items-center justify-between overflow-y-clip">
      <div className=" w-full">
        {activeProduct && activeProduct.images.length > 0 && (
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-around">
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="my-auto"
              >
                <h4>{activeProduct.name}</h4>
                <p>{activeProduct.description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  ease: "easeIn",
                  delay: 0.4,
                }}
                className="my-auto"
              >
                <Image
                  src={activeProduct.images[0].url}
                  alt={activeProduct.name}
                  width={400}
                  height={300}
                  className="object-cover rounded-lg"
                  unoptimized
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="my-auto"
              >
                <h3>قیمت: {activeProduct.price}</h3>
                <button
                  className="btn btn-primary"
                  style={{
                    color: "var(--secondary-color)",
                  }}
                >
                  اضافه کردن به سبد خرید
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: "easeIn",
          delay: 0.4,
        }}
        className="absolute bottom-2 left-0 w-full"
      >
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={3}
          navigation
          centeredSlides={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full"
        >
          {products.map((shoe, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center border p-4 rounded-lg shadow-md w-72 h-40 mx-auto">
                {shoe.images.length > 0 && (
                  <Image
                    src={shoe.images[0].url}
                    alt={shoe.name}
                    width={100}
                    height={80}
                    className="object-cover rounded-md"
                    unoptimized
                  />
                )}
                <h2
                  className="text-center"
                  style={{
                    color: "var(--secondary-color)",
                  }}
                >
                  {shoe.name}
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
}

export default Products;
