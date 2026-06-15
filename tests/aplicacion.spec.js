// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Aplicación — Pipeline y variables', () => {
  test('muestra el pipeline entrada→operación→salida', async ({ page }) => {
    await page.goto('/aplicacion.html');
    await expect(page.locator('.pipe-step.input')).toBeVisible();
    await expect(page.locator('.pipe-step.op')).toBeVisible();
    await expect(page.locator('.pipe-step.output')).toBeVisible();
  });

  test('muestra variables numéricas y alfanuméricas con nombres reales', async ({ page }) => {
    await page.goto('/aplicacion.html');
    await expect(page.locator('body')).toContainText('tasa_retencion');
    await expect(page.locator('body')).toContainText('ingresos_mensuales');
    await expect(page.locator('body')).toContainText('horas_extra');
    await expect(page.locator('body')).toContainText('estado_factura');
  });
});

test.describe('Aplicación — Variables lógicas', () => {
  test('muestra True y False con contexto organizacional', async ({ page }) => {
    await page.goto('/aplicacion.html');
    await expect(page.locator('body')).toContainText('factura_aprobada');
    await expect(page.locator('body')).toContainText('cliente_moroso');
    await expect(page.locator('.var-box .vval.bool').first()).toContainText('True');
  });
});

test.describe('Aplicación — Estadísticas sin arreglos', () => {
  test('muestra tarjetas de suma, promedio, max, min', async ({ page }) => {
    await page.goto('/aplicacion.html');
    await expect(page.locator('#statSum')).toBeVisible();
    await expect(page.locator('#statAvg')).toBeVisible();
    await expect(page.locator('#statMax')).toBeVisible();
    await expect(page.locator('#statMin')).toBeVisible();
  });

  test('usa max() y min() con argumentos sueltos', async ({ page }) => {
    await page.goto('/aplicacion.html');
    await expect(page.locator('#pyStats')).toContainText('max(sucursal_a, sucursal_b, sucursal_c)');
    await expect(page.locator('#pyStats')).toContainText('min(sucursal_a, sucursal_b, sucursal_c)');
    await expect(page.locator('#pyStats')).not.toContainText('[');
  });
});

test.describe('Aplicación — Ejercicio integrador', () => {
  test('3/3 respuestas correctas muestra éxito', async ({ page }) => {
    await page.goto('/aplicacion.html');
    // Scroll al ejercicio
    await page.locator('#ej1op').scrollIntoViewIfNeeded();
    await page.selectOption('#ej1op', 'suma');
    await page.selectOption('#ej2op', 'maximo');
    await page.selectOption('#ej3op', 'promedio');
    await page.click('button:has-text("Verificar")');
    await expect(page.locator('#ejResult')).toContainText('3/3');
  });
});
