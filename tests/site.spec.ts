import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { practiceAreas } from "../src/data/practiceAreas";
import { articles } from "../src/data/articles";
test("rotas estáticas, semântica e links internos", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const routes = [
    "/",
    "/escritorio/",
    "/equipe/",
    "/areas-de-atuacao/",
    "/artigos/",
    "/contato/",
    "/privacidade/",
    "/termos/",
    ...practiceAreas.map((a) => `/areas-de-atuacao/${a.slug}/`),
    ...articles.map((a) => `/artigos/${a.slug}/`),
  ];
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1"), route).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((els) => [
        ...new Set(els.map((el) => el.getAttribute("href")!)),
      ]);
    for (const href of hrefs)
      expect((await request.get(href)).ok(), href).toBeTruthy();
  }
  expect(errors).toEqual([]);
});
test("busca, categoria e estado vazio", async ({ page }) => {
  await page.goto("/artigos/");
  await page.getByLabel("Buscar por título ou resumo").fill("imovel");
  await expect(page.locator(".article-grid .article-card")).toHaveCount(1);
  await page
    .getByLabel("Categoria", { exact: true })
    .selectOption("Direito Contratual");
  await expect(page.getByText("Nenhum artigo corresponde")).toBeVisible();
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await expect(page.locator(".article-grid .article-card")).toHaveCount(3);
});
test("formulário valida e prepara mensagem sem POST", async ({ page }) => {
  const posts: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  await page.goto("/contato/");
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  await expect(page.locator(".prepared-link")).toHaveCount(0);
  await page.getByLabel("Como podemos chamar").fill("Pessoa Teste");
  await page
    .getByLabel("Sobre qual assunto")
    .selectOption("Informações sobre atendimento");
  await page
    .getByLabel("Uma breve mensagem")
    .fill("Gostaria de informações sobre uma consulta.");
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  const link = page.locator(".prepared-link");
  await expect(link).toHaveAttribute(
    "href",
    /^https:\/\/wa.me\/5511940372995\?text=/,
  );
  expect(decodeURIComponent((await link.getAttribute("href"))!)).toContain(
    "Pessoa Teste",
  );
  expect(posts).toEqual([]);
  await page.getByLabel("Como podemos chamar").fill("Outro nome");
  await expect(link).toHaveCount(0);
});
test("menu mobile: teclado, Escape e navegação", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Abrir menu" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("dialog").getByRole("link", { name: "Equipe" }).click();
  await expect(page).toHaveURL(/\/equipe\/?$/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("conteúdo e navegação sem JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.locator("h1")).toContainText("O Direito");
  await expect(
    page.getByRole("link", { name: "Conheça nossas áreas de atuação" }),
  ).toBeVisible();
  await page.goto("http://127.0.0.1:4173/artigos/");
  await expect(page.locator(".article-grid .article-card")).toHaveCount(3);
  await context.close();
});
test("acessibilidade WCAG nas páginas principais", async ({ page }) => {
  for (const route of [
    "/",
    "/artigos/",
    "/contato/",
    "/equipe/",
    "/areas-de-atuacao/direito-imobiliario/",
  ]) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target),
      })),
      route,
    ).toEqual([]);
  }
});
test("quatro larguras sem overflow horizontal", async ({ page }) => {
  for (const width of [1440, 768, 390, 360]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/artigos/",
      "/contato/",
      "/areas-de-atuacao/",
      "/equipe/",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} ${width}`,
      ).toBeTruthy();
    }
  }
});
test("404 institucional", async ({ page }) => {
  const response = await page.goto("/pagina-inexistente/");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Voltar ao início" }),
  ).toBeVisible();
});
