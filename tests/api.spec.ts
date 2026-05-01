import { test, expect } from './fixtures/test';
import { TAGS } from '../utils/testTags';

test(`${TAGS.api} validate API response`, async ({ apiClient }) => {
  const body = await apiClient.getPost(1);
  expect(body).toHaveProperty('id', 1);
  expect(body).toHaveProperty('title');
});
