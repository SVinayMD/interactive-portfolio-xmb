import { test, expect } from '../fixtures';
import en from '../../locales/en.json';
import es from '../../locales/es.json';

test.describe('Internationalization (i18n)', () => {
  test('should switch language and translate content', async ({ homePage }) => {
    // Switch to Spanish and verify
    await homePage.selectLanguage('es');
    await expect(homePage.profileRole).toHaveText(es.profile_role);
    await expect(homePage.getHorizontalMenuItem(es.menu_about)).toBeVisible();

    // Switch back to English and verify
    await homePage.selectLanguage('en');
    await expect(homePage.profileRole).toHaveText(en.profile_role);
  });
});