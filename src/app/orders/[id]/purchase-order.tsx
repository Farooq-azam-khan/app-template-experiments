"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
export function PurchaseOrder({ order_id }) {
  const [purchase_data, set_purchase_data] = useState(null);
  return (
    <div>
      <Button
        onClick={async () => {
          const resp = await fetch("/api/stripe-purchase", {
            method: "POST",
          });
          const data = await resp.json();
          set_purchase_data(data);
        }}
      >
        Purchase
      </Button>
      {JSON.stringify(purchase_data, null, 3)}
    </div>
  );
}
