import * as fs from 'fs';
import { defineConfig, normalizePath } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { viteSingleFile } from "vite-plugin-singlefile"
import chalk from 'chalk';
import zlib from 'zlib';

function buildHeaderFile() {
  let config;
  let inputPath;
  let outputPath;

  return {
    name: "build-static-header",
    apply: "build",
    enforce: "post",

    configResolved(resolvedConfig) {
      config = resolvedConfig;
      const outDir = config.build.outDir;
      inputPath = normalizePath(outDir + "/index.html");
      outputPath = normalizePath(outDir + "/index.h");
    },

    async closeBundle() {
      const input = fs.readFileSync(inputPath);
      const compressed = zlib.brotliCompressSync(input);
      const ratio = compressed.length / input.length;
      const hexlified = compressed.toString("hex").match(/.{2}/g).map(c => "0x" + c).join(", ");
      const output = "static const char HTML[] PROGMEM = {" + hexlified + "};";
      fs.writeFileSync(outputPath, output);
      config.logger.info(
        `\n${chalk.green("✓")} Compressed with Brotli.\n${chalk.dim(config.build.outDir + '/')}${chalk.green("index.h")}\t${chalk.dim((compressed.length / 1024).toFixed(2) + " KiB (" + (ratio * 100).toFixed(1) + "%)")}`);
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    viteSingleFile(),
    buildHeaderFile()
  ]
})
