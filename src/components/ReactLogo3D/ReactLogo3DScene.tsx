import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Center, Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom, SSAO, Vignette, Noise, ToneMapping } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import {
  MathUtils,
  MeshPhysicalMaterial,
  SphereGeometry,
  TorusGeometry,
  type Group,
  type Mesh,
  type WebGLRenderer,
} from 'three'
import {
  createAdaptiveCounters,
  evaluateAdaptiveQuality,
  resolveAutoQualityPolicy,
  type QualityMode,
  type QualityTier,
} from './adaptiveQuality'

type QualityPreset = {
  fps: number
  interactive: boolean
  dpr: [number, number]
  envResolution: number
  shadowMapSize: number
  multisampling: number
  ssaoSamples: number
  noiseOpacity: number
  coreSegments: number
  ringRadialSegments: number
  ringTubularSegments: readonly [number, number]
}

type ReactAtomProps = {
  scale?: number
  interactive?: boolean
  active?: boolean
  coreSegments: number
  ringRadialSegments: number
  ringTubularSegments: readonly [number, number]
  stylePreset: 'metallic' | 'black' | 'white'
}

type RingParams = {
  radius: number
  tube: number
  baseRot: readonly [number, number, number]
  offset: readonly [number, number, number]
  seed: number
  dir: 1 | -1
  speed: readonly [number, number, number]
}

type ReactLogo3DSceneProps = {
  isOptimised: boolean
  active: boolean
  interactive: boolean
  qualityMode?: QualityMode
  stylePreset?: 'metallic' | 'black' | 'white'
}

type LightformerPreset = {
  intensity: number
  color: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
}

type LogoStylePreset = {
  chromeProps: {
    metalness: number
    roughness: number
    envMapIntensity: number
    clearcoat: number
    clearcoatRoughness: number
    ior: number
    reflectivity: number
    specularIntensity: number
    specularColor: string
  }
  coreMaterial: {
    color: string
    emissive: string
    emissiveIntensity: number
    roughness?: number
    metalness?: number
    clearcoat?: number
    envMapIntensity?: number
  }
  ringMaterial: {
    color: string
    emissive: string
    emissiveIntensity: number
    roughness?: number
    metalness?: number
    clearcoat?: number
    envMapIntensity?: number
  }
  ambientIntensity: number
  keyLight: {
    intensity: number
    color: string
  }
  fillLight: {
    intensity: number
    color: string
  }
  rimLight: {
    intensity: number
    color: string
  }
  lightformers: readonly LightformerPreset[]
  effects: {
    ssaoIntensity: number
    ssaoLuminanceInfluence: number
    bloomIntensity: number
    bloomThreshold: number
    bloomSmoothing: number
    vignetteOffset: number
    vignetteDarkness: number
    noiseOpacityFactor: number
  }
}

