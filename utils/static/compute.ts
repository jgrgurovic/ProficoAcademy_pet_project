export function compute<T>(callback: () => T) {
  return callback()
}
