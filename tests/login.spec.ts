import { test, expect } from './fixtures/test';

test('User can login successfully', async ({ page, loginPage }) => {
  await loginPage.login('tomsmith', 'SuperSecretPassword!');

  await expect(page.locator('#flash'))
    .toContainText('You logged into a secure area!');
});