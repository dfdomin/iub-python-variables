# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.js >> Quiz >> responder todas las preguntas y verificar puntaje
- Location: tests/app.spec.js:124:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('#quizFeedback')
Expected substring: "5/5"
Received string:    ""
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('#quizFeedback')
    14 × locator resolved to <div id="quizFeedback"></div>
       - unexpected value ""

```

```yaml
- heading "🐍 Python para Negocios — Repaso Parcial" [level=1]
- text: IUB · Fundamentos de Computación · Preparación Examen ·
- link "🧪 Laboratorio de Variables →":
  - /url: laboratorio.html
- text: 📥 Datos entrada → 📦 Variable → ⚙️ Operación → 📤 Datos salida ⚪ 0 de 6 módulos completados 📦
- heading "Módulo 1 — ¿Qué es una variable?" [level=2]
- text: Una variable es un
- strong: espacio con nombre
- text: donde Python guarda un valor. Como un cajón etiquetado. ? ← variable vacía
- 'textbox "Nombre (ej: tasa)"'
- 'textbox "Valor (ej: 78.5)"'
- button "▶ Crear variable"
- text: "# En Python, una variable se crea al asignarle un valor: tasa = 78.5 🐍 Pruébalo en Python real ↓"
- textbox: tasa = 78.5 print("Tasa:", tasa)
- button "▶ Ejecutar Python"
- text: 📥
- heading "Módulo 2 — input() = Datos de entrada" [level=2]
- code: input()
- strong: detiene el programa
- text: y espera que el usuario escriba algo. El texto se guarda en una variable. ⌨️ Escribe algo ↓ dato
- textbox "Escribe un dato aquí..."
- button "▶ Simular input()"
- text: "# input() muestra un mensaje y espera datos: nombre = input(\"¿Cómo te llamas? \") # El valor escrito se guarda en 'nombre' 🐍 Pruébalo en Python real ↓"
- textbox: nombre = "Ana" print("Hola,", nombre)
- button "▶ Ejecutar Python"
- text: 📤
- heading "Módulo 3 — print() = Datos de salida" [level=2]
- code: print()
- strong: muestra información en pantalla
- text: . Es como Python entrega resultados. >>> Esperando print()...
- textbox "Texto a mostrar": Hola, NeuroBiz
- button "▶ Ejecutar print()"
- text: "print(\"Hola, NeuroBiz\") # Muestra: Hola, NeuroBiz 🐍 Pruébalo en Python real ↓"
- textbox: "print(\"Hola, NeuroBiz\") print(\"Tasa de retención: 78.5%\")"
- button "▶ Ejecutar Python"
- text: 💬
- heading "Módulo 4 — Mostrar un mensaje en pantalla" [level=2]
- text: La forma más simple de
- code: print()
- text: ": mostrar"
- strong: texto fijo
- text: entre comillas. >>> Presiona Ejecutar ↓
- combobox:
  - option "🏢 Bienvenidos al sistema NeuroBiz" [selected]
  - option "📊 Reporte generado exitosamente"
  - 'option "❌ Error: datos no encontrados"'
  - option "📈 La tasa de retención es:"
