import { test, expect, BrowserContext, Page } from '@playwright/test';
import { CASES_URL } from '../utils/data/constants';

let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto(CASES_URL);

  const pages = context.pages();
  for (const p of pages) {
    if (p !== page) {
      await p.close();
    }
  }
});

test.afterEach(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.goto(CASES_URL);

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

async function checkCasesMatchFilters(page: Page, expectedTags: string[]) {
  const visibleCases = await page.$$('[tags]');
  for (const el of visibleCases) {
    if (await el.isVisible()) {
      const tagsAttr = await el.getAttribute('tags');
      const tags = tagsAttr?.split(',').map(t => t.trim().toLowerCase()) || [];
      for (const expected of expectedTags) {
        expect(tags).toContain(expected.toLowerCase());
      }
    }
  }
}

async function clickAndCheckTag(buttonText: string, expectedTag: string, inHero = true) {
  const locator = inHero ? page.locator('#hero-main').getByText(buttonText) : page.getByText(buttonText, { exact: true });
  await locator.click();
  await checkCasesMatchFilters(page, [expectedTag]);
  await locator.click();
}

test('check filters working', async () => {
  const tagsOutsideHero = ['web development', 'mobile development'];
  for (const tag of tagsOutsideHero) {
    await clickAndCheckTag(tag, tag, false);
  }

  const tagsInHero = [
    'Entertainment',
    'Blockchain',
    'Sports',
    'Business automation',
    'Social media',
    'Artificial Intelligence',
    'Property management',
    'Logistics',
    'Marketplace',
    'SaaS',
    'Gaming',
    'AI Video Analysis',
    'Trading platform',
    'Automotive',
    'CRM & ERP'
  ];

  for (const tag of tagsInHero) {
    await clickAndCheckTag(tag, tag);
  }

  await clickAndCheckTag('Non-profit organization', 'non-profit organization management');
});
