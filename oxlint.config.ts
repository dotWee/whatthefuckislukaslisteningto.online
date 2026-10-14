import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "unicorn", "oxc", "vitest"],
  categories: {
    correctness: "error",
    suspicious: "error",
  },
  ignorePatterns: [
    ".wrangler/**",
    "node_modules/**",
    "worker-configuration.d.ts",
  ],
  options: {
    typeAware: true,
  },
  rules: {
    "typescript/no-floating-promises": "error",
    "typescript/no-misused-promises": "error",
  },
  overrides: [
    {
      files: ["test/**/*.ts"],
      plugins: ["vitest", "typescript"],
    },
  ],
});
