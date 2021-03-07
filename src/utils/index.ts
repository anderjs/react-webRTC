/* eslint-disable prettier/prettier */

function logTrace (value: string) {
  value = value.trim()

  const now = (window.performance.now() / 1000).toFixed()

  console.warn(now, value)
} 

export {
  logTrace
}