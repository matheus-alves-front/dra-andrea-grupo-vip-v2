import { expect, test } from '@playwright/test';

const whatsappUrl = /chat\.whatsapp\.com\/K5YkdBXKjlr4hZWWsFmiss/;
const localUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:5176/';

test('renders the campaign hero and opens the WhatsApp CTA', async ({ page }) => {
  await page.goto(localUrl);

  await expect(page.getByRole('heading', { name: /toxina botulínica/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /entrar no grupo vip/i }).first()).toHaveAttribute('href', whatsappUrl);
});

test('validates the optional pre-registration drawer locally', async ({ page }) => {
  await page.goto(localUrl);

  await page.getByRole('button', { name: /ver pré-cadastro/i }).click();
  const drawer = page.getByRole('dialog', { name: /pré-cadastro opcional/i });
  await expect(drawer).toBeVisible();

  await drawer.getByRole('button', { name: /validar pré-cadastro/i }).click();
  await expect(page.getByText(/revise os campos destacados/i)).toBeVisible();

  await drawer.getByLabel('Nome').fill('Maria Silva');
  await drawer.getByLabel('E-mail').fill('maria@example.com');
  await drawer.getByLabel('WhatsApp').fill('(11) 99999-9999');
  await drawer.getByLabel('Área de atuação').fill('Biomedicina');
  await drawer.getByRole('button', { name: /validar pré-cadastro/i }).click();

  await expect(drawer.getByText(/dados validados nesta tela/i)).toBeVisible();
  await expect(drawer.getByText(/nada foi enviado ou armazenado/i)).toBeVisible();
  await expect(drawer.getByRole('link', { name: /entrar no grupo vip/i })).toHaveAttribute('href', whatsappUrl);
});

test('keeps keyboard focus inside the pre-registration drawer', async ({ page }) => {
  await page.goto(localUrl);

  await page.getByRole('button', { name: /ver pré-cadastro/i }).click();
  const drawer = page.getByRole('dialog', { name: /pré-cadastro opcional/i });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole('button', { name: /fechar pré-cadastro/i })).toBeFocused();

  await page.keyboard.press('Shift+Tab');
  await expect(drawer.getByRole('button', { name: /validar pré-cadastro/i })).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
});

test('reduced motion disables the oversized pinned triad layout', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  await page.goto(localUrl);
  const triadMinHeight = await page.locator('.triad').evaluate((element) => getComputedStyle(element).minHeight);

  expect(triadMinHeight).toBe('0px');
  await context.close();
});
