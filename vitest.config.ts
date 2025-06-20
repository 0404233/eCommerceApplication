import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/test-config/test-config.ts',
  },
});
