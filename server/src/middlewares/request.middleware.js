import crypto from 'node:crypto';

export const requestLogger = (req, res, next) => {
  req.id = crypto.randomUUID();
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logLine = `[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms (ReqID: ${req.id})`;
    if (res.statusCode >= 500) {
      console.error(logLine);
    } else if (res.statusCode >= 400) {
      console.warn(logLine);
    } else {
      console.log(logLine);
    }
  });

  next();
};
