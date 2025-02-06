import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string);

// POST handler
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { products } = body; // Expect an array of products

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((product: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.imageUrl], // ✅ Fix: Use images inside product_data
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity, // ✅ Fix: No misplaced `imageUrl`
      })),
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error.message); // ✅ Logs error in the server
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
