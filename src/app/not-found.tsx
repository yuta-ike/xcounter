import Link from "next/link"

import type { NextPage } from "next"

const NotFount: NextPage = () => {
  return (
    <>
      <p>申し訳ありません。ページが見つかりませんでした。</p>
      <Link href="/">トップに戻る</Link>
    </>
  )
}

export default NotFount
