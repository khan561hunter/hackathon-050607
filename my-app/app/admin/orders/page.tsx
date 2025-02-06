"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  amount_total: number;
  status: string;
}

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  return (
    <div className="p-5">
        <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <Link href={"/admin/dashboard"}><p>Back to Home</p></Link>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">${order.amount_total / 100}</td>
              <td className="border p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