const LOGO_STYLE_PRESETS: Record<'metallic' | 'black' | 'white', LogoStylePreset> = {
  metallic: {
    chromeProps: {
      metalness: 1,
      roughness: 0.03,
      envMapIntensity: 2.45,
      clearcoat: 1,
      clearcoatRoughness: 0.015,
      ior: 1.5,
      reflectivity: 1,
      specularIntensity: 1,
      specularColor: '#dbe7ff',
    },
    coreMaterial: {
      color: '#f7f9fe',
      emissive: '#8b8e95',
      emissiveIntensity: 0.04,
    },
    ringMaterial: {
      color: '#eef3fc',
      emissive: '#8b8e95',
      emissiveIntensity: 0.06,
    },
    ambientIntensity: 0.18,
    keyLight: {
      intensity: 2.55,
      color: '#f8fbff',
    },
    fillLight: {
      intensity: 0.95,
      color: '#cfdfff',
    },
    rimLight: {
      intensity: 1.05,
      color: '#7c7e81',
    },
    lightformers: [
      { intensity: 10.5, color: '#ffffff', position: [0, 0.6, 3.5], rotation: [0, 0, 0], scale: [12, 2.2, 1] },
      { intensity: 7.8, color: '#dbe7ff', position: [4.5, 0.2, 0], rotation: [0, Math.PI / 2, 0], scale: [10, 3.5, 1] },
      { intensity: 6.2, color: '#edf3ff', position: [0, -0.6, -3.5], rotation: [0, Math.PI, 0], scale: [10, 2.8, 1] },
      { intensity: 3.4, color: '#f3f7ff', position: [0, 5, 0], rotation: [Math.PI / 2, 0, 0], scale: [12, 12, 1] },
    ],
    effects: {
      ssaoIntensity: 8.4,
      ssaoLuminanceInfluence: 0.58,
      bloomIntensity: 0.38,
      bloomThreshold: 0.92,
      bloomSmoothing: 0.2,
      vignetteOffset: 0.22,
      vignetteDarkness: 0.46,
      noiseOpacityFactor: 0.78,
    },
  },
  black: {
    chromeProps: {
      metalness: 0.14,
      roughness: 0.42,
      envMapIntensity: 1.05,
      clearcoat: 0.18,
      clearcoatRoughness: 0.48,
      ior: 1.5,
      reflectivity: 0.5,
      specularIntensity: 0.42,
      specularColor: '#000000',
    },
    coreMaterial: {
      color: '#000000',
      emissive: '#000000',
      emissiveIntensity: 0.08,
      roughness: 0.5,
      metalness: 0.08,
      clearcoat: 0.12,
      envMapIntensity: 0.92,
    },
    ringMaterial: {
      color: '#000000',
      emissive: '#000000',
      emissiveIntensity: 0.12,
      roughness: 0.34,
      metalness: 0.18,
      clearcoat: 0.24,
      envMapIntensity: 1.18,
    },
    ambientIntensity: 0.3,
    keyLight: {
      intensity: 1.9,
      color: '#f8fbff',
    },
    fillLight: {
      intensity: 0.92,
      color: '#dfe9fb',
    },
    rimLight: {
      intensity: 0.68,
      color: '#eef2f8',
    },
    lightformers: [
      { intensity: 7.5, color: '#ffffff', position: [0, 0.6, 3.5], rotation: [0, 0, 0], scale: [12, 2.2, 1] },
      { intensity: 5.4, color: '#d8e5fd', position: [4.5, 0.2, 0], rotation: [0, Math.PI / 2, 0], scale: [10, 3.5, 1] },
      { intensity: 4.5, color: '#f2f4f8', position: [0, -0.6, -3.5], rotation: [0, Math.PI, 0], scale: [10, 2.8, 1] },
      { intensity: 2.2, color: '#f9fafc', position: [0, 5, 0], rotation: [Math.PI / 2, 0, 0], scale: [12, 12, 1] },
    ],
    effects: {
      ssaoIntensity: 7.5,
      ssaoLuminanceInfluence: 0.55,
      bloomIntensity: 0.22,
      bloomThreshold: 0.96,
      bloomSmoothing: 0.24,
      vignetteOffset: 0.18,
      vignetteDarkness: 0.4,
      noiseOpacityFactor: 0.65,
    },
  },
  white: {
    chromeProps: {
      metalness: 0.14,
      roughness: 0.42,
      envMapIntensity: 1.05,
      clearcoat: 0.18,
      clearcoatRoughness: 0.48,
      ior: 1.5,
      reflectivity: 0.5,
      specularIntensity: 0.42,
      specularColor: '#ffffff',
    },
    coreMaterial: {
      color: '#fbfbfc',
      emissive: '#eff3f9',
      emissiveIntensity: 0.08,
      roughness: 0.5,
      metalness: 0.08,
      clearcoat: 0.12,
      envMapIntensity: 0.92,
    },
    ringMaterial: {
      color: '#f1f4f9',
      emissive: '#e8edf7',
      emissiveIntensity: 0.12,
      roughness: 0.34,
      metalness: 0.18,
      clearcoat: 0.24,
      envMapIntensity: 1.18,
    },
    ambientIntensity: 0.3,
    keyLight: {
      intensity: 1.9,
      color: '#f8fbff',
    },
    fillLight: {
      intensity: 0.92,
      color: '#dfe9fb',
    },
    rimLight: {
      intensity: 0.68,
      color: '#eef2f8',
    },
    lightformers: [
      { intensity: 7.5, color: '#ffffff', position: [0, 0.6, 3.5], rotation: [0, 0, 0], scale: [12, 2.2, 1] },
      { intensity: 5.4, color: '#d8e5fd', position: [4.5, 0.2, 0], rotation: [0, Math.PI / 2, 0], scale: [10, 3.5, 1] },
      { intensity: 4.5, color: '#f2f4f8', position: [0, -0.6, -3.5], rotation: [0, Math.PI, 0], scale: [10, 2.8, 1] },
      { intensity: 2.2, color: '#f9fafc', position: [0, 5, 0], rotation: [Math.PI / 2, 0, 0], scale: [12, 12, 1] },
    ],
    effects: {
      ssaoIntensity: 7.5,
      ssaoLuminanceInfluence: 0.55,
      bloomIntensity: 0.22,
      bloomThreshold: 0.96,
      bloomSmoothing: 0.24,
      vignetteOffset: 0.18,
      vignetteDarkness: 0.4,
      noiseOpacityFactor: 0.65,
    },
  },
}

