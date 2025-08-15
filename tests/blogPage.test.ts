import { test, expect, BrowserContext, Page } from '@playwright/test';
import { BLOG_URL } from '../utils/data/constants';

let context: BrowserContext;
let page: Page;

const SELECTORS = {
  tagButton: (text: string) => `#blogPage .tags-container .button-group .button:has-text("${text}")`,
  cardButton: (text: string) => `div.card-body-top > div.button-group > div.button-wrap > div.button:has-text("${text}")`
};

// close all pages except main page
const closeExtraPages = async () => {
  const pages = context.pages();
  for (const p of pages) {
    if (p !== page) {
      await p.close();
    }
  }
};

const testFilter = async (filterName: string) => {
  const tagLocator = page.locator(SELECTORS.tagButton(filterName)).first();
  const cardLocator = page.locator(SELECTORS.cardButton(filterName)).first();
  
  await tagLocator.click();
  await page.waitForTimeout(3000);
  await expect(cardLocator).toBeVisible();
  
  // click for cancelling tag
  await tagLocator.click();
  await page.waitForTimeout(1000);
};

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto(BLOG_URL);
  await closeExtraPages();
});

test.afterEach(async () => {
  await page.goto(BLOG_URL);
  await closeExtraPages();
});

test.afterAll(async () => {
  await context.close();
});

test('check filters working', async () => {
  const filters = ['Guides', 'News', 'Development tips', 'Business', 'Technology'];
  
  for (const filter of filters) {
    await testFilter(filter);
  }
});
