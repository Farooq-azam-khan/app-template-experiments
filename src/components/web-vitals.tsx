"use client";
import { useReportWebVitals } from "next/web-vitals";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type MyMetric = {
  name: string;
  value: number;
  rating: string;
  delta: number;
  navigationType: string;
  type: string;
  entries: {
    name: string;
    entryType: string;
    startTime: number;
    duration: number;
    initiatorTye: string;
    unloadEventStart: number;
    unloadEventEnd: number;
    domInteractive: number;
    domContentLoadedEventStart: number;
    domContentLoadedEventEnd: number;
    domComplete: number;
    loadEventStart: number;
    loadEventEnd: number;
  }[];
};
export function WebVitals() {
  const [wv, setWV] = useState<MyMetric | null>(null);
  useReportWebVitals((metric) => {
    setWV(metric);
  });
  if (!wv) {
    return <div>Loading...</div>;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{wv.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ratting</TableHead>
              <TableHead>Value (ms)</TableHead>
              <TableHead>delta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{wv.rating}</TableCell>
              <TableCell>{wv.value}</TableCell>
              <TableCell>{wv.delta}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