const RING_PARAMS: readonly RingParams[] = [
  {
    radius: 0.4,
    tube: 0.018,
    baseRot: [0.5, 0.08, 0.12],
    offset: [0, 0, 0],
    seed: 1.15,
    dir: 1,
    speed: [0.88, 0.32, 0.68],
  },
  {
    radius: 0.47,
    tube: 0.017,
    baseRot: [0.14, 0.72, Math.PI / 3],
    offset: [0, 0, 0],
    seed: 2.35,
    dir: -1,
    speed: [0.56, 0.8, 0.34],
  },
  {
    radius: 0.54,
    tube: 0.016,
    baseRot: [0.1, 0.22, (2 * Math.PI) / 3],
    offset: [0, 0, 0],
    seed: 3.75,
    dir: 1,
    speed: [0.42, 0.58, 0.92],
  },
  {
    radius: 0.61,
    tube: 0.016,
    baseRot: [0.62, 0.4, Math.PI / 5],
    offset: [0, 0, 0],
    seed: 4.55,
    dir: -1,
    speed: [0.48, 0.44, 0.72],
  },
  {
    radius: 0.68,
    tube: 0.015,
    baseRot: [0.24, 0.92, (4 * Math.PI) / 5],
    offset: [0, 0, 0],
    seed: 5.45,
    dir: 1,
    speed: [0.38, 0.62, 0.54],
  },
  {
    radius: 0.75,
    tube: 0.014,
    baseRot: [0.74, 0.16, (7 * Math.PI) / 10],
    offset: [0, 0, 0],
    seed: 6.35,
    dir: -1,
    speed: [0.34, 0.5, 0.84],
  },
] as const

const CAMERA = { position: [0, 0, 2.5] as [number, number, number], fov: 42 }
const GL_CONFIG = {
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance' as const,
}

const TAU = Math.PI * 2
const POINTER_EVENT_OPTIONS: AddEventListenerOptions = { passive: true }
const wrapAngle = (angle: number) => ((angle % TAU) + TAU) % TAU

