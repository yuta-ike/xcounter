import { encodeBase64 } from "./base64"

export const buildShareLink = (origin: string, text: string) => {
  const urlObj = new URL(origin)
  const base64Text = encodeBase64(text)
  urlObj.searchParams.set("text", base64Text)
  return urlObj.toString()
}
