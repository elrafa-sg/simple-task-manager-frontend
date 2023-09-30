import { GoogleAuth } from '@/utils/googleAuth'

export default function Index () {
    const googleAuth = new GoogleAuth()

    return (
        <main className="flex min-h-screen flex-col items-center pt-20 bg-slate-200">

            <button onClick={async () => {
                const creds = await googleAuth.askPermission()
                console.log('creds response -> ', creds)
            }}>
                GOOGLE AUTH
            </button>

        </main>
    )
}
