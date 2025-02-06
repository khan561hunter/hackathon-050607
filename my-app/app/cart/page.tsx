"use client";

import { useState, useEffect } from "react";

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


interface Product {
  name: string;
  price: number;
  slug: string;
  imageUrl: string;
  _id: string;
  quantity: number;
}
export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  // Load the cart from localStorage when the page loads
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const HandleCheckout = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: cart, // Send the entire cart array
      }),
    });
  
    const data = await response.json();
  
    if (data.url) {
      // Listen for successful payment
      localStorage.setItem("checkout_pending", "true");
      window.location.href = data.url; // Redirect to Stripe checkout page
    } else {
      console.error("Checkout failed:", data.error);
    }
  
  };

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (localStorage.getItem("checkout_pending") === "true") {
        try {
          const response = await fetch("/api/checkpayment");
          const data = await response.json();
  
          console.log("Payment status response:", data);
  
          if (data.success) {
            console.log("✅ Payment successful! Clearing cart...");
            localStorage.removeItem("cart"); // ✅ Only clear if successful
            setCart([]); // ✅ Update React state
          } else {
            console.log("⚠️ Payment not completed. Keeping cart items.");
          }
  
          localStorage.removeItem("checkout_pending"); // Always remove flag
  
        } catch (error) {
          console.error("Failed to verify payment status:", error);
        }
      }
    };
  
    checkPaymentStatus();
  }, []);
   // Re-run effect when cart changes

  
  

  //A handle to add a product's quantity

  const HandleIncrease = (projectid : string) => {
    const updatedCart = cart.map((item) => 
      item._id === projectid ? {...item, quantity : item.quantity + 1} : item
    )
    setCart(updatedCart);
    localStorage.setItem("cart" , JSON.stringify(updatedCart));

  }





  //A handle to remove a product's quantity
  const HandleDecrease = (projectid : string) => {
    const updatedCart = cart.map((item) => 
      item._id === projectid && item.quantity > 1 ? {...item, quantity : item.quantity - 1} : item
    )
    setCart(updatedCart);
    localStorage.setItem("cart" , JSON.stringify(updatedCart));

  }

  // Function to add a product to the cart
  

  // Function to remove a product from the cart
  const handleRemoveFromCart = (ProductID: string) => {
    // const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Filter out the product that needs to be removed
    const updatedCart = cart.filter((item: Product) => item._id !== ProductID);

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart); // Update the state to trigger re-render
  };

  

  return (
    <main className="w-full bg-gradient-to-r from-gray-800 to-gray-400">
    <div className=" h-screen text-black bg-gradient-to-r from-gray-800 to-gray-400 max-w-[1440px] mx-auto flex flex-col gap-3 text-white">
      <h1 className="text-3xl font-bold glow  mb-4 mx-auto">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="mx-auto">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center mb-4 p-4 border-b border-black ">
              
              <div>
                <p>{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Original Price : ${item.price}</p>
                <p>Total Price: ${item.price * item.quantity}</p>
              </div>
              <QuantityControl
              quantity={item.quantity}
              onIncrease={() => {HandleIncrease(item._id)}}
              onDecrease={() => {HandleDecrease(item._id)}}
               />
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <button className="bg-black text-white md:py-2 md:px-4 rounded md:w-full md:mx-auto xs:px-2 xs:py-2 xs:w-[50%] xs:mx-auto" onClick={HandleCheckout}>
  CheckOut
</button>

    </div>
    
    </main>
  );
}