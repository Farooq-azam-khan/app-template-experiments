import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { format } from "date-fns";

async function get_products(product_id: number) {
  const product_data = await db.query.products.findFirst({
    where: eq(products.id, product_id),
    with: {
      productReviews: {
        with: {
          customer: true,
        },
      },
    },
  });
  return product_data;
}

export default async function Product({ params }: { params: { id: string } }) {
  const product_data = await get_products(+params.id);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product_data?.name}</CardTitle>
        <CardDescription className="">
          {product_data?.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {product_data?.productReviews.map((pr) => {
            return (
              <div key={pr.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-x-3">
                    <div>{pr.customer.name}</div>
                    <div className="text-gray-400 text-sm">
                      {format(pr.createdAt, "yyyy-mm-dd")}
                    </div>
                  </div>
                  <div className="flex gap-x-1">
                    <span>{pr.rating}</span>
                    <span className="text-gray-400 text-xl">/</span>
                    <span className="text-gray-500 text-md">100</span>
                  </div>
                </div>
                <p className="text-gray-800">{pr.review}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
