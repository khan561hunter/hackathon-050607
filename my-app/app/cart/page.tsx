"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        className="bg-gray-400 text-white px-2 py-1 rounded disabled:opacity-50"
        onClick={onDecrease}
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="text-lg font-semibold">{quantity}</span>
      <button className="bg-gray-800 text-white px-2 py-1 rounded" onClick={onIncrease}>
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
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);

  // Load the cart from localStorage when the page loads
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const HandleCheckout = async () => {
    setOpen(true); // Open the modal first

    setTimeout(async () => {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: cart }),
      });

      const data = await response.json();

      if (data.url) {
        localStorage.setItem("checkout_pending", "true");
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        console.error("Checkout failed:", data.error);
      }
    }, 3000); // Show the modal for 3 seconds before redirecting
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
            localStorage.removeItem("cart");
            setCart([]);
          } else {
            console.log("⚠️ Payment not completed. Keeping cart items.");
          }

          localStorage.removeItem("checkout_pending");
        } catch (error) {
          console.error("Failed to verify payment status:", error);
        }
      }
    };

    checkPaymentStatus();
  }, []);

  const HandleIncrease = (productId: string) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const HandleDecrease = (productId: string) => {
    const updatedCart = cart.map((item) =>
      item._id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <main className="w-full bg-gradient-to-r from-gray-800 to-gray-400">
      <div className="h-screen text-black bg-gradient-to-r from-gray-800 to-gray-400 max-w-[1440px] mx-auto flex flex-col gap-3 text-white">
        <h1 className="text-3xl font-bold glow mb-4 mx-auto">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="mx-auto">Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center mb-4 p-4 border-b border-black"
              >
                <div>
                  <p>{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Original Price: ${item.price}</p>
                  <p>Total Price: ${item.price * item.quantity}</p>
                </div>
                <QuantityControl
                  quantity={item.quantity}
                  onIncrease={() => HandleIncrease(item._id)}
                  onDecrease={() => HandleDecrease(item._id)}
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

        <button
          className="bg-black text-white py-2 px-4 rounded w-full mx-auto"
          onClick={HandleCheckout}
        >
          Checkout
        </button>

        {/* Modal for Order Processing */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={style}>
            <div className="flex flex-col gap-4">
             

              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className="text-center text-3xl font-bold">
                  <p>Order Processing...</p>
                </div>
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="text-center text-gray-500">
                  <p>
                    Please wait while we process your order. You will be redirected to the
                    payment screen shortly.
                  </p>
                </div>
              </Typography>
            </div>
          </Box>
        </Modal>
      </div>
    </main>
  );
}
