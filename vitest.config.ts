import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    cloudflareTest({
      wrangler: { configPath: "./wrangler.jsonc" },
      miniflare: {
        bindings: {
          LIBREFM_API_KEY: "00000000000000000000000000000000",
          LIBREFM_USER: "twnksinr",
        },
      },
    }),
  ],
});
