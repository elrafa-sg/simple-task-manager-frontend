'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { FormLogin } from '@/components/FormLogin'
import { Toast, ToastType, ToastState } from '@/components/Toast'
import { UsuarioService } from '@/services/UsuarioService'
import { LocalStorage } from '@/utils/localStorage'
import { Loading } from '@/components/Loading'

export default function Index () {
  const [toastState, setToastState] = useState<ToastState>({ type: ToastType.success, open: false, message: '', timeout: 3500 })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function tryLogin (email: string, senha: string) {
    setIsLoading(true)
    const apiResponse = await UsuarioService.login(email, senha)
    if (apiResponse.status == 200) {
      LocalStorage.setUserToken(apiResponse.data.access_token)
      router.push('/home')
    } else {
      setIsLoading(false)
      setToastState({
        open: true,
        message: apiResponse?.data.message,
        type: ToastType.danger, timeout: 3500
      })
    }
  }

  function goToSignup() {
    setIsLoading(true)
    router.push('/signup')
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-20 bg-slate-200">
      {toastState.open && (
        <Toast message={toastState.message} type={toastState.type}
          closeFunction={() => setToastState({ ...toastState, open: false })}
          timeout={toastState.timeout}
        />
      )}

      {
        isLoading ? (
          <Loading />
        )
          : (
            <div className='flex flex-col gap-2 md:w-1/4 w-5/6 h-auto bg-slate-800 shadow-lg p-6 rounded-sm'>
              <FormLogin loginFunction={tryLogin} />
              <span className='font-mono text-sm text-center underline underline-offset-2'>Ainda não tem uma conta?</span>

              <button className='bg-white text-blue-600 hover:bg-green-400 hover:text-white outline-none rounded-sm p-2'
                onClick={() => goToSignup()}
              >
                <span className='text-lg font-mono font-bold'>Criar conta</span>
              </button>
            </div>
          )
      }
    </main>
  )
}