const QUALITY_PRESETS: Record<QualityTier, QualityPreset> = {
  strong: {
    fps: 30,
    interactive: false,
    dpr: [0.9, 1.0],
    envResolution: 256,
    shadowMapSize: 256,
    multisampling: 0,
    ssaoSamples: 4,
    noiseOpacity: 0.06,
    coreSegments: 32,
    ringRadialSegments: 22,
    ringTubularSegments: [128, 112],
  },
  low: {
    fps: 30,
    interactive: true,
    dpr: [1.0, 1.2],
    envResolution: 384,
    shadowMapSize: 384,
    multisampling: 1,
    ssaoSamples: 6,
    noiseOpacity: 0.07,
    coreSegments: 40,
    ringRadialSegments: 24,
    ringTubularSegments: [160, 144],
  },
  medium: {
    fps: 50,
    interactive: true,
    dpr: [1.1, 1.4],
    envResolution: 512,
    shadowMapSize: 512,
    multisampling: 3,
    ssaoSamples: 8,
    noiseOpacity: 0.09,
    coreSegments: 48,
    ringRadialSegments: 28,
    ringTubularSegments: [224, 192],
  },
  high: {
    fps: 60,
    interactive: true,
    dpr: [1.35, 1.85],
    envResolution: 1024,
    shadowMapSize: 1024,
    multisampling: 4,
    ssaoSamples: 10,
    noiseOpacity: 0.09,
    coreSegments: 64,
    ringRadialSegments: 28,
    ringTubularSegments: [320, 256],
  },
}

const ADAPTIVE_WINDOW_MS = 2400
const ADAPTIVE_MIN_SAMPLES = 36

type FrameLimiterProps = {
  active: boolean
  fps: number
}

function FrameLimiter({ active, fps }: FrameLimiterProps) {
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    if (!active) return

    const frameDurationMs = Math.max(1, Math.floor(1000 / fps))
    invalidate()

    const timerId = window.setInterval(() => {
      invalidate()
    }, frameDurationMs)

    return () => {
      window.clearInterval(timerId)
    }
  }, [active, fps, invalidate])

  return null
}

type AdaptiveQualityControllerProps = {
  active: boolean
  enabled: boolean
  qualityTier: QualityTier
  maxTier: QualityTier
  onTierChange: (nextTier: QualityTier) => void
}

function AdaptiveQualityController({
  active,
  enabled,
  qualityTier,
  maxTier,
  onTierChange,
}: AdaptiveQualityControllerProps) {
  const frameCountRef = useRef(0)
  const frameTimeTotalMsRef = useRef(0)
  const windowStartMsRef = useRef(0)
  const countersRef = useRef(createAdaptiveCounters())
  const lastTierChangeMsRef = useRef(0)

  useEffect(() => {
    const now = performance.now()
    frameCountRef.current = 0
    frameTimeTotalMsRef.current = 0
    windowStartMsRef.current = now

    if (!active || !enabled) {
      countersRef.current = createAdaptiveCounters()
    }
  }, [active, enabled, qualityTier])

  useFrame((_, delta) => {
    if (!active || !enabled) return

    const now = performance.now()

    if (windowStartMsRef.current === 0) {
      windowStartMsRef.current = now
    }

    frameCountRef.current += 1
    frameTimeTotalMsRef.current += delta * 1000

    const windowElapsedMs = now - windowStartMsRef.current
    if (windowElapsedMs < ADAPTIVE_WINDOW_MS || frameCountRef.current < ADAPTIVE_MIN_SAMPLES) {
      return
    }

    const averageFrameMs = frameTimeTotalMsRef.current / frameCountRef.current
    const frameBudgetMs = 1000 / QUALITY_PRESETS[qualityTier].fps
    const timeSinceTierChangeMs = now - lastTierChangeMsRef.current

    const nextQualityDecision = evaluateAdaptiveQuality({
      averageFrameMs,
      frameBudgetMs,
      counters: countersRef.current,
      timeSinceTierChangeMs,
      qualityTier,
      maxTier,
    })

    countersRef.current = nextQualityDecision.counters

    if (nextQualityDecision.tierChanged) {
      lastTierChangeMsRef.current = now
      onTierChange(nextQualityDecision.nextTier)
    }

    frameCountRef.current = 0
    frameTimeTotalMsRef.current = 0
    windowStartMsRef.current = now
  })

  return null
}

