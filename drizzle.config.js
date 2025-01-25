import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_gaSJk2C4DIRn@ep-winter-thunder-a9czwsul-pooler.gwc.azure.neon.tech/ai-short-video-generator?sslmode=require",
  },
});
