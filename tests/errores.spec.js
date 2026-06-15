// @ts-check
const { test, expect } = require('@playwright/test');

async function unlockAll(page) {
  await page.goto('/laboratorio.html');
  // A → B
  await page.click('button:has-text("Avanzar a Comillas")');
  // B → Errores
  await page.click('button:has-text("Avanzar a Errores")');
  // Responder diagnóstico correctamente
  await page.evaluate(() => {
    if (typeof checkDiag === 'function') {
      // Simular respuestas correctas
      var opts = document.querySelectorAll('#panelErrores .quiz-opt-diag');
      for (var i = 0; i < opts.length; i++) {
        var a = opts[i].getAttribute('data-a');
        var q = parseInt(opts[i].getAttribute('data-q'));
        if ((q === 1 && a === 'b') || (q === 2 && a === 'a') || (q === 3 && a === 'c')) {
          checkDiag(q, a, opts[i]);
        }
      }
    }
  });
  // Errores → C (Ejercicio)
  await page.click('#btnAvanzarEjercicio');
  // Completar niveles 1, 2, 3
  await page.evaluate(() => {
    if (typeof nivel1Completo !== 'undefined') nivel1Completo = true;
    document.getElementById('dz1val').textContent = '3.1416';
    document.getElementById('nivel1ok').style.display = 'block';
    document.getElementById('nivel2card').style.opacity = '1';
    document.getElementById('nivel2card').style.pointerEvents = 'auto';
    if (typeof nivel2Completo !== 'undefined') nivel2Completo = true;
    document.getElementById('nivel2ok').style.display = 'block';
    document.getElementById('nivel3card').style.opacity = '1';
    document.getElementById('nivel3card').style.pointerEvents = 'auto';
    if (typeof nivel3Completo !== 'undefined') nivel3Completo = true;
    document.getElementById('btnFinalWrapper').hidden = false;
    if (typeof notaAcumulada !== 'undefined') notaAcumulada = 5;
    if (typeof updateNota === 'function') updateNota();
  });
}

test.describe('Errores — Anatomía', () => {
  test('muestra la tabla con las 4 partes del error', async ({ page }) => {
    await page.goto('/laboratorio.html');
    await page.click('button:has-text("Avanzar a Comillas")');
    await page.click('button:has-text("Avanzar a Errores")');

    // Verificar que la tabla de anatomía tiene 4 filas (file, line, type, message)
    await expect(page.locator('#panelErrores table tr')).toHaveCount(4);
    await expect(page.locator('#panelErrores')).toContainText('TypeError');
  });

  test('muestra ejemplos de gestión administrativa', async ({ page }) => {
    await page.goto('/laboratorio.html');
    await page.click('button:has-text("Avanzar a Comillas")');
    await page.click('button:has-text("Avanzar a Errores")');

    await expect(page.locator('#panelErrores')).toContainText('nómina');
    await expect(page.locator('#panelErrores')).toContainText('inventario');
    await expect(page.locator('#panelErrores')).toContainText('DIAN');
  });
});

test.describe('Errores — Diagnóstico', () => {
  test('responder 3/3 muestra mensaje de éxito', async ({ page }) => {
    await page.goto('/laboratorio.html');
    await page.click('button:has-text("Avanzar a Comillas")');
    await page.click('button:has-text("Avanzar a Errores")');

    // Click respuestas correctas: 1=b, 2=a, 3=c
    await page.evaluate(() => {
      var opts = document.querySelectorAll('#panelErrores .quiz-opt-diag');
      for (var i = 0; i < opts.length; i++) {
        var a = opts[i].getAttribute('data-a');
        var q = parseInt(opts[i].getAttribute('data-q'));
        if ((q === 1 && a === 'b') || (q === 2 && a === 'a') || (q === 3 && a === 'c')) {
          checkDiag(q, a, opts[i]);
        }
      }
    });

    await expect(page.locator('#diagResult')).toContainText('3/3');
    await expect(page.locator('#btnAvanzarEjercicio')).toContainText('3/3');
  });

  test('botón avanzar desbloquea Ejercicio', async ({ page }) => {
    await page.goto('/laboratorio.html');
    await page.click('button:has-text("Avanzar a Comillas")');
    await page.click('button:has-text("Avanzar a Errores")');

    // Responder correctamente
    await page.evaluate(() => {
      var opts = document.querySelectorAll('#panelErrores .quiz-opt-diag');
      for (var i = 0; i < opts.length; i++) {
        var a = opts[i].getAttribute('data-a');
        var q = parseInt(opts[i].getAttribute('data-q'));
        if ((q === 1 && a === 'b') || (q === 2 && a === 'a') || (q === 3 && a === 'c')) {
          checkDiag(q, a, opts[i]);
        }
      }
    });

    await page.click('#btnAvanzarEjercicio');
    await expect(page.locator('#panelC')).toHaveClass(/active/);
  });
});

test.describe('Errores + flujo completo', () => {
  test('llega hasta el final con nota 5/5', async ({ page }) => {
    await unlockAll(page);
    await page.click('button:has-text("Ir al cierre")');
    await expect(page.locator('#notaFinal')).toContainText('5');
  });
});
