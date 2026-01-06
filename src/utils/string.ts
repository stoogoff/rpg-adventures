
import { marked } from 'marked'
import { markedSmartypants } from 'marked-smartypants'

marked.use(markedSmartypants())

export const format = (input: string): string => marked.parse(input)