function ReactAtom({
  scale = 1,
  interactive = true,
  active = true,
  coreSegments,
  ringRadialSegments,
  ringTubularSegments,
  stylePreset,
}: ReactAtomProps) {
  const group = useRef<Group | null>(null)
  const core = useRef<Mesh | null>(null)
  const ringsPivot = useRef<Group | null>(null)
  const rings = useRef<Array<Mesh | null>>([])

  const { gl } = useThree()

  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })
  const targetRot = useRef({ x: 0, y: 0 })
  const currentRot = useRef({ x: 0, y: 0 })
  const materialPreset = LOGO_STYLE_PRESETS[stylePreset]

  const coreGeometry = useMemo(() => new SphereGeometry(0.14, coreSegments, coreSegments), [coreSegments])
  const ringGeometries = useMemo(
    () =>
      RING_PARAMS.map((params, index) => {
        const tubularSegments = index < 2 ? ringTubularSegments[0] : ringTubularSegments[1]
        return new TorusGeometry(params.radius, params.tube, ringRadialSegments, tubularSegments)
      }),
    [ringRadialSegments, ringTubularSegments],
  )
  const coreMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        ...materialPreset.chromeProps,
        ...materialPreset.coreMaterial,
      }),
    [materialPreset],
  )
  const ringMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        ...materialPreset.chromeProps,
        ...materialPreset.ringMaterial,
      }),
    [materialPreset],
  )

  useEffect(() => {
    return () => {
      coreGeometry.dispose()

      for (const geometry of ringGeometries) {
        geometry.dispose()
      }

      coreMaterial.dispose()
      ringMaterial.dispose()
    }
  }, [coreGeometry, ringGeometries, coreMaterial, ringMaterial])

  useEffect(() => {
    if (!interactive || !active) return

    const element = gl.domElement

    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return

      const dx = event.clientX - last.current.x
      const dy = event.clientY - last.current.y

      if (dx === 0 && dy === 0) return

      last.current.x = event.clientX
      last.current.y = event.clientY

      const speed = 0.006
      targetRot.current.y += dx * speed
      targetRot.current.x += dy * speed
      targetRot.current.x = MathUtils.clamp(targetRot.current.x, -1.1, 1.1)
    }

    const stopDrag = (event: PointerEvent) => {
      dragging.current = false
      element.releasePointerCapture?.(event.pointerId)

      window.removeEventListener('pointerup', stopDrag)
      window.removeEventListener('pointercancel', stopDrag)
      window.removeEventListener('pointermove', onMove)
    }

    const onDown = (event: PointerEvent) => {
      dragging.current = true
      last.current.x = event.clientX
      last.current.y = event.clientY
      element.setPointerCapture?.(event.pointerId)

      window.addEventListener('pointerup', stopDrag, POINTER_EVENT_OPTIONS)
      window.addEventListener('pointercancel', stopDrag, POINTER_EVENT_OPTIONS)
      window.addEventListener('pointermove', onMove, POINTER_EVENT_OPTIONS)
    }

    element.addEventListener('pointerdown', onDown, POINTER_EVENT_OPTIONS)

    return () => {
      dragging.current = false
      element.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', stopDrag)
      window.removeEventListener('pointercancel', stopDrag)
      window.removeEventListener('pointermove', onMove)
    }
  }, [gl, interactive, active])

  useEffect(() => {
    if (!active) {
      dragging.current = false
    }
  }, [active])

  useFrame((state, delta) => {
    if (!active) return

    const elapsed = state.clock.getElapsedTime()

    if (group.current) {
      group.current.position.y = Math.sin(elapsed * 0.9) * 0.01
    }

    if (core.current) {
      const scalePulse = 1 + Math.sin(elapsed * 1.6) * 0.015 + Math.sin(elapsed * 0.9) * 0.008
      core.current.scale.setScalar(scalePulse)
      core.current.position.y = Math.sin(elapsed * 1.15) * 0.045
      core.current.position.x = Math.sin(elapsed * 0.85) * 0.012
      core.current.position.z = Math.cos(elapsed * 0.75) * 0.01
    }

    const damp = 1 - Math.exp(-delta * 12)
    currentRot.current.x = MathUtils.lerp(currentRot.current.x, interactive ? targetRot.current.x : 0, damp)
    currentRot.current.y = MathUtils.lerp(currentRot.current.y, interactive ? targetRot.current.y : 0, damp)

    if (ringsPivot.current) {
      ringsPivot.current.rotation.x = currentRot.current.x
      ringsPivot.current.rotation.y = currentRot.current.y
      ringsPivot.current.rotation.z = 0
    }

    for (let index = 0; index < RING_PARAMS.length; index += 1) {
      const ring = rings.current[index]
      const params = RING_PARAMS[index]

      if (!ring || !params) continue

      const seed = params.seed
      const direction = params.dir
      const speedScale = 0.65

      const sx = direction * elapsed * params.speed[0] * speedScale
      const sy = -direction * elapsed * params.speed[1] * speedScale
      const sz = direction * elapsed * params.speed[2] * speedScale

      const pre = elapsed * (0.22 + index * 0.05) + seed
      const preX = Math.sin(pre) * 0.28
      const preY = Math.cos(pre * 0.9) * 0.24

      const nut = Math.sin(elapsed * (0.95 + index * 0.12) + seed * 1.7) * 0.1

      const wobX = Math.sin(elapsed * 1.6 + seed) * 0.045
      const wobY = Math.cos(elapsed * 1.3 + seed * 2) * 0.045
      const wobZ = Math.sin(elapsed * 1.1 + seed * 3) * 0.035

      const rx = params.baseRot[0] + sx + preX + wobX
      const ry = params.baseRot[1] + sy + preY + wobY
      const rz = params.baseRot[2] + sz + nut + wobZ

      ring.rotation.set(wrapAngle(rx), wrapAngle(ry), wrapAngle(rz))
    }
  })

  return (
    <group ref={group} scale={scale}>
      <mesh ref={core} castShadow geometry={coreGeometry} material={coreMaterial} />

      <group ref={ringsPivot}>
        {RING_PARAMS.map((params, index) => (
          <mesh
            key={index}
            ref={(element) => {
              rings.current[index] = element
            }}
            position={params.offset}
            castShadow
            geometry={ringGeometries[index]}
            material={ringMaterial}
          />
        ))}
      </group>
    </group>
  )
}