- button "▶ Ejecutar"
- text: "print(\"Bienvenidos al sistema NeuroBiz\") # Todo entre comillas se muestra tal cual 🐍 Pruébalo en Python real ↓"
- textbox: mensaje = "Bienvenidos a NeuroBiz" print(mensaje)
- button "▶ Ejecutar Python"
- text: 🔗
- heading "Módulo 5 — Mostrar mensaje + valor de variable" [level=2]
- text: Usamos
- strong: f-strings
- text: para combinar texto con variables.
- code: "{variable}"
- text: se reemplaza por su valor. tasa 78.5 → >>> Presiona Ejecutar ↓
- textbox "Valor": "78.5"
- button "▶ Ejecutar f-string"
- text: "tasa = 78.5 print(f\"La tasa de retención es: {tasa}%\") # Muestra: La tasa de retención es: 78.5% 🐍 Pruébalo en Python real ↓"
- textbox: "tasa = 78.5 print(f\"La tasa de retención es: {tasa}%\")"
- button "▶ Ejecutar Python"
- text: ⚙️
- heading "Módulo 6 — Operaciones básicas" [level=2]
- text: "Python puede hacer cálculos con variables numéricas:"
- strong: +
- text: suma 847 + 112 = 959
- strong: "-"
- text: resta 847 - 112 = 735
- strong: "*"
- text: multiplicación 78.5 * 2 = 157.0
- strong: /
- text: división 847 / 10 = 84.7
- strong: //
- text: div. entera 847 // 10 = 84
- strong: "%"
- text: residuo 847 % 10 = 7
- strong: "**"
- text: potencia 2 ** 3 = 8
- spinbutton: "847"
- combobox:
  - option "+" [selected]
  - option "-"
  - option "×"
  - option "÷"
  - option //
  - option "%"
  - option "**"
- spinbutton: "112"
- text: = ?
- button "▶ Calcular"
- text: "a = 847 b = 112 total = a + b # 959 tasa = (a / total) * 100# 88.3% 🐍 Pruébalo en Python real ↓"
- textbox: a = 847 b = 112 print("Suma:", a + b) print("División:", a / b)
- button "▶ Ejecutar Python"
- text: 🔄
- 'heading "Equivalencias: Cairó → Python" [level=2]'
- text: "Solo estas equivalencias necesitas recordar del pseudocódigo:"
- table:
  - rowgroup:
    - row "Cairó Python ¿Qué hace?":
      - columnheader "Cairó"
      - columnheader "Python"
      - columnheader "¿Qué hace?"
    - row "LEER variable variable = input() Recibe datos del usuario":
      - cell "LEER variable"
      - cell "variable = input()"
      - cell "Recibe datos del usuario"
    - row "ESCRIBIR \"texto\" print(\"texto\") Muestra datos en pantalla":
      - cell "ESCRIBIR \"texto\""
      - cell "print(\"texto\")"
      - cell "Muestra datos en pantalla"
    - row "ESCRIBIR variable print(variable) Muestra el valor de una variable":
      - cell "ESCRIBIR variable"
      - cell "print(variable)"
      - cell "Muestra el valor de una variable"
- text: 🧪
- heading "Autoevaluación — 5 preguntas" [level=2]
- text: Marca la respuesta correcta. Al final haz clic en
- strong: Verificar
- text: .
- paragraph: 1. ¿Qué hace input() en Python?
- text: a) Muestra un resultado en pantalla b) Espera que el usuario escriba un dato c) Guarda un archivo d) Cierra el programa
- paragraph: 2. ¿Cómo se muestra un mensaje en Python?
- text: a) input("Hola") b) print("Hola") c) show("Hola") d) display("Hola")
- paragraph:
  - text: 3. ¿Qué imprime?
  - code: "tasa = 78.5 print(f\"Tasa: {tasa}%\")"
- text: "a) Tasa: tasa% b) Tasa: 78.5% c) Tasa: {tasa}% d) Error"
- paragraph: "4. Una variable en Python es:"
- text: a) Un archivo en disco b) Un espacio con nombre que guarda un valor c) Una función del sistema d) Un tipo de dato fijo
- paragraph:
  - text: "5. ¿Cuál es el resultado de:"
  - code: 847 % 10
  - text: "?"
- text: a) 84 b) 84.7 c) 7 d) 10
- button "✅ Verificar respuestas"
- text: IUB — Facultad de Ciencias Económicas y Administrativas · Preparación Parcial · 2026
```

# Test source

```ts
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
  106 |     await expect(page.locator('#opResult6')).toHaveText('84.70');
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
> 143 |     await expect(page.locator('#quizFeedback')).toContainText('5/5');
      |                                                 ^ Error: expect(locator).toContainText(expected) failed
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