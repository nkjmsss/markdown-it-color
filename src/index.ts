import { Options } from './type'
import { PluginWithOptions } from 'markdown-it'
import { parseColorName } from './parseColorName'
import { parseContent } from './parseContent'
import ParserInline from 'markdown-it/lib/parser_inline'

export const colorPlugin: PluginWithOptions<Options> = (
  md,
  {
    defaultClassName = 'md-colorify', //
    inline = false,
  } = {},
) => {
  const tokenize: ParserInline.RuleInline = (state, silent) => {
    const max = state.posMax

    if (state.src.charCodeAt(state.pos) !== 0x7b /* { */) {
      return false
    }

    const labelStart = state.pos + 1
    const labelEnd = parseColorName(state, state.pos, true)
    if (labelEnd < 0) {
      return false
    }
    const colorName = state.src.substring(labelStart, labelEnd)

    const contentStart = labelEnd + 2
    const contentEnd = parseContent(state, labelEnd + 1)
    if (contentEnd < 0) {
      return false
    }

    if (!silent) {
      state.pos = contentStart
      state.posMax = contentEnd

      const openToken = state.push('color_open', 'span', 1)
      openToken.attrs = [['class', [`${defaultClassName}`, `${defaultClassName}--${colorName}`].join(' ')]]
      if (inline) {
        openToken.attrs.push(['style', `color: ${colorName};`])
      }
      openToken.info = colorName

      state.md.inline.tokenize(state)

      const closeToken = state.push('color_close', 'span', -1)
      closeToken.info = colorName
    }

    state.pos = contentEnd + 1
    state.posMax = max
    return true
  }

  md.inline.ruler.before('emphasis', 'color', tokenize)
}

export default colorPlugin
