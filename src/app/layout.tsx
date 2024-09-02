import "./global.css"

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="ja" prefix="og: http://ogp.me/ns#">
      <body className="bg-[#fafaf9]">
        <main>
          <div className="mx-auto max-w-[650px] pt-[80px]">{children}</div>
        </main>
      </body>
    </html>
  )
}

export default RootLayout
