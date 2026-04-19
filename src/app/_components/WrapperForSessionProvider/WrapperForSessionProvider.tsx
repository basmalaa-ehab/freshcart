
'use client'
import { SessionProvider } from 'next-auth/react'
import React, { Children, ReactNode } from 'react'

export default function WrapperForSessionProvider({children}:{children : ReactNode}) {
  return (
    <SessionProvider >
{children}
    </SessionProvider>
  )
}
