# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.js >> Módulo 6 — Operaciones >> división con decimales
- Location: tests/app.spec.js:96:3

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#opResult6')
Expected: "84.70"
Received: "?"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#opResult6')
    14 × locator resolved to <span id="opResult6">?</span>
       - unexpected value "?"

```

```yaml
- text: "?"
```

# Test source

```ts
  6   |     await page.goto('/');
  7   |     // Scroll al módulo 1
  8   |     const mod1 = page.locator('#mod1');
  9   |     await mod1.scrollIntoViewIfNeeded();
  10  | 
  11  |     // Escribir nombre y valor
  12  |     await page.fill('#varName1', 'precio');
  13  |     await page.fill('#varValue1', '1500');
  14  | 
  15  |     // Click crear
  16  |     await page.click('#btn1');
  17  | 
  18  |     // Verificar caja visual
  19  |     await expect(page.locator('#varBox1 .var-name')).toHaveText('precio');
  20  |     await expect(page.locator('#varBox1 .var-value')).toHaveText('1500');
  21  | 
  22  |     // Verificar código
  23  |     await expect(page.locator('#code1')).toContainText('precio');
  24  |     await expect(page.locator('#code1')).toContainText('1500');
  25  |   });
  26  | });
  27  | 
  28  | test.describe('Módulo 2 — input()', () => {
  29  |   test('guardar dato simulado con input()', async ({ page }) => {
  30  |     await page.goto('/');
  31  |     const mod2 = page.locator('#mod2');
  32  |     await mod2.scrollIntoViewIfNeeded();
  33  | 
  34  |     await page.fill('#inputVal2', '847');
  35  |     await page.click('#btn2');
  36  | 
  37  |     await expect(page.locator('#varValue2disp')).toHaveText('847');
  38  |   });
  39  | });
  40  | 
  41  | test.describe('Módulo 3 — print()', () => {
  42  |   test('mostrar valor en pantalla simulada', async ({ page }) => {
  43  |     await page.goto('/');
  44  |     const mod3 = page.locator('#mod3');
  45  |     await mod3.scrollIntoViewIfNeeded();
  46  | 
  47  |     await page.fill('#printVal3', 'Hola IUB');
  48  |     await page.click('#btn3');
  49  | 
  50  |     await expect(page.locator('#screen3')).toContainText('Hola IUB');
  51  |   });
  52  | });
  53  | 
  54  | test.describe('Módulo 4 — Mensaje en pantalla', () => {
  55  |   test('seleccionar mensaje y mostrarlo', async ({ page }) => {
  56  |     await page.goto('/');
  57  |     const mod4 = page.locator('#mod4');
  58  |     await mod4.scrollIntoViewIfNeeded();
  59  | 
  60  |     // Seleccionar opción por su value
  61  |     await page.selectOption('#msgSelect4', 'Reporte generado exitosamente');
  62  |     await page.click('#btn4');
  63  | 
  64  |     await expect(page.locator('#screen4')).toContainText('Reporte generado');
  65  |   });
  66  | });
  67  | 
  68  | test.describe('Módulo 5 — f-string', () => {
  69  |   test('mostrar mensaje con valor de variable incrustado', async ({ page }) => {
  70  |     await page.goto('/');
  71  |     const mod5 = page.locator('#mod5');
  72  |     await mod5.scrollIntoViewIfNeeded();
  73  | 
  74  |     await page.fill('#varVal5', '92.3');
  75  |     await page.click('#btn5');
  76  | 
  77  |     await expect(page.locator('#varBox5 .var-value')).toHaveText('92.3');
  78  |     await expect(page.locator('#screen5')).toContainText('92.3%');
  79  |   });
  80  | });
  81  | 
  82  | test.describe('Módulo 6 — Operaciones', () => {
  83  |   test('suma básica', async ({ page }) => {
  84  |     await page.goto('/');
  85  |     const mod6 = page.locator('#mod6');
  86  |     await mod6.scrollIntoViewIfNeeded();
  87  | 
  88  |     await page.fill('#opA6', '100');
  89  |     await page.fill('#opB6', '50');
  90  |     await page.selectOption('#opSelect6', '+');
  91  |     await page.click('#btn6');
  92  | 
  93  |     await expect(page.locator('#opResult6')).toHaveText('150');
  94  |   });
  95  | 
  96  |   test('división con decimales', async ({ page }) => {
  97  |     await page.goto('/');
  98  |     const mod6 = page.locator('#mod6');
  99  |     await mod6.scrollIntoViewIfNeeded();
  100 | 
  101 |     await page.fill('#opA6', '847');
  102 |     await page.fill('#opB6', '10');
  103 |     await page.selectOption('#opSelect6', '/');
  104 |     await page.click('#btn6');
  105 | 
> 106 |     await expect(page.locator('#opResult6')).toHaveText('84.70');
      |                                              ^ Error: expect(locator).toHaveText(expected) failed
  107 |   });
  108 | 
  109 |   test('módulo (resto)', async ({ page }) => {
  110 |     await page.goto('/');
  111 |     const mod6 = page.locator('#mod6');
  112 |     await mod6.scrollIntoViewIfNeeded();
  113 | 
  114 |     await page.fill('#opA6', '847');
  115 |     await page.fill('#opB6', '10');
  116 |     await page.selectOption('#opSelect6', '%');
  117 |     await page.click('#btn6');
  118 | 
  119 |     await expect(page.locator('#opResult6')).toHaveText('7');
  120 |   });
  121 | });
  122 | 
  123 | test.describe('Quiz', () => {
  124 |   test('responder todas las preguntas y verificar puntaje', async ({ page }) => {
  125 |     await page.goto('/');
  126 |     const quiz = page.locator('#modQuiz');
  127 |     await quiz.scrollIntoViewIfNeeded();
  128 | 
  129 |     // Click en respuestas correctas
  130 |     // P1: input() → "Espera que el usuario escriba un dato" (opción 1)
  131 |     await page.click('#q0o1');
  132 |     // P2: print("Hola") (opción 1)
  133 |     await page.click('#q1o1');
  134 |     // P3: "Tasa: 78.5%" (opción 1)
  135 |     await page.click('#q2o1');
  136 |     // P4: "Un espacio con nombre que guarda un valor" (opción 1)
  137 |     await page.click('#q3o1');
  138 |     // P5: 847 % 10 = 7 (opción 2)
  139 |     await page.click('#q4o2');
  140 | 
  141 |     await page.click('#btnQuiz');
  142 | 
  143 |     await expect(page.locator('#quizFeedback')).toContainText('5/5');
  144 |   });
  145 | });
  146 | 
  147 | test.describe('Progreso', () => {
  148 |   test('barra de progreso se actualiza al completar módulos', async ({ page }) => {
  149 |     await page.goto('/');
  150 |     const mod1 = page.locator('#mod1');
  151 |     await mod1.scrollIntoViewIfNeeded();
  152 | 
  153 |     await page.fill('#varName1', 'x');
  154 |     await page.fill('#varValue1', '10');
  155 |     await page.click('#btn1');
  156 | 
  157 |     // Verificar que el progreso muestra al menos 1
  158 |     await expect(page.locator('#progressText')).toContainText('1 de');
  159 |   });
  160 | });
  161 | 
```