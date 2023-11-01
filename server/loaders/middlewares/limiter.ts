const rateLimit = require('express-rate-limit');

// Rate limiter 설정
const caverLimiter = rateLimit({
  windowMs: 1 * 1000, // 1 seconds
  max: 20, // limit each IP to 50 requests per windowMs
  handler(_: any, res: any) {
    res.status(204).json({ errorMsg: 'Too many requests' });
  },
});

export {
    caverLimiter
}