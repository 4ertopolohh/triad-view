import { Suspense, lazy, useEffect, useRef, useState } from 'react'

import DefaultLoader from '../DefaultLoader/DefaultLoader'
import styles from './ReactLogo3D.module.scss'

type AdaptiveOptimisationMode = 'on' | 'off'
type ReactLogo3DStylePreset = 'metallic' | 'black' | 'white'

type ReactLogo3DProps = {
  width?: number | string
  height?: number | string
  renderOnView?: boolean
  optimisation?: AdaptiveOptimisationMode
  adaptiveOptimisation?: AdaptiveOptimisationMode
  qualityMode?: 'auto' | 'strong' | 'low' | 'medium' | 'high'
  stylePreset?: ReactLogo3DStylePreset
}

const ReactLogo3DScene = lazy(() => import('../ReactLogo3D/ReactLogo3DScene'))

const fallbackStyle = { width: '100%', height: '100%' }

function usePageVisible() {
  const [visible, setVisible] = useState(() => document.visibilityState !== 'hidden')

  useEffect(() => {
    const onChange = () => {
      const nextVisible = document.visibilityState !== 'hidden'
      setVisible((prevVisible) => (prevVisible === nextVisible ? prevVisible : nextVisible))
    }

    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  return visible
}

const ReactLogo3D = ({
  width = '50%',
  height = 550,
  renderOnView = true,
  optimisation = 'on',
  adaptiveOptimisation,
  qualityMode = 'auto',
  stylePreset = 'black',
}: ReactLogo3DProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isInViewport, setIsInViewport] = useState(!renderOnView)
  const pageVisible = usePageVisible()

  const optimisationMode = adaptiveOptimisation ?? optimisation
  const isOptimised = optimisationMode === 'on'

  useEffect(() => {
    if (!renderOnView) return

    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const nextInViewport = entry ? entry.isIntersecting : false

        setIsInViewport((prevInViewport) => (prevInViewport === nextInViewport ? prevInViewport : nextInViewport))
      },
      { threshold: 0.01, rootMargin: '600px 0px 600px 0px' },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [renderOnView])

  const active = isInViewport && pageVisible

  return (
    <div
      className={styles.reactLogo3D}
      ref={containerRef}
      style={{
        width,
        height,
      }}
    >
      <Suspense fallback={<DefaultLoader variant="inline" />}>
        {isInViewport ? (
          <ReactLogo3DScene
            active={active}
            isOptimised={isOptimised}
            interactive={active}
            qualityMode={qualityMode}
            stylePreset={stylePreset}
          />
        ) : (
          <div style={fallbackStyle} />
        )}
      </Suspense>
    </div>
  )
}

export default ReactLogo3D
