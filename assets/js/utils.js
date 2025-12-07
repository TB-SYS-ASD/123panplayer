export const $ = selector => document.querySelector(selector);
export const debounce = (fn, wait) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
};
export const randomCover = () => `https://picsum.photos/56/56?random=${Math.random()}`;
