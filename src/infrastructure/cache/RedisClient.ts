import Redis from "ioredis";
import { env } from "@/config/env";

export const redis = new Redis(env.redisUrl);

export async function getFromCache<T>(key: string): Promise<T | null> {
  const data = await redis.get(key);
  return data ? (JSON.parse(data) as T) : null;
}

export async function setToCache<T>(
  key: string,
  value: T,
  ttl: number = 43200,
): Promise<void> {
  const data = JSON.stringify(value);
  await redis.set(key, data, "EX", ttl);
}
