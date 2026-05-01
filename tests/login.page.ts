import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/login'); // ✅ uses baseURL

    // Ensure page is loaded
    await this.page.getByLabel('Username').waitFor();
  }

  async enterUsername(username: string) {
    await this.page.getByLabel('Username').fill(username);
  }

  async enterPassword(password: string) {
    await this.page.getByLabel('Password').fill(password);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async login(username: string, password: string) {
    await this.navigate();

    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.submit();
  }
}