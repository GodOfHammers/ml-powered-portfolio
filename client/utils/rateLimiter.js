import rateLimit from 'express-rate-limit';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10, // Number of points
  duration: 1, // Per second
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

export const loginLimiter = new RateLimiterMemory({
  points: 5, // 5 attempts
  duration: 60 * 60, // per hour
});