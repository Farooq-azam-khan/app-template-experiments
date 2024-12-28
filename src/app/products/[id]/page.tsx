import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { productReviews, products } from "@/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";
import { format } from "date-fns";
import { redis } from "@/db/index";

type ProductModel = InferSelectModel<typeof products> & {
  productReviews: InferSelectModel<typeof productReviews>;
};

async function get_products(product_id: number) {
  const cached_products_page_page_data: ProductModel | null = await redis.get(
    `/prodcuts/${product_id}`,
  );
  if (cached_products_page_page_data) {
    return cached_products_page_page_data;
  }
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
  // Expires in 10secs
  await redis.set(`/products/${product_id}`, product_data, {
    ex: 10,
  });
  return product_data;
}

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const project_id = +(await params).id;
  const product_data = await get_products(project_id);
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
