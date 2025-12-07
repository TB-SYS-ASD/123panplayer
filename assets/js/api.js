import { SOURCES_URL } from './app.js';
export async function fetchSources() {
  return fetch(SOURCES_URL).then(r => r.json()).catch(() => []);
}
export async function fetchWebDAV(url, user, pass) {
  const r = await fetch(url, {
    method: 'PROPFIND',
    headers: {
      'Authorization': 'Basic ' + btoa(user + ':' + pass),
      'Depth': '1',
      'Content-Type': 'application/xml'
    },
    body: ' '
  });
  if (!r.ok) throw new Error(r.status);
  const dom = new DOMParser().parseFromString(await r.text(), 'text/xml');
  return [...dom.querySelectorAll('d\\:response,response')]
    .map(n => ({
      href: (n.querySelector('d\\:href,href')?.textContent || ''),
      type: (n.querySelector('d\\:getcontenttype,getcontenttype')?.textContent || '')
    }))
    .filter(o => /audio\/\w+|mp3|flac|m4a|wav/i.test(o.type) || /\.(mp3|flac|m4a|wav)$/i.test(o.href))
    .map(o => ({
      name: decodeURIComponent(o.href.split('/').pop()),
      url: new URL(o.href, url).href
    }));
}
