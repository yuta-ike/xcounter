export const clipboardApiSupported = () => {
  if (typeof navigator === "undefined") {
    return true
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return globalThis.navigator != null
}

export const copyClipboard = async (text: string) => {
  if (clipboardApiSupported()) {
    try {
      await navigator.clipboard.writeText(text)
    } catch (e) {
      console.error(e)
      window.alert("クリップボードへのコピーに失敗しました")
    }
  } else {
    window.alert("このブラウザでは対応していません")
  }
}
