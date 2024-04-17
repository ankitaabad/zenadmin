/// <reference types="vitest" />
import { defineConfig } from 'vite';
export default defineConfig({
  test: {
    hookTimeout: 14000,
    testTimeout: 10000,
  },
});
