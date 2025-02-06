import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function GET() {
  try {
    const payments = await stripe.paymentIntents.list({ limit: 10 });
    return NextResponse.json(payments.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" });
  }
}
