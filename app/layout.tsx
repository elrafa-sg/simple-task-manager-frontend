import './globals.css'

export const metadata = {
  title: 'Simple Task Manager Frontend',
}

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
