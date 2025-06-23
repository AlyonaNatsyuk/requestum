import { test, expect, BrowserContext, Page } from '@playwright/test';
import { TECHNOLOGIES_URL } from '../utils/data/constants';

let context: BrowserContext;
let page: Page;


test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto(TECHNOLOGIES_URL);

  // Close all tabs except current one
  const pages = context.pages();
  for (const p of pages) {
    if (p !== page) {
      await p.close();
    }
  }
});

test.afterEach(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.goto(TECHNOLOGIES_URL);

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

test('check working for filters', async () => {
await page.getByRole('link', { name: 'Web', exact: true }).click();
await new Promise(resolve => setTimeout(resolve, 1000));
expect(page.getByRole('heading', { name: 'Web Development' })).toBeVisible();

await page.getByRole('link', { name: 'Mobile', exact: true }).click();
await new Promise(resolve => setTimeout(resolve, 1000));
expect(page.getByRole('heading', { name: 'Mobile Development' })).toBeVisible();

await page.getByRole('link', { name: 'Data science' }).click();
await new Promise(resolve => setTimeout(resolve, 1000));
expect(page.getByRole('heading', { name: 'Data Science', exact: true })).toBeVisible();

await page.getByRole('link', { name: 'Blockchain' }).click();
await new Promise(resolve => setTimeout(resolve, 1000));
expect(page.getByRole('heading', { name: 'Blockchain' })).toBeVisible();

await page.getByRole('link', { name: 'Dev/Ops' }).click();
await new Promise(resolve => setTimeout(resolve, 1000));
expect(page.getByRole('heading', { name: 'DevOps' })).toBeVisible();

await page.getByRole('link', { name: 'UI/UX', exact: true }).click();
await new Promise(resolve => setTimeout(resolve, 1000));
expect(page.getByRole('heading', { name: 'UI/UX' })).toBeVisible();
});

test('check opening and closing get in touch pop-up', async () => {
    await page.getByRole('button', { name: 'Get in touch' }).click();
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(page.locator('#contactModal').getByText('Name')).toBeVisible();
    await page.locator('#contactModal').getByRole('button', { name: 'Send Message' }).click();
    expect(page.getByText('Include a valid email')).toBeVisible();
    await page.getByRole('button', { name: 'Apply form' }).click();
});

