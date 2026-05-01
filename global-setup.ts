import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import * as dotenv from 'dotenv';

dotenv.config();

export default async function globalSetup(config: FullConfig) {
  const baseURL = process.env.BASE_URL || config.projects[0].use.baseURL;
  const username = process.env.DEMO_USERNAME;
  const password = process.env.DEMO_PASSWORD;

  // If creds not provided, skip (keeps template usable).
  if (!baseURL || !username || !password) return;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`${baseURL}/login`);

  const loginPage = new LoginPage(page);
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
  await loginPage.submit();

  // ✅ Login success check (pick one that matches your app)
  // Option A: URL contains dashboard/home
  await page.waitForURL(/dashboard|home/i, { timeout: 15_000 }).catch(async () => {
    // Option B fallback: look for a common “logged-in” signal (adjust selector for your app)
    const loggedInSignal = page.locator('[data-test="user-menu"], nav, header');
    const ok = await loggedInSignal.first().isVisible().catch(() => false);

    if (!ok) {
      const currentUrl = page.url();
      await browser.close();
      throw new Error(
        `Global setup login did not reach a logged-in state. Current URL: ${currentUrl}. ` +
        `Update the success check in global-setup.ts to match your app.`
      );
    }
  });

  await page.context().storageState({ path: 'test-results/storageState.json' });
  await browser.close();
}
