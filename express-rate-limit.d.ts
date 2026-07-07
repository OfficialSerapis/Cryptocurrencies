declare module 'express-rate-limit' {
  import { RequestHandler } from 'express';

  interface RateLimitOptions {
    windowMs: number;
    max: number;
    message?: string | { message: string };
    handler?: (req: any, res: any) => void;
    keyGenerator?: (req: any, res: any) => string;
  }

  function rateLimit(options: RateLimitOptions): RequestHandler;
  export = rateLimit;
}
