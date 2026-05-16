import { expect, test } from '@playwright/test';

const whatsappUrl = /chat\.whatsapp\.com\/K5YkdBXKjlr4hZWWsFmiss/;
const localUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:5176/';

test('renders the campaign hero and opens the WhatsApp CTA', async ({ page }) => {
  await page.goto(localUrl);

  await expect(page.getByRole('heading', { name: /aula ao vivo de toxina botulínica gratuita/i })).toBeVisible();
  await expect(page.getByText(/seja avisado em primeira mão sobre a próxima aula de botox/i)).toBeVisible();
  await expect(page.getByText(/28 anos de formação em farmácia/i)).toBeVisible();

  await page.getByRole('button', { name: /entrar no grupo vip/i }).first().click();
  await expect(page.getByRole('dialog', { name: /inscrição gratuita/i })).toBeVisible();
});

test('validates the registration drawer before submitting to email', async ({ page }) => {
  await page.goto(localUrl);

  await page.getByRole('button', { name: /se inscreva agora/i }).click();
  const drawer = page.getByRole('dialog', { name: /inscrição gratuita/i });
  await expect(drawer).toBeVisible();

  await drawer.getByRole('button', { name: /enviar inscrição e entrar no grupo/i }).click();
  await expect(page.getByText(/revise os campos destacados/i)).toBeVisible();

  const form = drawer.locator('form');
  await expect(form).not.toHaveAttribute('action', /formsubmit/i);

  await drawer.getByLabel('Nome').fill('Maria Silva');
  await drawer.getByLabel('E-mail').fill('maria@example.com');
  await drawer.getByLabel('WhatsApp').fill('(11) 99999-9999');
  await drawer.getByLabel('Área de atuação').fill('Biomedicina');
  await expect(drawer.getByRole('button', { name: /enviar inscrição e entrar no grupo/i })).toBeEnabled();
});

test('submits leads to the local API before redirecting to WhatsApp', async ({ page }) => {
  let submittedLead;

  await page.route('**/api/submit-lead', async (route) => {
    submittedLead = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, id: 'lead_test' }),
    });
  });

  await page.goto(localUrl);
  await page.getByRole('button', { name: /entrar no grupo vip/i }).first().click();
  const drawer = page.getByRole('dialog', { name: /inscrição gratuita/i });

  await drawer.getByLabel('Nome').fill('Maria Silva');
  await drawer.getByLabel('E-mail').fill('maria@example.com');
  await drawer.getByLabel('WhatsApp').fill('(11) 99999-9999');
  await drawer.getByLabel('Área de atuação').fill('Biomedicina');
  await drawer.getByRole('button', { name: /enviar inscrição e entrar no grupo/i }).click();

  await expect(drawer.getByText(/inscrição enviada/i)).toBeVisible();
  expect(submittedLead).toEqual({
    name: 'Maria Silva',
    email: 'maria@example.com',
    phone: '(11) 99999-9999',
    professionalArea: 'Biomedicina',
  });
  await expect.poll(() => page.url()).toMatch(whatsappUrl);
});

test('keeps keyboard focus inside the pre-registration drawer', async ({ page }) => {
  await page.goto(localUrl);

  await page.getByRole('button', { name: /se inscreva agora/i }).click();
  const drawer = page.getByRole('dialog', { name: /inscrição gratuita/i });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole('button', { name: /fechar pré-cadastro/i })).toBeFocused();

  await page.keyboard.press('Shift+Tab');
  await expect(drawer.getByRole('button', { name: /enviar inscrição e entrar no grupo/i })).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
});

test('keeps the selected v2 short after the hero campaign block', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  await page.goto(localUrl);
  await expect(page.locator('.triad')).toHaveCount(0);
  await expect(page.locator('.preview')).toHaveCount(0);
  await expect(page.locator('.motion-gallery')).toHaveCount(0);
  await expect(page.locator('.registration-panel')).toHaveCount(0);

  await context.close();
});

test('exposes production SEO metadata and structured data', async ({ page }) => {
  await page.goto(localUrl);

  await expect(page).toHaveTitle(/aula gratuita de toxina botulínica/i);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /próxima aula gratuita de toxina botulínica/i,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://dra-andrea-grupo-vip-v2.vercel.app/',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://dra-andrea-grupo-vip-v2.vercel.app/og-image.png',
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
  expect(JSON.parse(structuredData)).toEqual(
    expect.objectContaining({
      '@context': 'https://schema.org',
      '@graph': expect.arrayContaining([expect.objectContaining({ '@type': 'Course' })]),
    }),
  );
});
