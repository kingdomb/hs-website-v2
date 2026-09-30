// Escape closes only the topmost open overlay (dialog or menu).
const stack = [];
export function pushDismiss(token) { stack.push(token); }
export function popDismiss(token) {
  const i = stack.lastIndexOf(token);
  if (i >= 0) stack.splice(i, 1);
}
export const isTopDismiss = (token) => stack[stack.length - 1] === token;
