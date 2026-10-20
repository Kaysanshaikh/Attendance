/* Replaces google.script.run so the pages can run outside Apps Script.
   Every call is sent to the Apps Script web app (doPost in Code.gs). */
(function () {
  var API = 'https://script.google.com/macros/s/AKfycbxlYvRhsIFtiShCWMZudeW7AgkPwdt1K6tyuosCGG5uhy62Kvbu_5otibpPHURvA4hC/exec';
  function runner(ok, fail) {
    return new Proxy({}, { get: function (_, k) {
      if (k === 'withSuccessHandler') return function (f) { return runner(f, fail); };
      if (k === 'withFailureHandler') return function (f) { return runner(ok, f); };
      return function () {
        var args = [].slice.call(arguments);
        fetch(API, { method: 'POST', headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({ fn: k, args: args }) })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j.ok) { if (ok) ok(j.data); }
          else if (fail) fail(new Error(j.error));
        })
        .catch(function (e) { if (fail) fail(e); });
      };
    } });
  }
  window.google = { script: { run: runner(null, null) } };
})();