type ReactLogo3DSceneCanvasProps = ReactLogo3DSceneProps & {
  adaptiveEnabled: boolean
  initialQualityTier: QualityTier
  maxAdaptiveTier: QualityTier
}

const ReactLogo3DSceneCanvas = memo(function ReactLogo3DSceneCanvas({
  isOptimised,
  active,
  interactive,
  adaptiveEnabled,
  initialQualityTier,
  maxAdaptiveTier,
  stylePreset = 'black',
}: ReactLogo3DSceneCanvasProps) {
  const visualPreset = LOGO_STYLE_PRESETS[stylePreset]
  const [qualityTier, setQualityTier] = useState<QualityTier>(initialQualityTier)

  const qualityPreset = QUALITY_PRESETS[qualityTier]
  const activeMultisampling = active ? qualityPreset.multisampling : 0
  const activeSsaoSamples = active ? qualityPreset.ssaoSamples : 2
  const interactiveEnabled = interactive && qualityPreset.interactive
  const canvasFrameloop = isOptimised ? 'demand' : active ? 'always' : 'never'

  return (
    <Canvas
      shadows
      camera={CAMERA}
      dpr={qualityPreset.dpr}
      frameloop={canvasFrameloop}
      gl={GL_CONFIG}
      onCreated={({ gl }) => {
        const typed = gl as WebGLRenderer & { physicallyCorrectLights?: boolean }

        if ('physicallyCorrectLights' in typed) {
          typed.physicallyCorrectLights = true
        }

        gl.setClearColor(0x000000, 0)
      }}
    >
      <ambientLight intensity={visualPreset.ambientIntensity} />

      <directionalLight
        position={[3.5, 4.2, 3.5]}
        intensity={visualPreset.keyLight.intensity}
        color={visualPreset.keyLight.color}
        castShadow
        shadow-mapSize-width={qualityPreset.shadowMapSize}
        shadow-mapSize-height={qualityPreset.shadowMapSize}
        shadow-camera-near={0.1}
        shadow-camera-far={15}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />
      <directionalLight position={[-4, 1.5, 2]} intensity={visualPreset.fillLight.intensity} color={visualPreset.fillLight.color} />
      <directionalLight position={[0, 2.5, -4]} intensity={visualPreset.rimLight.intensity} color={visualPreset.rimLight.color} />

      <Environment resolution={qualityPreset.envResolution} background={false} blur={0.12}>
        {visualPreset.lightformers.map((lightformer, index) => (
          <Lightformer
            key={index}
            intensity={lightformer.intensity}
            color={lightformer.color}
            position={lightformer.position}
            rotation={lightformer.rotation}
            scale={lightformer.scale}
          />
        ))}
      </Environment>

      <Center>
        <ReactAtom
          scale={1.15}
          interactive={interactiveEnabled}
          active={active}
          coreSegments={qualityPreset.coreSegments}
          ringRadialSegments={qualityPreset.ringRadialSegments}
          ringTubularSegments={qualityPreset.ringTubularSegments}
          stylePreset={stylePreset}
        />
      </Center>

      {isOptimised && <FrameLimiter active={active} fps={qualityPreset.fps} />}

      <AdaptiveQualityController
        active={active}
        enabled={adaptiveEnabled}
        qualityTier={qualityTier}
        maxTier={maxAdaptiveTier}
        onTierChange={setQualityTier}
      />

      <EffectComposer multisampling={activeMultisampling}>
        <ToneMapping />
        <SSAO
          samples={activeSsaoSamples}
          radius={0.11}
          intensity={visualPreset.effects.ssaoIntensity}
          luminanceInfluence={visualPreset.effects.ssaoLuminanceInfluence}
        />
        <Bloom
          intensity={visualPreset.effects.bloomIntensity}
          luminanceThreshold={visualPreset.effects.bloomThreshold}
          luminanceSmoothing={visualPreset.effects.bloomSmoothing}
        />
        <Vignette
          eskil={false}
          offset={visualPreset.effects.vignetteOffset}
          darkness={visualPreset.effects.vignetteDarkness}
        />
        <Noise
          premultiply
          blendFunction={BlendFunction.SOFT_LIGHT}
          opacity={qualityPreset.noiseOpacity * visualPreset.effects.noiseOpacityFactor}
        />
      </EffectComposer>
    </Canvas>
  )
})

