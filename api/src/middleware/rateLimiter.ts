import rateLimit from 'express-rate-limit';

export const shortenLimiter = rateLimit({
  windowMs: 500, // 500ms
  max: 1, // Limit each IP to 1 request per windowMs
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

export const redirectLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 redirects per minute
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
