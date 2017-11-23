export function uniqueId() {
  uniqueId.index = uniqueId.index || 0;

  return uniqueId.index++;
}