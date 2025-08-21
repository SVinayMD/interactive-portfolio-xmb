import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
  // Page
  readonly page: Page;

  // Locators
  readonly profileRole: Locator;
  readonly languageSwitcher: Locator;
  readonly contentTitle: Locator;
  readonly contentBody: Locator;
  readonly xmbContainer: Locator;
  readonly timeWidget: Locator;
  readonly timeLines: Locator;
  readonly darkModeToggle: Locator;
  readonly body: Locator;

  constructor(page: Page) {
  this.page = page;

  // Define locators for reusable elements
  this.profileRole = page.locator('#profile-widget .profile-role');
  this.languageSwitcher = page.locator('#language-switcher #lang-select');
  this.contentTitle = page.locator('#content-display #content-title');
  this.contentBody = page.locator('#content-display #content-body');
  this.xmbContainer = page.locator('#xmb-container');
  this.timeWidget = page.locator('#time-widget');
  this.timeLines = page.locator('#time-widget .time-lines');
  this.darkModeToggle = page.locator('#dark-mode-toggle');
  this.body = page.locator('body');
  }

  // --- Actions ---

  async goto() {
    await this.page.goto('src/');
  }

  async selectLanguage(language: 'en' | 'es') {
    await this.languageSwitcher.selectOption(language);
  }

  // --- Helper methods for dynamic locators ---

  getHorizontalMenuItem(name: string | RegExp): Locator {
    return this.page.locator('.xmb-item', { hasText: name });
  }

  getVerticalMenuItem(name: string | RegExp): Locator {
  // Target the button inside each vertical menu item since attributes like data-link live on the button
  return this.page.locator('.vertical-menu li button', { hasText: name });
  }
}