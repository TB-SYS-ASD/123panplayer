import { $ } from './utils.js';
export let aplayer = null;
export function startPlayer(audio) {
  aplayer = new APlayer({
    container: $('#aplayer'),
    audio,
    listFolded: true,
    theme: '#00ddff'
  });
}
export function switchSong(track) {
  const idx = aplayer.list.audio.findIndex(t => t.url === track.url);
  if (idx === -1) {
    aplayer.list.add(track);
    aplayer.list.switch(aplayer.list.audio.length - 1);
  } else {
    aplayer.list.switch(idx);
  }
  aplayer.play();
}
