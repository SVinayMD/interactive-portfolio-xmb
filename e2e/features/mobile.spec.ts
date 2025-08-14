import { test, expect } from '../fixtures';

test.describe('Mobile-Specific Functionality', () => {
  /**
   * This test verifies the toggle functionality of the time widget,
   * which is a behavior unique to the mobile view.
   */
  test('time widget should expand and collapse on click', async ({ homePage, isMobile }) => {
    // This annotation ensures the test only runs on mobile devices.
    test.skip(!isMobile, 'Time widget click functionality is mobile-only.');

    // 1. Assert the time details are initially hidden on mobile.
    await expect(homePage.timeLines).not.toBeVisible();

    // 2. Click the widget to expand it and verify it becomes visible.
    await homePage.timeWidget.click();
    await expect(homePage.timeLines).toBeVisible();

    // 3. Click again to collapse it and verify it's hidden.
    await homePage.timeWidget.click();
    await expect(homePage.timeLines).not.toBeVisible();
  });
});