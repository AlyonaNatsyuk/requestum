import { test, expect, BrowserContext, Page } from '@playwright/test';
import { BASE_URL } from '../utils/data/constants';

let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto(BASE_URL);

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
  await page.goto(BASE_URL);

  const pages = context.pages();
  for (const p of pages) {
    if (p !== page) {
      await p.close();
    }
  }
});

test('check opening and closing request a quote pop-up', async () => {
  await page.getByRole('button', { name: 'Request a quote' }).click();
  await new Promise(resolve => setTimeout(resolve, 1000));
  await expect(page.locator('#contactModal').getByText('Name')).toBeVisible();
  await page.locator('#contactModal').getByRole('button', { name: 'Send Message' }).click();
  await page.getByRole('button', { name: 'Apply form' }).click();
});

test('check opening services page', async () => {
  await page.locator('#whatwecando').getByRole('link', { name: 'services', exact: true }).click();
  await new Promise(resolve => setTimeout(resolve, 1000));
  expect(page.getByRole('heading', { name: 'We transform bold ideas into' })).toBeVisible();
});

test('check opening case-studies page', async () => {
  await page.getByRole('link', { name: 'See AI projects we delivered' }).click();
  await new Promise(resolve => setTimeout(resolve, 2000));
  expect(page.getByRole('heading', { name: 'Our AI & Data Science Success' })).toBeVisible();
});

test('check opening full Case Study', async () => {
  await page.locator('#rabbitohs').getByRole('link', { name: 'Full Case Study' }).click();
  await new Promise(resolve => setTimeout(resolve, 2000));
  expect(page.getByRole('heading', { name: 'A Mobile App for an' })).toBeVisible();
});

test('check opening all cases', async () => {
  await page.getByRole('link', { name: 'Show all works' }).click();
  await new Promise(resolve => setTimeout(resolve, 2000));
  expect(page.getByRole('heading', { name: 'Case Studies', exact: true })).toBeVisible();
});

test('check opening one blog page', async () => {
  await page.getByRole('link', { name: 'Guides How to Create Sports' }).click();
  await new Promise(resolve => setTimeout(resolve, 2000));
  expect(page.getByRole('heading', { name: 'How to Create Sports' })).toBeVisible();
});

test('check opening full blog page', async () => {
  await page.getByRole('link', { name: 'READ BLOG' }).click();
  await new Promise(resolve => setTimeout(resolve, 2000));
  expect(page.getByRole('heading', { name: 'Technology insights & trends' })).toBeVisible();
});


