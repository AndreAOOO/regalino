const $ = s => document.querySelector(s), all = s => [...document.querySelectorAll(s)];
const st = all('.st'), dots = $('#dots'), GOAL = 8, TARGET = 3;
const flowers = ['✿', '❀', '✾', '❁'], hues = ['#e8798f', '#f4a55c', '#b9a2e0', '#5bb8c9', '#f2c94c'];
let i = 0, scent = '', timers = [];
st.forEach(() => dots.append(document.createElement('i')));

const clear = () => { timers.forEach(t => { clearInterval(t); clearTimeout(t); }); timers = []; };

function go(n) {
  clear(); i = n; document.body.dataset.s = n;
  st.forEach((s, k) => s.classList.toggle('on', k === n));
  [...dots.children].forEach((d, k) => d.className = k < n ? 'done' : k === n ? 'now' : '');
  scrollTo(0, 0);
  if (n === 1) breathe(); else if (n === 2) play(); else if (n === 6) finale();
}

function breathe() {
  const t = $('#breath-t'), c = $('#breath-n'), b = $('#b-next');
  let phase = 0, n = 0; b.disabled = true; c.textContent = '0 / ' + TARGET; t.textContent = 'Inspira';
  const ring = $('#ring'); ring.style.animation = 'none'; void ring.offsetWidth; ring.style.animation = '';
  timers.push(setInterval(() => {
    phase ^= 1; t.textContent = phase ? 'Espira' : 'Inspira';
    if (!phase) { n++; c.textContent = `${Math.min(n, TARGET)} / ${TARGET}`; if (n >= TARGET) b.disabled = false; }
  }, 4000));
}

function play() {
  const area = $('#play'), garden = $('#garden'), cnt = $('#g-n'), next = $('#g-next');
  area.innerHTML = garden.innerHTML = ''; next.hidden = true; cnt.textContent = '0 / ' + GOAL;
  let caught = 0;
  const spawn = () => {
    if (caught >= GOAL || area.children.length >= 4) return;
    const d = document.createElement('button');
    d.className = 'fall'; d.setAttribute('aria-label', 'Goccia');
    d.style.left = 4 + Math.random() * 84 + '%';
    d.style.animationDuration = 4.5 + Math.random() * 2 + 's';
    d.addEventListener('animationend', () => d.remove());
    d.addEventListener('pointerdown', () => {
      d.remove(); caught++;
      const f = document.createElement('span');
      f.className = 'fl'; f.textContent = flowers[caught % 4]; f.style.color = hues[caught % 5];
      garden.append(f); cnt.textContent = `${caught} / ${GOAL}`;
      if (caught >= GOAL) { area.innerHTML = ''; cnt.textContent = 'Il tuo giardino è fiorito!'; next.hidden = false; }
    });
    area.append(d);
  };
  spawn(); timers.push(setInterval(spawn, 1000));
}

function finale() {
  $('#scent-out').textContent = scent ? 'Profumo scelto: ' + scent : '';
  const cols = ['#e8798f', '#f4a55c', '#b9a2e0', '#f2c94c', '#f6b6c4'];
  for (let k = 0; k < 40; k++) {
    const p = document.createElement('span'); p.className = 'pt';
    p.style.left = Math.random() * 100 + 'vw'; p.style.background = cols[k % 5];
    p.style.setProperty('--x', (Math.random() * 200 - 100) + 'px');
    p.style.animationDuration = 4 + Math.random() * 4 + 's'; p.style.animationDelay = Math.random() * 2.5 + 's';
    p.addEventListener('animationend', () => p.remove()); document.body.append(p);
  }
}

document.addEventListener('click', e => {
  const b = e.target.closest('[data-next]'); if (b && !b.disabled) return go(i + 1);
  const s = e.target.closest('[data-scent]'); if (s) { scent = s.dataset.scent; go(i + 1); }
  if (e.target.closest('#again')) go(0);
});
go(0);