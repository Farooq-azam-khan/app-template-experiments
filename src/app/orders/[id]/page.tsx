import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

import { Button } from "@/components/ui/button";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY!);

async function get_order(order_id: number) {
  const order_and_items = await db.query.orders.findFirst({
    where: eq(orders.id, order_id),
    with: {
      orderItems: true,
    },
  });
  return order_and_items;
}
export default async function Order({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const order_id = (await params).id;
  const order = await get_order(+order_id);
  return (
    <div>
      {order_id}
      {order?.total}
      <form
        action={async () => {
          "use server";
          const product = await stripe.products.create({
            name: `order-id-${order_id}`,
            description: "meh...",
          });
          const price = await stripe.prices.create({
            unit_amount: (order?.total ?? 0) * 100, // in cents
            currency: "cad",
            product: product.id,
          });
          const checkout = await stripe.checkout.sessions.create({
            mode: "payment",
            success_url:
              "http://localhost:3000?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:3000",
            line_items: [product],
          });
          console.log({ price, checkout });
        }}
      >
        <Button type="submit">Purchase</Button>
      </form>
      <div className="space-y-3">
        {order?.orderItems.map((oi) => (
          <Card key={oi.id}>
            <CardHeader>
              <CardTitle>{oi.id}</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
