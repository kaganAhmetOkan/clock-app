export function pushLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

export function pullLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}