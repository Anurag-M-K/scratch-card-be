export const config = {
  jwtSecret: process.env.JWT_SECRET! || "scratch-card",
  port: process.env.PORT! || 4000,
};
