import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'npm run dev -- --port 5176 --strictPort',
    url: 'http://localhost:5176/',
    reuseExistingServer: false,
    timeout: 120000,
  },
});
