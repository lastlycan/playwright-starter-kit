import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/login');
  }

  async enterUsername(username: string) {
    await this.page.fill('#username', username);
  }

  async enterPassword(password: string) {
    await this.page.fill('#password', password);
  }

  async submit() {
    await this.page.click('button[type="submit"]');
  }

  async login(username: string, password: string) {
    await this.navigate();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.submit();
  }
}
