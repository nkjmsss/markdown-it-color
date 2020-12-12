import StateInline from 'markdown-it/lib/rules_inline/state_inline'

const open = 0x28 /* ( */
const close = 0x29 /* ) */

/**
 * If successful, returns end pos.
 * Else, returns -1
 */
export const parseContent = (state: StateInline, start: number): number => {
  let pos = start
  const max = state.posMax

  if (pos < max && state.src.charCodeAt(pos) === open) {
    pos++

    let level = 1
    while (pos < max) {
      const char = state.src.charCodeAt(pos)
      if (char === close) {
        level--

        if (level === 0) {
          return pos
        }
      } else if (char === open) {
        level++
      }
      pos++
    }

    // if we failed to find ")"
    return -1
  } else {
    // if we failed to find "("
    return -1
  }
}
