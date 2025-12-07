import { fetchSources, fetchWebDAV } from './api.js';
import { startPlayer, switchSong } from './player.js';
import { initSearch } from './search.js';
import { $, randomCover } from './utils.js';

export const SOURCES_URL = 'https://tb-sys-asd.github.io/123panplayer/data/sources.json';
let allAudio = [];

(async () => {
  const sources = await fetchSources();
  const publicSources = sources.filter(s => s.public !== false);
  if (!publicSources.length) { $('#tips').textContent = '暂无公开源'; return; }
  $('#tips').textContent = '正在连接各 WebDAV 源…';
  for (const src of publicSources) {
    const pwd = prompt(`请输入「${src.name}」的密码`);
    if (!pwd) continue;
    try {
      const songs = await fetchWebDAV(src.url, src.user, pwd);
      allAudio.push(...songs.map(s => ({ name: s.name, url: s.url, artist: src.name, cover: '' })));
      renderCards(songs, src.name);
    } catch (e) { console.warn(src.name, e) }
  }
  if (!allAudio.length) { $('#tips').textContent = '没有可播放的音乐'; return; }
  $('#tips').style.display = 'none';
  startPlayer(allAudio);
  initSearch();
})();

function renderCards(songs, src) {
  songs.forEach(s => {
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `
      <img class="card-cover" loading="lazy" src="${randomCover()}">
      <div class="card-info">
        <div class="title">${s.name}</div>
        <div class="artist">${src}</div>
      </div>
      <button class="play-btn" data-url="${s.url}" data-name="${s.name}" data-artist="${src}">▶</button>`;
    $('#list').appendChild(card);
  });
  $('#list').addEventListener('click', e => {
    if (e.target.classList.contains('play-btn')) {
      const { url, name, artist } = e.target.dataset;
      switchSong({ name, url, artist, cover: '' });
    }
  });
}
