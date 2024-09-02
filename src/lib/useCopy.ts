import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { copyClipboard } from "./copyClipboard"

export const useCopy = () => {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const copy = useCallback(async (text: string) => {
    await copyClipboard(text)
    setCopied(true)
    timerRef.current = setTimeout(() => setCopied(false), 1500)
  }, [])

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    },
    [],
  )

  return useMemo(() => ({ copied, copy }), [copied, copy])
}
