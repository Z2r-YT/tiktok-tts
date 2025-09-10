import './globals.css'

export const metadata = {
  title: 'TikTok TTS Generator',
  description: 'Generate text-to-speech audio using TikTok&apos;s TTS API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}