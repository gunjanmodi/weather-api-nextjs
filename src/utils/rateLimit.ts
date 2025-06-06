import { RateLimiterMemory } from "rate-limiter-flexible";

const limiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
});

export async function applyRateLimit(ip: string) {
  try {
    await limiter.consume(ip);
  } catch {
    const error = new Error("Too many requests");
    (error as any).statusCode = 429;
    throw error;
  }
}
