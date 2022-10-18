import React, { useState, useEffect, PropsWithChildren } from 'react'

export default function DeferredComponent({ children }: PropsWithChildren<{}>) {
  const [isDeferred, setIsDeferred] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDeferred(true)
    }, 400)
    return () => clearTimeout(timeoutId)
  }, [])

  if (!isDeferred) {
    return null
  }

  return <>{children}</>
}
