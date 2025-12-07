import { $, debounce } from './utils.js';
export function initSearch() {
  $('#search').addEventListener('input', debounce(e => {
    const v = e.target.value.toLowerCase();
    document.querySelectorAll('.card').forEach(c => {
      c.style.display = c.textContent.toLowerCase().includes(v) ? 'flex' : 'none';
    });
  }, 200));
}
