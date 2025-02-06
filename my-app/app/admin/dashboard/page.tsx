"use client";
import {client} from "@/sanity/lib/client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await client.fetch(`*[_type == "product"]`);
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="mx-auto">
        
        <div className="  text-nowrap mx-auto my-12 flex items-center justify-evenly">
            <p className="text-4xl font-bold p-2">Welcome to Admin's Dashboard</p>
            <div className="flex gap-7 font-bold text-lg ">
            <Link href={"/"} className="hover:underline">Home</Link>
            <Link href={"/admin/orders"} className="hover:underline">Orders</Link>
            </div>
            
       
      
                
           
        </div>
        <div className="text-2xl font-bold p-2 w-[700px] text-nowrap">
            <p>All Products :</p>
        </div>
      
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">${product.price}</td>
              <td className="border p-2">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
