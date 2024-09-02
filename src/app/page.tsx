import { Editor } from "../components/Editor"

import type { Metadata, Viewport } from "next"

const Index = () => {
  return <Editor />
}

export default Index

const title = "X 文字数カウンター"
const description = "X投稿用の文字数カウンター"

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "ja_JP",
  },
  appleWebApp: {
    title,
  },
}

export const viewport: Viewport = {
  themeColor: "#fafaf9",
}
