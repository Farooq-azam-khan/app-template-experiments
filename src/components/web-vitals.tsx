"use client";
import { useReportWebVitals } from "next/web-vitals";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";

export function WebVitals() {
  const [wv, setWV] = useState(null);
  useReportWebVitals((metric) => {
    setWV(metric);
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Web Vitals</CardTitle>
      </CardHeader>
      <CardContent>{JSON.stringify(wv)}</CardContent>
    </Card>
  );
}
