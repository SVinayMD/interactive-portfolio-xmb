import { test, expect } from '../fixtures';
import { navigationTestData } from '../data/navigation.data';

test.describe('XMB Navigation', () => {
  // This data-driven test now cleanly imports its data.
  for (const data of navigationTestData) {
    test(`should navigate to "${data.horizontal} > ${data.vertical}" and display correct content`, async ({ homePage }) => {
      // Navigate through the menu using data from our array
      await homePage.getHorizontalMenuItem(data.horizontal).click();
      await homePage.getVerticalMenuItem(data.vertical).click();

      // Assert that the content display is updated correctly
      await expect(homePage.contentTitle).toHaveText(data.expectedTitle);
      await expect(homePage.contentBody).toContainText(data.expectedBody);
    });
  }
});