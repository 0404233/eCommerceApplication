import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testConfig/testConfig.ts',
  },
});
