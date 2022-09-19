import * as fs from 'fs';
import zlib from 'zlib';

import { defineConfig, normalizePath } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { viteSingleFile } from "vite-plugin-singlefile"
import chalk from 'chalk';


function buildHeaderFile() {
  let config;
  let inputPath;
  let outputPath;

  return {
    name: "build-header-file",
    apply: "build",
    enforce: "post",

    configResolved(resolvedConfig) {
      config = resolvedConfig;
      const outDir = config.build.outDir;
      inputPath = normalizePath(`${config.build.outDir}/index.html`);
      outputPath = normalizePath(`${config.root}/../src/Html.h`);
    },

    async closeBundle() {
      const input = fs.readFileSync(inputPath);
      const compressed = zlib.brotliCompressSync(input);
      const ratio = compressed.length / input.length;
      const hexlified = compressed.toString("hex").match(/.{2}/g).map(c => "0x" + c).reverse().join(", ");
      const output = `static const char HTML[] PROGMEM = {${hexlified}};`;
      
      // Write header file only if a previous one exists
      // This avoids errors in development and GitHub actions
      if (fs.existsSync(outputPath)) {
        fs.writeFileSync(outputPath, output);
      }

      config.logger.info(`\n${chalk.green("✓")} Compressed with Brotli: ${chalk.dim((compressed.length / 1024).toFixed(2) + " KiB (" + (ratio * 100).toFixed(1) + "%)")}`);
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    viteSingleFile(),
    buildHeaderFile()
  ]
})
