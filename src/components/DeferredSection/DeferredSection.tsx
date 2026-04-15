import { Suspense, useEffect, useRef, useState } from 'react'

import { useIntersectionState } from '../../hooks/useIntersectionState'
import type { LazyWithPreloadComponent } from '../../utils/lazyWithPreload'

type DeferredSectionProps = {
  component: LazyWithPreloadComponent
  minHeight: number | string
  rootMargin?: string
}

const hiddenSentinelStyle = {
  height: 0,
  width: '100%',
} as const

const resolvePlaceholderStyle = (minHeight: number | string) => ({
  minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
  width: '100%',
})

const DeferredSection = ({
  component: Component,
  minHeight,
  rootMargin = '1400px 0px',
}: DeferredSectionProps) => {
  const placeholderRef = useRef<HTMLDivElement | null>(null)
  const shouldLoad = useIntersectionState(placeholderRef, {
    fallbackInView: true,
    once: true,
    rootMargin,
  })
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!shouldLoad || isReady) {
      return
    }

    let isCancelled = false

    Component.preload()
      .catch(() => undefined)
      .then(() => {
        if (!isCancelled) {
          setIsReady(true)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [Component, isReady, shouldLoad])

  const placeholderStyle = resolvePlaceholderStyle(minHeight)

  if (!isReady) {
    return <div ref={placeholderRef} aria-hidden="true" style={placeholderStyle} />
  }

  return (
    <>
      <div ref={placeholderRef} aria-hidden="true" style={hiddenSentinelStyle} />
      <Suspense fallback={<div aria-hidden="true" style={placeholderStyle} />}>
        <Component />
      </Suspense>
    </>
  )
}

export default DeferredSection
