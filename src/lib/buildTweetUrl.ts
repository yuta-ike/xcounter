export const buildTweetUrl = (text: string) => {
  const url = new URL("https://x.com/intent/post")
  url.searchParams.set("text", text)
  return url.toString()
}
