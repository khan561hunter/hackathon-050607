"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';



interface Product {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  slug: string;
  _id: string;
}

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductsDetails({ params }: Props) {
  const [products, setProducts] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false); // New state for handling "not found" cases
  const notify = () => toast("Added to Cart");
  const notify2 = () => toast("Added to Wishlist");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(
        `*[_type == "product" && slug.current == "${params.slug}"]{
          name,
          price,
          description,
          "imageUrl": imageUrl.asset->url,
          "slug": slug.current,
          _id
        }`
      );

      if (data.length > 0) {
        setProducts(data[0]);
        setNotFound(false); // Product found
      } else {
        setNotFound(true); // Product not found
      }
      console.log("Fetched Data:", data); 
    };
    fetchProducts();
  }, [params.slug]);

  if (notFound) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-red-100 text-red-600 text-xl font-bold"
        data-cy="product-not-found"
      >
        Product not found
      </div>
    );
  }
  if (!products) return <div>Loading...</div>;

  const handleAddToCart = (product: Product , notify: () => void) => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingProduct = savedCart.find((item: Product) => item._id === product._id);

      if (existingProduct) {
        existingProduct.quantity += 1;
        
      } else {
        savedCart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(savedCart));
      notify();
      
    } catch (error) {
      console.error("Error updating cart:", error);
      
    }
  };

  const handleWishlist = (product: Product , notify2: () => void) => {
    try {
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const existingProduct = savedWishlist.find((item: Product) => item._id === product._id);

      if (existingProduct) {
        existingProduct.quantity += 1;
        
      } else {
        savedWishlist.push({ ...product, quantity: 1 });
        
      }

      localStorage.setItem("wishlist", JSON.stringify(savedWishlist));
      notify2();
    } catch (error) {
      
      console.error("Error updating wishlist:", error);
      
    }
  };

  return (
    <main>
      <div className="w-full bg-gradient-to-r from-gray-800 to-gray-400">
        <div className="max-w-[1440px] mx-auto bg-gradient-to-r from-gray-800 to-gray-400 min-h-screen flex items-center justify-center px-4 ">
          <div className="w-full max-w-[1000px] bg-white shadow-2xl rounded-2xl p-6 my-6">
            <div className="flex flex-col md:flex-row justify-between items-center my-6 gap-6">
              {/* Image Section */}
              <Image
                src={products.imageUrl}
                alt={products.name}
                width={600}
                height={600}
                className="h-auto max-w-full rounded-lg border-2 border"
              />

              {/* Product Details */}
              <div className="p-6 md:p-12 grid gap-5 text-gray-800 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold">{products.name}</h1>
                <p className="text-sm md:text-lg">{products.description}</p>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(products , notify)}
                   
                    className="p-4 w-full md:w-[170px] bg-gradient-to-r from-teal-600 to-purple-700 rounded-full text-white font-bold"
                  >
                    Add to Cart
                  </button>
                  <ToastContainer />

                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleWishlist(products , notify2)}
                    className="p-4 w-full md:w-[170px] bg-gradient-to-r from-teal-600 to-purple-700 rounded-full text-white font-bold"
                  >
                    Wishlist
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
}