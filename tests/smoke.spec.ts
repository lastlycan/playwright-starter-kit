import { test, expect } from './fixtures/test';
import { TAGS } from '../utils/testTags';

test(`${TAGS.smoke} homepage title`, async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
