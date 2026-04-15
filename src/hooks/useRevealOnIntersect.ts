import { useRef } from 'react'

import { useIntersectionState, type UseIntersectionStateOptions } from './useIntersectionState'

type UseRevealOnIntersectOptions = Omit<UseIntersectionStateOptions, 'fallbackInView' | 'once'>

export function useRevealOnIntersect<T extends Element>(options: UseRevealOnIntersectOptions = {}) {
  const ref = useRef<T | null>(null)
  const isVisible = useIntersectionState(ref, {
    ...options,
    once: true,
    fallbackInView: true,
  })

  return {
    ref,
    isVisible,
  }
}
