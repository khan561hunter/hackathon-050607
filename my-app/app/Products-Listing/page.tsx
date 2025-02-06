"use client";
import { client } from "@/sanity/lib/client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Product = {
  _id: string;
  name: string;
  colors: string[];
  price: number;
  imageUrl: string;
  slug: string;
  description: string;
  discountPercent: number;
};

const FilterableProductList: React.FC = () => {
  const [searchitem, setSearchitem] = useState(""); // Moved useState inside the component
  const [Filter, setFilter] = useState<Product[]>([]); // Moved useState inside the component
  const [products, setProducts] = useState<Product[]>([]);
  const [categories] = useState<string[]>([
    "tshirt",
    "short",
    "jeans",
    "hoodie",
    "shirt",
  ]);
  const [colors, setColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product" 
        ${selectedCategory ? `&& category == $category` : ""} 
        ${colors.length > 0 ? `&& colors[] match $colors` : ""}]{
          _id,
          name,
          colors,
          price,
          "imageUrl": imageUrl.asset->url,
          "slug": slug.current,
          description,
          discountPercent
        }`;
  
      const params: Record<string, any> = {};
      if (selectedCategory) params.category = selectedCategory;
      if (colors.length > 0) params.colors = colors;
  
      try {
        const data = await client.fetch(query, params);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
  
    fetchProducts();
  }, [selectedCategory, colors]);

  // Handle search logic
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchitem(value);

    // Apply filtering to the products
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setFilter(filteredProducts);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <div className="bg-gradient-to-r from-gray-800 to-gray-400 flex flex-col items-center p-8 text-black">
      <div className="bg-white w-full max-w-xl p-6 m-2 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <div className="mb-4">
          <div className="flex justify-between my-6">
            <h2 className="text-lg font-semibold">Filter by Category</h2>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Search products"
                value={searchitem}
                onChange={handleSearch}
              />
              <button
                className="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Search
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category === "All" ? null : category)
                }
                className={`px-4 py-2 rounded border ${
                  selectedCategory === category
                    ? "bg-gray-300 border-gray-500"
                    : "bg-white border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Filter by Colors</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Red", "Blue", "Green", "White", "Black", "Yellow"].map((color) => (
              <button
                key={color}
                style={{
                  backgroundColor: color.toLowerCase(),
                  color: color === "White" ? "black" : "white",
                }}
                className={`px-4 py-2 rounded ${
                  colors.includes(color)
                    ? "ring-2 ring-offset-2 ring-black"
                    : "opacity-80"
                }`}
                onClick={() =>
                  setColors((prevColors) =>
                    prevColors.includes(color)
                      ? prevColors.filter((c) => c !== color)
                      : [...prevColors, color]
                  )
                }
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mt-6 max-w-6xl w-full sm:grid-cols-2">
        {(searchitem ? Filter : products).map((product, index) => (
          <motion.div
            key={product._id}
            className="w-full max-w-sm border border-gray-200 rounded-lg bg-white shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
            variants={cardVariants}
          >
            <Image
              className="p-8 rounded-t-lg"
              src={product.imageUrl}
              alt={product.name}
              width={500}
              height={500}
            />
            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                {product.name}
              </h5>
              <div className="flex items-center mt-2.5 mb-5">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
                  5.0
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                  {product.discountPercent > 0 && (
                    <span className="text-red-400 text-sm ml-2">
                      {product.discountPercent}% off
                    </span>
                  )}
                </span>
                <Link href={`/products/${product.slug}`} key={product._id}>
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
};

export default FilterableProductList;
