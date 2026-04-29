const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('/Users/ijaegwang/wordncode/Work/ㅎ/한국건강가정진흥원/fces/sub/FE_SE_0001.html', 'utf-8');
const dom = new JSDOM(html, {
  url: 'http://localhost/',
  runScripts: 'dangerously',
  resources: 'usable'
});

dom.window.onerror = function(m, u, l, c, err) { console.error("ERR:", err); };

dom.window.document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const uiJs = fs.readFileSync('/Users/ijaegwang/wordncode/Work/ㅎ/한국건강가정진흥원/fces/js/ui.js', 'utf-8');
    dom.window.eval(uiJs);
    dom.window.eval('if (typeof krds_calendar !== "undefined") { console.log("Calling init!"); krds_calendar.init(); console.log("Init done, area:", krds_calendar.datePickerArea.length); }');

    setTimeout(() => {
        const btns = dom.window.document.querySelectorAll('td:not(.old):not(.new) .btn-set-date');
        console.log("Btns:", btns.length);
        btns[0].click();
        console.log("Click 1, Period TDs:", dom.window.document.querySelectorAll('td.period').length);
        btns[4].click();
        console.log("Click 2, Period TDs:", dom.window.document.querySelectorAll('td.period').length);
    }, 500);
  }, 500);
});
