import { test, expect } from '../fixtures';

test.describe('Responsive Design', () => {
  // This test will only run on projects configured with a mobile viewport.
  test('should stack the main content container vertically on mobile', async ({ homePage, isMobile }) => {
    // This annotation programmatically skips the test if not on a mobile device.
    test.skip(!isMobile, 'This test is only relevant for mobile viewports.');

    // A common responsive pattern is to change flex-direction. We verify that here.
    await expect(homePage.xmbContainer).toHaveCSS('flex-direction', 'column');
  });
});