"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import { countText } from "@/lib/countText"
import { buildTweetUrl } from "@/lib/buildTweetUrl"
import { clipboardApiSupported } from "@/lib/copyClipboard"
import { useCopy } from "@/lib/useCopy"
import { buildShareLink } from "@/lib/buildShareLink"
import { decodeBase64 } from "@/lib/base64"

export const Editor = () => {
  const searchParams = useSearchParams()
  const [text, setText] = useState("")

  useEffect(() => {
    const rawInitText = searchParams.get("text")
    if (rawInitText != null) {
      const initText = decodeBase64(rawInitText)
      setText(initText)
    }
  }, [searchParams])

  const { count, permillage } = useMemo(() => countText(text), [text])

  const tweetLink = buildTweetUrl(text)

  const { copied: copiedText, copy: copyText } = useCopy()

  const handleCopy = async () => {
    await copyText(text)
  }

  const { copied: copiedLink, copy: copyLink } = useCopy()

  const handleCopyLink = async () => {
    const shaerLink = buildShareLink(typeof window === "undefined" ? "" : window.origin, text)
    await copyLink(`---\n${text}\n---\n${shaerLink}`)
  }

  return (
    <div className="flex flex-col gap-8">
      <div
        data-over={140 < count}
        className="border-slate-200 focus-within:border-slate-400 border bg-white rounded-lg w-full overflow-hidden data-[over=true]:border-red-300"
      >
        <textarea
          name=""
          id=""
          autoFocus
          className="resize-none p-6 text-xl focus:outline-none w-full"
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ポスト内容を入力してください"
        />
        <div className="border-t border-t-slate-200 mx-4 flex flex-col p-4 gap-4">
          <div className="tabular-nums text-xl flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full"
              style={{
                "--percentage": `${100 - Math.floor(permillage / 10)}%`,
                background:
                  "radial-gradient(white, white 40%, transparent 0, transparent), conic-gradient(#E2E8F0, #E2E8F0 var(--percentage), #2a2a2a 0, #2a2a2a)",
              }}
            />
            <p>
              {count}
              <span className="text-sm ml-1">文字</span>
              {140 < count ? (
                <span className="text-sm ml-1 text-red-500 font-bold">
                  （{count - 140}文字オーバー）
                </span>
              ) : (
                <span className="text-sm ml-1">（あと{140 - count}文字）</span>
              )}
            </p>
          </div>
        </div>
      </div>
      <div
        className="flex gap-2 rounded-lg w-full justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {clipboardApiSupported() && (
          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-3 rounded-lg min-w-[200px] w-full bg-white border text-center border-slate-200 font-bold text-sm focus-visible:ring-2 focus-visible:ring-slate-600 focus:outline-none ring-offset-2 active:translate-y-[2px] transition hover:bg-slate-100"
          >
            {copiedText ? "✅ コピーしました" : "クリップボードにコピー"}
          </button>
        )}
        <button
          type="button"
          onClick={handleCopyLink}
          className="px-4 py-3 rounded-lg min-w-[200px] w-full bg-white border text-center border-slate-200 font-bold text-sm focus-visible:ring-2 focus-visible:ring-slate-600 focus:outline-none ring-offset-2 active:translate-y-[2px] transition hover:bg-slate-100"
        >
          {copiedLink ? "✅ コピーしました" : "共有リンクをコピー"}
        </button>
        <a
          href={tweetLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 rounded-lg bg-slate-900 border w-full text-center border-slate-900 text-white font-bold text-sm focus-visible:ring-2 focus-visible:ring-slate-600 focus:outline-none ring-offset-2 active:translate-y-[2px] transition hover:bg-slate-700"
        >
          ポストする
        </a>
      </div>
    </div>
  )
}
