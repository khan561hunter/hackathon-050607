"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { client } from "@/sanity/lib/client";

export default function Page_Two2() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "product"]{
        _id,
        name,
        colors,
        price,
        "imageUrl": imageUrl.asset->url,
        "slug" :slug.current,
        description,
        discountPercent,
      }`)
      .then((result) => setData(result))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const cardVariants = {
    hidden: { opacity: 1, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="bg-gray-500">
      
      <div className="md:grid md:grid-cols-3 md:gap-9 md:mx-auto md:max-w-[1440px] md:p-12 xs:p-4 xs:py-9 xs:flex xs:grid xs:grid-cols-1 gap-7 w-full max-w-xl p-6">
        {data.map((value: any, index: number) => (
            
          <motion.div
            key={value._id}
            className="w-full max-w-sm border border-gray-200 rounded-lg bg-white shadow-lg scale-50 "
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
            variants={cardVariants}
          >
            
            <div className="object-fill">
              <Image
                className="p-8 rounded-t-lg object-fill HoverEffect"
                src={value.imageUrl}
                alt={value.name}
                width={500}
                height={500}
              />
            </div>
            
            
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                  {value.name}
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4 ? "text-yellow-300" : "text-gray-200"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
                  5.0
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 flex gap-4">
                  ${value.price}
                  <div>
              {value.discountPercent > 0 && (
                <h1 className="text-red-400 text-md">{value.discountPercent}%</h1>
              )}
            </div>
                </span>
                <Link href={`/products/${value.slug}`} key={value._id}>
                  <div className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    View Product
                  </div>
                </Link>
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
}