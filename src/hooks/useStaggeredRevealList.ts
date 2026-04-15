import { useCallback, useEffect, useRef, useState } from 'react'

import { supportsIntersectionObserver } from './useIntersectionState'

type UseStaggeredRevealListOptions = {
  rootMargin?: string
  threshold?: number | number[]
}

export function useStaggeredRevealList<T extends HTMLElement>(
  itemCount: number,
  {
    rootMargin = '0px',
    threshold = 0,
  }: UseStaggeredRevealListOptions = {},
) {
  const revealRefs = useRef<Array<T | null>>([])
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() =>
    Array.from({ length: itemCount }, () => !supportsIntersectionObserver()),
  )

  const setItemRef = useCallback((index: number, node: T | null) => {
    revealRefs.current[index] = node
  }, [])

  useEffect(() => {
    if (!supportsIntersectionObserver()) {
      return
    }

    const revealElements = revealRefs.current.filter((element): element is T => element !== null)
    if (revealElements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const itemIndex = Number(entry.target.getAttribute('data-reveal-index'))
          if (Number.isNaN(itemIndex)) {
            return
          }

          setVisibleItems((previousVisibleItems) => {
            if (previousVisibleItems[itemIndex]) {
              return previousVisibleItems
            }

            const nextVisibleItems = [...previousVisibleItems]
            nextVisibleItems[itemIndex] = true

            return nextVisibleItems
          })

          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin,
        threshold,
      },
    )

    revealElements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [rootMargin, threshold])

  return {
    setItemRef,
    visibleItems,
  }
}