const ReactLogo3DScene = memo(function ReactLogo3DScene({
  isOptimised,
  active,
  interactive,
  qualityMode = 'auto',
  stylePreset = 'black',
}: ReactLogo3DSceneProps) {
  const autoQualityPolicy = useMemo(() => resolveAutoQualityPolicy(), [])
  const resolvedMode: QualityMode = isOptimised ? qualityMode : 'high'
  const adaptiveEnabled = resolvedMode === 'auto'
  const fixedTier: QualityTier | null = resolvedMode === 'auto' ? null : resolvedMode
  const initialQualityTier = adaptiveEnabled ? autoQualityPolicy.initialTier : fixedTier ?? 'high'
  const maxAdaptiveTier = adaptiveEnabled ? autoQualityPolicy.maxTier : fixedTier ?? 'high'
  const sceneKey = `${resolvedMode}-${autoQualityPolicy.initialTier}-${maxAdaptiveTier}-${stylePreset}`

  return (
    <ReactLogo3DSceneCanvas
      key={sceneKey}
      active={active}
      adaptiveEnabled={adaptiveEnabled}
      initialQualityTier={initialQualityTier}
      interactive={interactive}
      isOptimised={isOptimised}
      maxAdaptiveTier={maxAdaptiveTier}
      qualityMode={qualityMode}
      stylePreset={stylePreset}
    />
  )
})

export default ReactLogo3DScene
