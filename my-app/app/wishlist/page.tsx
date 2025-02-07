"use client"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';

import { ImBin } from "react-icons/im";
interface Product {
    name: string;
    price: number;
    slug: string;
    imageUrl: string;
    _id: string;
    quantity: number;
  }
  interface QuantityControlProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
  }
  
  const QuantityControl: React.FC<QuantityControlProps> = ({ quantity, onIncrease, onDecrease }) => {
    return (
      <div className="flex items-center space-x-2">
        <button
          className="bg-gray-400 text-white px-2 py-1 rounded disabled:opacity-50"
          onClick={onDecrease}
          disabled={quantity <= 1} // Prevent decreasing below 1
        >
          -
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button
          className="bg-gray-800 text-white px-2 py-1 rounded"
          onClick={onIncrease}
        >
          +
        </button>
      </div>
    );
  };

export default function Wishlist(){


    const notify = () => toast("Added to Cart");

    const[Wishlist , setWishlist] = useState<Product[]>([]);

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlist(savedWishlist);
    },[]);

    const HandleIncrease = (projectid : string) => {
        const updatedCart = Wishlist.map((item) => 
          item._id === projectid ? {...item, quantity : item.quantity + 1} : item
        )
        setWishlist(updatedCart);
        localStorage.setItem("cart" , JSON.stringify(updatedCart));
    
      }
    
    
    
    
    
      //A handle to remove a product's quantity
      const HandleDecrease = (projectid : string) => {
        const updatedCart = Wishlist.map((item) => 
          item._id === projectid && item.quantity > 1 ? {...item, quantity : item.quantity - 1} : item
        )
        setWishlist(updatedCart);
        localStorage.setItem("cart" , JSON.stringify(updatedCart));
    
      }

    const HandleAddtoCart = (ProductID: string , notify: () => void) => {
        // Retrieve the current cart from local storage or initialize it as an empty array
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    
        // Find the product to add to the cart
        const productToAdd = Wishlist.find((item: Product) => item._id === ProductID);
        
        if (productToAdd) {
            // Check if the product is already in the cart
            const productIndex = cart.findIndex((item: Product) => item._id === ProductID);
    
            if (productIndex === -1) {
                cart.push({...productToAdd, quantity: productToAdd.quantity});
            }
            else{
                cart[productIndex].quantity += productToAdd.quantity;
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            notify();
        }
    
        // (Optional) Remove the product from the wishlist
        
    };

    const HandleRemove = (ProductID: string) => {
        const updatedWishlist = Wishlist.filter((item: Product) => item._id !== ProductID);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
    


    return(
        <main className="w-full bg-gradient-to-r from-gray-800 to-gray-400 h-screen text-white">
            <h1>Wishlist</h1>
            {Wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="bg-gradient-to-r from-gray-800 to-gray-400 h-screen">
                    {Wishlist.map((item) => (
                        <div key={item._id} className="flex justify-between items-center mb-4 p-4 border-b border-white ">
                            <div>
                            <h2>{item.name}</h2>
                            <p>Quantity: {item.quantity}</p>
                            <p>Original Price : ${item.price}</p>
                            <p>Total Price: ${item.price * item.quantity}</p>
                            </div>
                            <QuantityControl
                            quantity={item.quantity}
                            onIncrease={() => {HandleIncrease(item._id)}}
                            onDecrease={() => {HandleDecrease(item._id)}}
                            />

                            <div className="md:flex md:gap-6 xs:flex xs:flex-col xs:gap-4 xs:p-3">
                                <button
                                        onClick={() => HandleRemove(item._id)}
                                        className=" text-white py-2 px-4 rounded"
                                        >
                                        <ImBin className="fill-red bg-red"/>
                                </button>
                               
                               <button onClick={() => {HandleAddtoCart(item._id , notify)}} className="bg-blue-500 text-white py-2 px-4 rounded">Add to cart</button>
                               <ToastContainer />
                            </div>
                        </div>

                        
                        
                    ))}
                </div>
            )}
        </main>
    )
}