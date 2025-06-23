import { test, expect, BrowserContext, Page } from '@playwright/test';
import { BLOG_URL } from '../utils/data/constants';

let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto(BLOG_URL);

  const pages = context.pages();
  for (const p of pages) {
    if (p !== page) {
      await p.close();
    }
  }
});

test.afterEach(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.goto(BLOG_URL);

  const pages = context.pages();
  for (const p of pages) {
    if (p !== page) {
      await p.close();
    }
  }
});

test.afterAll(async () => {
  await context.close();
});


  test('check filters working', async () => {
    await page.locator('#blogPage .tags-container .button-group .button:has-text("Guides")').first().click();
    await page.waitForTimeout(3000);
    expect(page.locator('div.card-body-top > div.button-group > div.button-wrap > div.button:has-text("Guides")').first()).toBeVisible();
    await page.locator('#blogPage .tags-container .button-group .button:has-text("Guides")').first().click();
    await page.waitForTimeout(1000);

    await page.locator('#blogPage .tags-container .button-group .button:has-text("News")').first().click();
    await page.waitForTimeout(3000);
    expect(page.locator('div.card-body-top > div.button-group > div.button-wrap > div.button:has-text("News")').first()).toBeVisible();
    await page.locator('#blogPage .tags-container .button-group .button:has-text("News")').first().click();
    await page.waitForTimeout(1000);

    await page.locator('#blogPage .tags-container .button-group .button:has-text("Development tips")').first().click();
    await page.waitForTimeout(3000);
    expect(page.locator('div.card-body-top > div.button-group > div.button-wrap > div.button:has-text("Development tips")').first()).toBeVisible();    
    await page.locator('#blogPage .tags-container .button-group .button:has-text("Development tips")').first().click();
    await page.waitForTimeout(1000);

    await page.locator('#blogPage .tags-container .button-group .button:has-text("Business")').first().click();
    await page.waitForTimeout(3000);
    expect(page.locator('div.card-body-top > div.button-group > div.button-wrap > div.button:has-text("Business")').first()).toBeVisible();
    await page.locator('#blogPage .tags-container .button-group .button:has-text("Business")').first().click();
    await page.waitForTimeout(1000);

    await page.locator('#blogPage .tags-container .button-group .button:has-text("Technology")').first().click();
    await page.waitForTimeout(3000);
    expect(page.locator('div.card-body-top > div.button-group > div.button-wrap > div.button:has-text("Technology")').first()).toBeVisible();
    await page.locator('#blogPage .tags-container .button-group .button:has-text("Technology")').first().click();
    await page.waitForTimeout(1000);
  });
  
  