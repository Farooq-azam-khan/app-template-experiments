import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import "dotenv/config";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create a new ratelimiter, that allows 5 requests per 5 seconds
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "5 s"),
});

export async function GET() {
  // Use a constant string to limit all requests with a single ratelimit
  // Or use a userID, apiKey or ip address for individual limits.
  const limit = await ratelimit.limit("anonymous");
  if (!limit.success) {
    return NextResponse.json(
      {
        status: "fail",
        error: "rate limit reached",
      },
      { status: 429 },
    );
  }
  return NextResponse.json(
    {
      status: "success",
      message: "action happened successfully",
    },
    { status: 200 },
  );
}
