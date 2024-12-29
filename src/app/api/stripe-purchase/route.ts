import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe_account = new Stripe(process.env.STRIPE_KEY!);
export async function POST() {
  const product = await stripe_account.products.create({
    name: "Starter Subscription",
    description: "$12/Month subscription",
  });
  const price = await stripe_account.prices.create({
    unit_amount: 1200,
    currency: "cad",
    product: product.id,
  });
  console.log({ price, product });
  return NextResponse.json({
    message:
      "Success! Here is your starter subscription product id: " + product.id,
  });
}
