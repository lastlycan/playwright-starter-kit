import { test as base, request as pwRequest } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ApiClient } from '../../utils/apiClient';

type Fixtures = {
  loginPage: LoginPage;
  apiClient: ApiClient;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  apiClient: async ({ }, use) => {
    const req = await pwRequest.newContext();
    await use(new ApiClient(req));
    await req.dispose();
  },
});

export { expect } from '@playwright/test';
