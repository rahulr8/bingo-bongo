// Simplified version of use-toast.ts
import { useState } from 'react'

export interface Toast {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (newToast: Toast) => {
    setToasts((prevToasts) => [...prevToasts, newToast])
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1))
    }, 3000)
  }

  return { toast, toasts }
}