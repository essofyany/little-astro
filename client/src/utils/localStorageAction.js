export function setAction(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getAction(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

export function deleteAction(key) {
  window.localStorage.removeItem(key);
}

export function clearAllAction() {
  window.localStorage.clear();
}
