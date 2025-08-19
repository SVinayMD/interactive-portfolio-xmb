import { test, expect } from '../fixtures';

test.describe('Mobile-Specific Functionality', () => {

  test('dark mode toggle should be visible and toggle dark mode on click', async ({ homePage, isMobile }) => {
    test.skip(!isMobile, 'Dark mode toggle test is mobile-only.');

    // 1. Assert the dark mode toggle is visible on mobile.
    await expect(homePage.darkModeToggle).toBeVisible();

    // 2. Click the toggle to enable dark mode.
    await homePage.darkModeToggle.click();
    await expect(homePage.body).toHaveClass(/dark-mode/);

    // 3. Click again to disable dark mode.
    await homePage.darkModeToggle.click();
    await expect(homePage.body).not.toHaveClass(/dark-mode/);
  });
});