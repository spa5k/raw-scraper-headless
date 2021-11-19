import { pnpPlugin } from "@yarnpkg/esbuild-plugin-pnp";
import type { Options } from "tsup";

// const env = process.env.NODE_ENV;

export const tsup: Options = {
  splitting: true,
  sourcemap: false,
  clean: true,
  dts: true,
  format: ["cjs", "esm"],
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
  entryPoints: ["src/index.ts"],
  watch: false,
  esbuildPlugins: [pnpPlugin()],
  target: "node14",
};
