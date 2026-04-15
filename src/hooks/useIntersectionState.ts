import { useEffect, useState, type RefObject } from 'react'

export type UseIntersectionStateOptions = {
  enabled?: boolean
  fallbackInView?: boolean
  initialInView?: boolean
  once?: boolean
  rootMargin?: string
  threshold?: number | number[]
}

export const supportsIntersectionObserver = () =>
  typeof window !== 'undefined' && typeof window.IntersectionObserver !== 'undefined'

export function useIntersectionState<T extends Element>(
  ref: RefObject<T | null>,
  {
    enabled = true,
    fallbackInView = false,
    initialInView = false,
    once = false,
    rootMargin = '0px',
    threshold = 0,
  }: UseIntersectionStateOptions = {},
) {
  const [isInView, setIsInView] = useState(() =>
    supportsIntersectionObserver() ? initialInView : fallbackInView,
  )

  useEffect(() => {
    if (!enabled) {
      return
    }

    const element = ref.current
    if (!element) {
      return
    }

    if (!supportsIntersectionObserver()) {
      return
    }

    if (once && isInView) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const nextInView = entry ? entry.isIntersecting : false

        setIsInView((previousInView) => {
          if (previousInView === nextInView) {
            return previousInView
          }

          if (once && previousInView && nextInView) {
            return previousInView
          }

          return nextInView
        })

        if (once && nextInView) {
          observer.unobserve(element)
        }
      },
      {
        rootMargin,
        threshold,
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [enabled, isInView, once, ref, rootMargin, threshold])

  return isInView
}
