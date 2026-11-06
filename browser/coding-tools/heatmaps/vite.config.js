import { defineConfig } from "vite";

export default defineConfig({
  server: {
    allowedHosts: process.env.REPLIT_DEV_DOMAIN ? [process.env.REPLIT_DEV_DOMAIN] : [],
  },
});
