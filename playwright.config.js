// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:8765',
    headless: true,
    viewport: { width: 390, height: 844 }, // iPhone 14 size (mobile-first)
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: { width: 390, height: 844 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: 'python3 -m http.server 8765',
    url: 'http://localhost:8765/',
    reuseExistingServer: true,
    timeout: 10000,
  },
});
