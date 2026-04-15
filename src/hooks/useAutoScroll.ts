import { useEffect } from 'react'

type UseAutoScrollOptions = {
  enabled?: boolean
  delayMs?: number
  speedPxPerSecond?: number
}

export function useAutoScroll({
  enabled = false,
  delayMs = 10000,
  speedPxPerSecond = 150,
}: UseAutoScrollOptions = {}) {
  useEffect(() => {
    if (!enabled) {
      return
    }

    let timeoutId = 0
    let animationFrameId = 0
    let lastTimestamp: number | null = null
    let stopped = false

    const stopScroll = () => {
      stopped = true

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }

    const step = (timestamp: number) => {
      if (stopped) {
        return
      }

      const previousTimestamp = lastTimestamp ?? timestamp
      const deltaMs = timestamp - previousTimestamp
      lastTimestamp = timestamp

      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight
      if (window.scrollY >= maxScrollTop) {
        stopScroll()
        return
      }

      const nextScrollTop = Math.min(window.scrollY + (speedPxPerSecond * deltaMs) / 1000, maxScrollTop)
      window.scrollTo({ top: nextScrollTop, behavior: 'auto' })

      animationFrameId = window.requestAnimationFrame(step)
    }

    const onUserInterrupt = () => {
      stopScroll()
    }

    timeoutId = window.setTimeout(() => {
      lastTimestamp = null
      animationFrameId = window.requestAnimationFrame(step)
    }, delayMs)

    window.addEventListener('wheel', onUserInterrupt, { passive: true })
    window.addEventListener('touchstart', onUserInterrupt, { passive: true })
    window.addEventListener('keydown', onUserInterrupt)
    window.addEventListener('mousedown', onUserInterrupt)

    return () => {
      window.clearTimeout(timeoutId)
      stopScroll()
      window.removeEventListener('wheel', onUserInterrupt)
      window.removeEventListener('touchstart', onUserInterrupt)
      window.removeEventListener('keydown', onUserInterrupt)
      window.removeEventListener('mousedown', onUserInterrupt)
    }
  }, [delayMs, enabled, speedPxPerSecond])
}
