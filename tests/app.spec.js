// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Módulo 1 — Variable', () => {
  test('crear variable y mostrar en caja visual', async ({ page }) => {
    await page.goto('/');
    // Scroll al módulo 1
    const mod1 = page.locator('#mod1');
    await mod1.scrollIntoViewIfNeeded();

    // Escribir nombre y valor
    await page.fill('#varName1', 'precio');
    await page.fill('#varValue1', '1500');

    // Click crear
    await page.click('#btn1');

    // Verificar caja visual
    await expect(page.locator('#varBox1 .var-name')).toHaveText('precio');
    await expect(page.locator('#varBox1 .var-value')).toHaveText('1500');

    // Verificar código
    await expect(page.locator('#code1')).toContainText('precio');
    await expect(page.locator('#code1')).toContainText('1500');
  });
});

test.describe('Módulo 2 — input()', () => {
  test('guardar dato simulado con input()', async ({ page }) => {
    await page.goto('/');
    const mod2 = page.locator('#mod2');
    await mod2.scrollIntoViewIfNeeded();

    await page.fill('#inputVal2', '847');
    await page.click('#btn2');

    await expect(page.locator('#varValue2disp')).toHaveText('847');
  });
});

test.describe('Módulo 3 — print()', () => {
  test('mostrar valor en pantalla simulada', async ({ page }) => {
    await page.goto('/');
    const mod3 = page.locator('#mod3');
    await mod3.scrollIntoViewIfNeeded();

    await page.fill('#printVal3', 'Hola IUB');
    await page.click('#btn3');

    await expect(page.locator('#screen3')).toContainText('Hola IUB');
  });
});

test.describe('Módulo 4 — Mensaje en pantalla', () => {
  test('seleccionar mensaje y mostrarlo', async ({ page }) => {
    await page.goto('/');
    const mod4 = page.locator('#mod4');
    await mod4.scrollIntoViewIfNeeded();

    // Seleccionar opción por su value
    await page.selectOption('#msgSelect4', 'Reporte generado exitosamente');
    await page.click('#btn4');

    await expect(page.locator('#screen4')).toContainText('Reporte generado');
  });
});

test.describe('Módulo 5 — f-string', () => {
  test('mostrar mensaje con valor de variable incrustado', async ({ page }) => {
    await page.goto('/');
    const mod5 = page.locator('#mod5');
    await mod5.scrollIntoViewIfNeeded();

    await page.fill('#varVal5', '92.3');
    await page.click('#btn5');

    await expect(page.locator('#varBox5 .var-value')).toHaveText('92.3');
    await expect(page.locator('#screen5')).toContainText('92.3%');
  });
});

test.describe('Módulo 6 — Operaciones', () => {
  test('suma básica', async ({ page }) => {
    await page.goto('/');
    const mod6 = page.locator('#mod6');
    await mod6.scrollIntoViewIfNeeded();

    await page.fill('#opA6', '100');
    await page.fill('#opB6', '50');
    await page.selectOption('#opSelect6', '+');
    await page.click('#btn6');

    await expect(page.locator('#opResult6')).toHaveText('150');
  });

  test('división con decimales', async ({ page }) => {
    await page.goto('/');
    const mod6 = page.locator('#mod6');
    await mod6.scrollIntoViewIfNeeded();

    await page.fill('#opA6', '847');
    await page.fill('#opB6', '10');
    await page.selectOption('#opSelect6', '/');
    await page.click('#btn6');

    await expect(page.locator('#opResult6')).toHaveText('84.70');
  });

  test('módulo (resto)', async ({ page }) => {
    await page.goto('/');
    const mod6 = page.locator('#mod6');
    await mod6.scrollIntoViewIfNeeded();

    await page.fill('#opA6', '847');
    await page.fill('#opB6', '10');
    await page.selectOption('#opSelect6', '%');
    await page.click('#btn6');

    await expect(page.locator('#opResult6')).toHaveText('7');
  });
});

test.describe('Quiz', () => {
  test('responder todas las preguntas y verificar puntaje', async ({ page }) => {
    await page.goto('/');
    const quiz = page.locator('#modQuiz');
    await quiz.scrollIntoViewIfNeeded();

    // Click en respuestas correctas
    // P1: input() → "Espera que el usuario escriba un dato" (opción 1)
    await page.click('#q0o1');
    // P2: print("Hola") (opción 1)
    await page.click('#q1o1');
    // P3: "Tasa: 78.5%" (opción 1)
    await page.click('#q2o1');
    // P4: "Un espacio con nombre que guarda un valor" (opción 1)
    await page.click('#q3o1');
    // P5: 847 % 10 = 7 (opción 2)
    await page.click('#q4o2');

    await page.click('#btnQuiz');

    await expect(page.locator('#quizFeedback')).toContainText('5/5');
  });
});

test.describe('Progreso', () => {
  test('barra de progreso se actualiza al completar módulos', async ({ page }) => {
    await page.goto('/');
    const mod1 = page.locator('#mod1');
    await mod1.scrollIntoViewIfNeeded();

    await page.fill('#varName1', 'x');
    await page.fill('#varValue1', '10');
    await page.click('#btn1');

    // Verificar que el progreso muestra al menos 1
    await expect(page.locator('#progressText')).toContainText('1 de');
  });
});
