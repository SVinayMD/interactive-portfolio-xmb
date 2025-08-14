import { test as base } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';

// Define the types for our new fixtures.
type MyFixtures = {
  homePage: HomePage;
};

// Extend the base 'test' with our new fixtures.
// This creates a new 'test' function that we'll use in our spec files.
export const test = base.extend<MyFixtures>({
  // 'homePage' is the name of our new fixture.
  homePage: async ({ page }, use) => {
    // 1. Set up the fixture.
    const homePage = new HomePage(page);
    await homePage.goto();

    // 2. Use the fixture value in the test.
    await use(homePage);
  },
});

// Export 'expect' from the base test for convenience.
export { expect } from '@playwright/test';