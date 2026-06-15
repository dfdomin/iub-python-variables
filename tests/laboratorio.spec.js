// @ts-check
const { test, expect } = require('@playwright/test');

// Helper: desbloquear todas las secciones hasta el final
async function unlockAll(page) {
  await page.goto('/laboratorio.html');
  // Tab A → B
  await page.click('button:has-text("Avanzar a Comillas")');
  // Tab B → C
  await page.click('button:has-text("Avanzar al Ejercicio")');
  // Completar niveles 1, 2, 3 via JS directo
  await page.evaluate(() => {
    // Nivel 1: simular drop
    if (typeof nivel1Completo !== 'undefined') nivel1Completo = true;
    document.getElementById('dz1val').textContent = '3.1416';
    document.getElementById('nivel1ok').style.display = 'block';
    // Desbloquear nivel 2
    document.getElementById('nivel2card').style.opacity = '1';
    document.getElementById('nivel2card').style.pointerEvents = 'auto';
    // Nivel 2: completo
    if (typeof nivel2Completo !== 'undefined') nivel2Completo = true;
    document.getElementById('nivel2ok').style.display = 'block';
    // Desbloquear nivel 3
    document.getElementById('nivel3card').style.opacity = '1';
    document.getElementById('nivel3card').style.pointerEvents = 'auto';
    // Nivel 3: completo
    if (typeof nivel3Completo !== 'undefined') nivel3Completo = true;
    // Mostrar botón final
    document.getElementById('btnFinalWrapper').hidden = false;
    if (typeof notaAcumulada !== 'undefined') notaAcumulada = 5;
    if (typeof updateNota === 'function') updateNota();
  });
}

test.describe('Laboratorio — Tab A: Metáforas', () => {
  test('carga la página y muestra las 3 metáforas', async ({ page }) => {
    await page.goto('/laboratorio.html');
    await expect(page.locator('h1')).toContainText('Laboratorio');
    await expect(page.locator('.meta-card')).toHaveCount(3);
  });

  test('asignar anima la caja destino', async ({ page }) => {
    await page.goto('/laboratorio.html');
    await page.click('button:has-text("Asignar")');
    await expect(page.locator('#valorGuardadoA')).toHaveText('3.1416');
    await expect(page.locator('#cajaDestinoA')).toHaveClass(/recibido/);
  });

  test('botón "Avanzar a Comillas" desbloquea Tab B', async ({ page }) => {
    await page.goto('/laboratorio.html');
    await page.click('button:has-text("Avanzar a Comillas")');
    await expect(page.locator('#panelB')).toHaveClass(/active/);
    await expect(page.locator('[data-tab="b"]')).not.toHaveClass(/locked/);
  });
});

test.describe('Laboratorio — Tab B: Comillas', () => {
  test('muestra los 3 experimentos de Python', async ({ page }) => {
    await page.goto('/laboratorio.html');
    await page.click('button:has-text("Avanzar a Comillas")');
    await expect(page.locator('.py-editor')).toHaveCount(3);
    await expect(page.locator('#pyEditorB1')).toContainText('847');
    await expect(page.locator('#pyEditorB2')).toContainText('"847"');
  });

  test('botón "Avanzar al Ejercicio" desbloquea Tab C', async ({ page }) => {
    await page.goto('/laboratorio.html');
    await page.click('button:has-text("Avanzar a Comillas")');
    await page.click('button:has-text("Avanzar al Ejercicio")');
    await expect(page.locator('#panelC')).toHaveClass(/active/);
  });
});

test.describe('Laboratorio — Tab C: Drag & Drop', () => {
  test('Nivel 1: drag del valor a drop zone', async ({ page }) => {
    await page.goto('/laboratorio.html');
    await page.click('button:has-text("Avanzar a Comillas")');
    await page.click('button:has-text("Avanzar al Ejercicio")');

    // Simular drag & drop
    await page.evaluate(() => {
      var dz = document.getElementById('dropZone1');
      var dt = new DataTransfer();
      dt.setData('text/plain', '3.1416');
      dz.dispatchEvent(new DragEvent('dragover', { cancelable: true, dataTransfer: dt }));
      dz.dispatchEvent(new DragEvent('drop', { cancelable: true, dataTransfer: dt }));
    });

    await expect(page.locator('#nivel1ok')).toBeVisible();
  });

  test('Nivel 3: crear variable personalizada', async ({ page }) => {
    await unlockAll(page);

    await page.fill('#n3nombre', 'documento');
    await page.fill('#n3valor', '10456789');
    // Click en el botón Guardar dentro del nivel 3 card
    await page.locator('#nivel3card button').click();

    await expect(page.locator('#estanteN3')).toContainText('documento');
    await expect(page.locator('#estanteN3')).toContainText('10456789');
  });
});

test.describe('Laboratorio — Tab Final: Registro', () => {
  test('llenar formulario y guardar', async ({ page }) => {
    await unlockAll(page);

    // Ir al cierre
    await page.click('button:has-text("Ir al cierre")');

    // Verificar nota
    await expect(page.locator('#notaFinal')).toContainText('5 / 5');

    // Llenar formulario
    await page.fill('#fNombre', 'María García López');
    await page.fill('#fDoc', '10456789');
    await page.click('button:has-text("Guardar en Supabase")');

    // Verificar mensaje
    await expect(page.locator('#guardadoMsg')).toBeVisible();
  });
});
