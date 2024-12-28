import { auth } from "@/auth";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/db/index";
import "dotenv/config";

// Create a new ratelimiter, that allows 5 requests per 5 seconds
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "60 s"),
});

export default async function RateLimitTest() {
  const session = await auth();
  const limit = await ratelimit.limit(
    session?.user?.id ? `user-${session.user.id}` : "anonymous",
  );
  if (!limit.success) {
    return (
      <div>
        Hey {session?.user?.name} you are requesting this page too many times.
        {limit.reason}
        {limit.remaining}
      </div>
    );
  }
  return (
    <div>
      <div>You are seeing page content</div>
      <div>Remaining requests: {limit.remaining}</div>
    </div>
  );
}
