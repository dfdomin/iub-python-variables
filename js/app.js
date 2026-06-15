/**
 * IUB Python Parcial — App Logic
 * Vanilla JS, IIFE pattern, Supabase + localStorage
 */
(function () {
  'use strict';

  // ====== SUPABASE CONFIG ======
  // Usa window.supabaseClient si fue inicializado por js/supabase.js
  // Si no existe, intenta crear uno directamente
  function getSupabase() {
    if (window.supabaseClient) return window.supabaseClient;
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
      window.supabaseClient = window.supabase.createClient(
        'https://btrsgwkwiucuoittshop.supabase.co',
        'sb_publishable_WzhbHEiNzPt4LPB_UHvduA_SWqTR3FO'
      );
      return window.supabaseClient;
    }
    return null;
  }

  function syncSupabase() {
    var client = getSupabase();
    if (!client) return;
    try {
      var name = localStorage.getItem('iub_student_name') || 'anonimo';
      client.from('student_progress').upsert({
        student_name: name,
        progress: progress,
        updated_at: new Date().toISOString()
      }, { onConflict: 'student_name' }).then(function () {}).catch(function () {});
    } catch (e) {}
  }

  function updateProgressUI() {
    var completed = 0;
    for (var k in progress.modules) {
      if (progress.modules[k] === true) completed++;
    }
    var el = document.getElementById('progressText');
    var bar = document.getElementById('progressBar');
    if (el) el.textContent = '\u2705 ' + completed + ' de 7 módulos completados';
    if (bar) bar.style.width = (completed / 7 * 100) + '%';
  }

  function markModule(id) {
    progress.modules[id] = true;
    saveProgress();
  }

  // ====== HELPERS ======
  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 2000);
  }

  function esc(s) {
    s = String(s);
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ====== MODULE 1: Variable ======
  function mod1_run() {
    var nameEl = document.getElementById('varName1');
    var valEl = document.getElementById('varValue1');
    var name = (nameEl && nameEl.value.trim()) || 'tasa';
    var value = (valEl && valEl.value.trim()) || '78.5';
    var box = document.getElementById('varBox1');
    if (box) {
      box.classList.remove('empty');
      box.classList.add('filled');
      var nameSpan = box.querySelector('.var-name');
      var valSpan = box.querySelector('.var-value');
      if (nameSpan) nameSpan.textContent = name;
      if (valSpan) valSpan.textContent = value;
    }
    var code = document.getElementById('code1');
    if (code) {
      code.innerHTML = '<span class="kw">' + esc(name) + '</span> = <span class="num">' + esc(value) + '</span>';
    }
    markModule('mod1');
    toast('\u2705 Variable "' + name + '" creada con valor ' + value);
  }

  // ====== MODULE 2: input() ======
  function mod2_run() {
    var valEl = document.getElementById('inputVal2');
    var val = valEl ? valEl.value.trim() : '';
    if (!val) { toast('\u26a0\ufe0f Escribe algo primero'); return; }
    var disp = document.getElementById('varValue2disp');
    if (disp) disp.textContent = val;
    var box = document.getElementById('varBox2');
    if (box) { box.classList.remove('empty'); box.classList.add('filled'); }
    markModule('mod2');
    toast('\u2705 Dato guardado: ' + val);
  }

  // ====== MODULE 3: print() ======
  function mod3_run() {
    var valEl = document.getElementById('printVal3');
    var val = valEl ? valEl.value.trim() : '';
    if (!val) { toast('\u26a0\ufe0f Escribe algo para imprimir'); return; }
    var screen = document.getElementById('screen3');
    if (screen) screen.innerHTML = '<span class="prompt">&gt;&gt;&gt; </span>' + esc(val);
    markModule('mod3');
    toast('\u2705 print() ejecutado');
  }

  // ====== MODULE 4: Mensaje ======
  function mod4_run() {
    var sel = document.getElementById('msgSelect4');
    var msg = sel ? sel.value : 'Bienvenidos al sistema NeuroBiz';
    var screen = document.getElementById('screen4');
    if (screen) screen.innerHTML = '<span class="prompt">&gt;&gt;&gt; </span>' + esc(msg);
    markModule('mod4');
    toast('\u2705 Mensaje mostrado');
  }

  // ====== MODULE 5: f-string ======
  function mod5_run() {
    var valEl = document.getElementById('varVal5');
    var val = valEl ? (valEl.value.trim() || '78.5') : '78.5';
    var box = document.getElementById('varBox5');
    if (box) {
      var valSpan = box.querySelector('.var-value');
      if (valSpan) valSpan.textContent = val;
    }
    var screen = document.getElementById('screen5');
    if (screen) {
      screen.innerHTML = '<span class="prompt">&gt;&gt;&gt; </span>La tasa de retencion es: <strong>' + esc(val) + '%</strong>';
    }
    markModule('mod5');
    toast('\u2705 f-string ejecutado');
  }

  // ====== MODULE 6: Operaciones ======
  function mod6_run() {
    var a = parseFloat((document.getElementById('opA6') || {}).value) || 0;
    var b = parseFloat((document.getElementById('opB6') || {}).value) || 0;
    var opEl = document.getElementById('opSelect6');
    var op = opEl ? opEl.value : '+';
    var result;
    switch (op) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = b !== 0 ? a / b : 'Error: div/0'; break;
      case '//': result = b !== 0 ? Math.floor(a / b) : 'Error: div/0'; break;
      case '%': result = b !== 0 ? a % b : 'Error: div/0'; break;
      case '**': result = Math.pow(a, b); break;
      default: result = '?';
    }
    var out = document.getElementById('opResult6');
    if (out) {
      if (typeof result === 'number') {
        out.textContent = Number.isInteger(result) ? result : result.toFixed(2);
      } else {
        out.textContent = result;
      }
    }
    markModule('mod6');
    toast('\u2705 Operacion calculada');
  }

  // ====== QUIZ ======
  var quizQuestions = [
    { q: '1. \u00bfQu\u00e9 hace input() en Python?',
      opts: ['Muestra un resultado en pantalla', 'Espera que el usuario escriba un dato', 'Guarda un archivo', 'Cierra el programa'], ans: 1 },
    { q: '2. \u00bfC\u00f3mo se muestra un mensaje en Python?',
      opts: ['input("Hola")', 'print("Hola")', 'show("Hola")', 'display("Hola")'], ans: 1 },
    { q: '3. \u00bfQu\u00e9 imprime?<br><code>tasa = 78.5<br>print(f"Tasa: {tasa}%")</code>',
      opts: ['Tasa: tasa%', 'Tasa: 78.5%', 'Tasa: {tasa}%', 'Error'], ans: 1 },
    { q: '4. Una variable en Python es:',
      opts: ['Un archivo en disco', 'Un espacio con nombre que guarda un valor', 'Una función del sistema', 'Un tipo de dato fijo'], ans: 1 },
    { q: '5. \u00bfCu\u00e1l es el resultado de: <code>847 % 10</code>?',
      opts: ['84', '84.7', '7', '10'], ans: 2 }
  ];
  var quizAnswers = {};

  function buildQuiz() {
    var container = document.getElementById('quizContainer');
    if (!container) return;
    var html = '';
    for (var qi = 0; qi < quizQuestions.length; qi++) {
      var q = quizQuestions[qi];
      html += '<div class="quiz-q"><p>' + q.q + '</p>';
      for (var oi = 0; oi < q.opts.length; oi++) {
        var letter = String.fromCharCode(97 + oi);
        html += '<div class="quiz-opt" id="q' + qi + 'o' + oi + '" data-qi="' + qi + '" data-oi="' + oi + '">' + letter + ') ' + esc(q.opts[oi]) + '</div>';
      }
      html += '</div>';
    }
    container.innerHTML = html;
    // Add click handlers
    var opts = container.querySelectorAll('.quiz-opt');
    for (var i = 0; i < opts.length; i++) {
      opts[i].addEventListener('click', function () {
        var qi = parseInt(this.getAttribute('data-qi'));
        var oi = parseInt(this.getAttribute('data-oi'));
        quizAnswers[qi] = oi;
        // Clear all options for this question
        var siblings = document.querySelectorAll('[data-qi="' + qi + '"]');
        for (var j = 0; j < siblings.length; j++) {
          siblings[j].classList.remove('selected', 'correct', 'wrong');
        }
        this.classList.add('selected');
      });
    }
  }

  function checkQuiz() {
    var score = 0;
    for (var qi = 0; qi < quizQuestions.length; qi++) {
      var correct = quizQuestions[qi].ans;
      var chosen = quizAnswers[qi];
      for (var oi = 0; oi < 4; oi++) {
        var el = document.getElementById('q' + qi + 'o' + oi);
        if (!el) continue;
        if (oi === correct) el.classList.add('correct');
        if (oi === chosen && chosen !== correct) el.classList.add('wrong');
      }
      if (chosen === correct) score++;
    }
    var fb = document.getElementById('quizFeedback');
    if (fb) {
      if (score === 5) {
        fb.innerHTML = '\ud83c\udf89 \u00a1Perfecto! 5/5 \u2014 Est\u00e1s listo para el parcial.';
        fb.style.color = 'var(--output-green)';
      } else if (score >= 3) {
        fb.innerHTML = '\ud83d\udc4d ' + score + '/5 \u2014 Repasa los m\u00f3dulos marcados en rojo.';
        fb.style.color = 'var(--process-orange)';
      } else {
        fb.innerHTML = '\ud83d\udcda ' + score + '/5 \u2014 Necesitas repasar. Vuelve a leer cada m\u00f3dulo.';
        fb.style.color = 'var(--danger)';
      }
    }
    markModule('modQuiz');
  }

  // ====== STUDENT NAME ======
  function setupStudent() {
    var name = localStorage.getItem('iub_student_name');
    if (!name) {
      name = prompt('\ud83d\udcdd Para guardar tu progreso, escribe tu nombre:');
      if (name) {
        localStorage.setItem('iub_student_name', name.trim());
      } else {
        localStorage.setItem('iub_student_name', 'anonimo');
      }
    }
  }

  // ====== PYODIDE ======
  var pyodideReady = false;
  var pyodideLoading = false;

  function showPyodideLoading() {
    var div = document.createElement('div');
    div.className = 'pyodide-loading';
    div.id = 'pyodideLoading';
    div.innerHTML = '<span class="spinner"></span> Cargando Python... (10-15 seg)';
    document.body.appendChild(div);
  }

  function hidePyodideLoading() {
    var el = document.getElementById('pyodideLoading');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function initPyodide() {
    if (pyodideReady) return Promise.resolve();
    if (pyodideLoading) {
      // Wait for existing init
      return new Promise(function (resolve) {
        var check = setInterval(function () {
          if (pyodideReady) { clearInterval(check); resolve(); }
        }, 200);
      });
    }
    pyodideLoading = true;
    showPyodideLoading();

    // Use window.loadPyodide (from CDN), not a local function named loadPyodide
    if (typeof window.loadPyodide !== 'function') {
      hidePyodideLoading();
      pyodideLoading = false;
      toast('Python no disponible. Usa la simulación visual.');
      return Promise.reject(new Error('Pyodide CDN not loaded'));
    }

    return window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
    }).then(function (py) {
      window.pyodide = py;
      pyodideReady = true;
      hidePyodideLoading();
      toast('Python listo. Puedes ejecutar código real.');
      return py;
    }).catch(function (err) {
      hidePyodideLoading();
      pyodideLoading = false;
      console.error('Pyodide init error:', err);
      toast('Error al cargar Python. Usa la simulación visual.');
      throw err;
    });
  }

  function runPython(editorId, outputId, btnId) {
    var editor = document.getElementById(editorId);
    var output = document.getElementById(outputId);
    var btn = document.getElementById(btnId);
    if (!editor || !output) return;

    var code = editor.value;
    if (!code.trim()) { output.innerHTML = '<span class="py-err">Escribe código primero</span>'; return; }

    if (btn) { btn.disabled = true; btn.textContent = 'Ejecutando...'; }
    output.innerHTML = 'Ejecutando...';

    function doRun(py) {
      try {
        // Capture stdout
        var stdout = [];
        py.setStdout({ batched: function (s) { stdout.push(s); } });
        py.runPython(code);
        var result = stdout.join('');
        output.innerHTML = result || '(sin salida)';
      } catch (e) {
        output.innerHTML = '<span class="py-err">Error: ' + esc(e.message) + '</span>';
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = '\u25b6 Ejecutar Python'; }
      }
    }

    if (pyodideReady && window.pyodide) {
      doRun(window.pyodide);
    } else {
      initPyodide().then(doRun).catch(function (err) {
        output.innerHTML = '<span class="py-err">Python no disponible: ' + esc(err.message) + '</span>';
        if (btn) { btn.disabled = false; btn.textContent = '\u25b6 Ejecutar Python'; }
      });
    }
  }

  // ====== EVENT BINDING ======
  function bind(id, fn) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', fn);
  }

  function init() {
    setupStudent();
    buildQuiz();
    updateProgressUI();

    // Bind module buttons
    bind('btn1', mod1_run);
    bind('btn2', mod2_run);
    bind('btn3', mod3_run);
    bind('btn4', mod4_run);
    bind('btn5', mod5_run);
    bind('btn6', mod6_run);
    bind('btnQuiz', checkQuiz);

    // Bind Pyodide buttons
    bind('pyBtn1', function () { runPython('pyEditor1', 'pyOut1', 'pyBtn1'); });
    bind('pyBtn2', function () { runPython('pyEditor2', 'pyOut2', 'pyBtn2'); });
    bind('pyBtn3', function () { runPython('pyEditor3', 'pyOut3', 'pyBtn3'); });
    bind('pyBtn4', function () { runPython('pyEditor4', 'pyOut4', 'pyBtn4'); });
    bind('pyBtn5', function () { runPython('pyEditor5', 'pyOut5', 'pyBtn5'); });
    bind('pyBtn6', function () { runPython('pyEditor6', 'pyOut6', 'pyBtn6'); });

    // Restore visual state for completed modules
    var mods = ['mod1', 'mod2', 'mod3', 'mod4', 'mod5', 'mod6'];
    for (var i = 0; i < mods.length; i++) {
      if (progress.modules[mods[i]]) {
        var el = document.getElementById(mods[i]);
        if (el) el.style.borderLeftWidth = '6px';
      }
    }
  }

  // Wait for DOM + Supabase CDN
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
