// ** Config
import { BANNED_WORDS, URL_REGEX, VALID_EMO_REGEX } from "@/configs/sanitizeComment";

export type TSanitizeResult =
    | { ok: true; value: string }
    | { ok: false; error: string }

export const sanitizeComment = (input: string): TSanitizeResult => {
    // 1. Trim whitespace
    const trimmed = input.trim()

    // 2. Strip HTML tags (emoji :name: is unaffected)
    const stripped = trimmed.replace(/<[^>]*>/g, '')

    // 3. Block URLs and links
    if (URL_REGEX.test(stripped)) {
        return { ok: false, error: 'Bình luận không được chứa đường dẫn !' }
    }

    // 4. Block banned words (exclude emoji placeholders from check)
    const textOnly = stripped.replace(VALID_EMO_REGEX, '').toLowerCase()
    const foundWord = BANNED_WORDS.find(word => textOnly.includes(word))
    if (foundWord) {
        return { ok: false, error: 'Bình luận chứa từ ngữ không phù hợp !' }
    }

    return { ok: true, value: stripped }
}