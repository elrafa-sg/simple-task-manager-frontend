'use client'
import { GoogleAuth } from '@/utils/googleAuth'

export default function Index () {
    const googleAuth = new GoogleAuth()

    return (
        <main className="flex min-h-screen flex-col items-center pt-20 bg-slate-200">

            <button onClick={async () => {
                googleAuth.askPermission()
                    .then(permissionResponse => {
                        // enviar para salvar no banco
                        console.log("calendar token ", permissionResponse.access_token)
                    })
                    .catch(permissionErrorResponse => {
                        console.log("permissionErrorResponse ", permissionErrorResponse)
                        // informar ao usuario
                    })
            }}>
                GOOGLE AUTH
            </button>

        </main>
    )
}
