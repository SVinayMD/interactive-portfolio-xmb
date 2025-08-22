import { test, expect } from '../fixtures';
import en from '../../src/locales/en.json';

test.describe('Sanity and Initial Load', () => {
  test('should load the page with correct title and default role', async ({ page, homePage }) => {
  await expect(page).toHaveTitle(/Sebastian Vinay Muñoz Diaz - QA Engineer Portfolio/);
    await expect(homePage.profileRole).toBeVisible();
    await expect(homePage.profileRole).toHaveText(en.profile_role);
  });
});