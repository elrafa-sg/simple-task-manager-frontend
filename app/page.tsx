'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { FormLogin } from '@/components/FormLogin'
import { Toast, ToastType } from '@/components/Toast'
import { UsuarioService } from '@/services/UsuarioService'

interface ToastState {
  type: ToastType,
  open: boolean,
  message: string,
  timeout: number
}

export default function Index () {
  const [toastState, setToastState] = useState<ToastState>({ type: ToastType.success, open: false, message: '', timeout: 3500 })
  const router = useRouter()

  async function tryLogin (email: string, senha: string) {
    const apiResponse = await UsuarioService.login(email, senha)
    if (apiResponse.status == 200) {
      router.push('/home')
    } else {
      setToastState({
        open: true,
        message: apiResponse?.data.message,
        type: ToastType.danger, timeout: 3500
      })
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-20 bg-slate-200">
      {toastState.open && (
        <Toast message={toastState.message} type={toastState.type}
          closeFunction={() => setToastState({ ...toastState, open: false })}
          timeout={toastState.timeout}
        />
      )}

      <FormLogin loginFunction={tryLogin} />
    </main>
  )
}
