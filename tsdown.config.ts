import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/main.ts"],
  outDir: "./dist",
  dts: true,
  format: ["cjs", "esm"],
  minify: true,
});
