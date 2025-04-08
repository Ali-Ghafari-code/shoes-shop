"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shoe } from "@/types/shoe";

export default function CategoryClientView({ shoes }: { shoes: Shoe[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = shoes[activeIndex];

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
    <div className="relative h-[86vh] w-full flex flex-col items-center justify-between overflow-y-clip ">
      <div className="w-full">
        {activeProduct && activeProduct.images.length > 0 && (
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-around">
              <motion.div className="my-auto">
                <h4>{activeProduct.name}</h4>
              </motion.div>

              <motion.div className="my-auto">
                <Image
                  src={activeProduct.images[0].url}
                  alt={activeProduct.name}
                  width={400}
                  height={300}
                  className="object-cover rounded-lg"
                  unoptimized
                />
              </motion.div>

              <motion.div className="my-auto">
                <Link
                  href={`/preview/${activeProduct.id}`}
                  className="btn btn-primary"
                  style={{ color: "white" }}
                >
                  پیش‌نمایش محصول
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      <motion.div className="absolute bottom-2 left-0 w-full">
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
          {shoes.map((shoe, index) => (
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
                <h2 className="text-center">{shoe.name}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
}
