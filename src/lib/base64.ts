export const encodeBase64 = (text: string) => {
  return btoa(
    Array.from(new TextEncoder().encode(text))
      .map((byte) => String.fromCharCode(byte))
      .join(""),
  )
}

export const decodeBase64 = (base64: string) => {
  return new TextDecoder().decode(
    new Uint8Array(
      atob(base64)
        .split("")
        .map((char) => char.charCodeAt(0)),
    ),
  )
}
