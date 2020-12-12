import StateInline from 'markdown-it/lib/rules_inline/state_inline'

const open = 0x7b /* { */
const close = 0x7d /* } */

/**
 * If successful, returns end pos.
 * Else, returns -1
 */
export const parseColorName = (state: StateInline, start: number, disableNested: boolean): number => {
  let level = 1
  let found = false
  let prevPos: number
  let labelEnd = -1
  const max = state.posMax
  const oldPos = state.pos

  state.pos = start + 1

  while (state.pos < max) {
    const marker = state.src.charCodeAt(state.pos)
    if (marker === close) {
      level--
      if (level === 0) {
        found = true
        break
      }
    }

    prevPos = state.pos
    state.md.inline.skipToken(state)
    if (marker === open) {
      if (prevPos === state.pos - 1) {
        // increase level if we find open bracket, which is not a part of any token
        level++
      } else if (disableNested) {
        state.pos = oldPos
        return -1
      }
    }
  }

  if (found) {
    labelEnd = state.pos
  }

  // restore old state
  state.pos = oldPos

  return labelEnd
}
