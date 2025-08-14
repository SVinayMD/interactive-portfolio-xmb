import { test, expect } from '../fixtures';
import en from '../../locales/en.json';

test.describe('Contact Links', () => {
  test('should have correct external links', async ({ homePage }) => {
    // Navigate to the contact section first
    await homePage.getHorizontalMenuItem(en.menu_contact).click();

    // Check LinkedIn link
    const linkedInLink = homePage.getVerticalMenuItem(en.contact_linkedin_label);
    await expect(linkedInLink).toHaveAttribute('data-link', 'https://www.linkedin.com/in/svmunozd/');

    // Check GitHub link
    const githubLink = homePage.getVerticalMenuItem(en.contact_github_label);
    await expect(githubLink).toHaveAttribute('data-link', 'https://github.com/SVinayMD');
  });
});