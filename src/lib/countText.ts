import twitter from "twitter-text"

type CountTextReturn = {
  count: number
  permillage: number
}

export const countText = (text: string): CountTextReturn => {
  const result = twitter.parseTweet(text)

  return {
    count: Math.floor(result.weightedLength / 2),
    permillage: result.permillage,
  }
}
