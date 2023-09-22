
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
            <body>
                <div className='w-full bg-slate-800 h-16 flex items-center pl-10'>
                    <h2 className='font-mono font-bold text-lg'>APPBAR TEMPORARIA</h2>
                </div>

                {children}
            </body>
        </html>
    )
}
