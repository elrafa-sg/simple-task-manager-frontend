'use client'
import { GoogleAuth } from '@/utils/googleAuth'

import dynamic from 'next/dynamic'

const TestePage = () => {
    const googleAuth = new GoogleAuth()

    function handleAuth () {
        googleAuth.askPermission()
            .then(permissionResponse => {
                // enviar para salvar no banco
                console.log("calendar token ", permissionResponse.access_token)
            })
            .catch(permissionErrorResponse => {
                console.log("permissionErrorResponse ", permissionErrorResponse)
                // informar ao usuario
            })
    }


    return (
        <main className="flex min-h-screen flex-col items-center pt-20 bg-slate-200">

            <button onClick={() => handleAuth()}>
                GOOGLE AUTH
            </button>

        </main>
    )
}

const Index = dynamic(() => Promise.resolve(TestePage), { ssr: false })

export default Index