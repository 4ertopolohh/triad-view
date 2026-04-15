import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoBase = '/triad-view/'

const isThreeCoreDependency = (id: string) =>
  id.includes('/three/') ||
  id.includes('\\three\\') ||
  id.includes('/@react-three/fiber/') ||
  id.includes('\\@react-three\\fiber\\')

const isThreeDreiDependency = (id: string) =>
  id.includes('/@react-three/drei/') ||
  id.includes('\\@react-three\\drei\\') ||
  id.includes('/three-stdlib/') ||
  id.includes('\\three-stdlib\\') ||
  id.includes('/camera-controls/') ||
  id.includes('\\camera-controls\\') ||
  id.includes('/meshline/') ||
  id.includes('\\meshline\\') ||
  id.includes('/maath/') ||
  id.includes('\\maath\\') ||
  id.includes('/stats-gl/') ||
  id.includes('\\stats-gl\\') ||
  id.includes('/three-mesh-bvh/') ||
  id.includes('\\three-mesh-bvh\\') ||
  id.includes('/troika-three-text/') ||
  id.includes('\\troika-three-text\\') ||
  id.includes('/troika-three-utils/') ||
  id.includes('\\troika-three-utils\\') ||
  id.includes('/@monogrid/gainmap-js/') ||
  id.includes('\\@monogrid\\gainmap-js\\') ||
  id.includes('/@use-gesture/react/') ||
  id.includes('\\@use-gesture\\react\\')

const isThreeEffectsDependency = (id: string) =>
  id.includes('/@react-three/postprocessing/') ||
  id.includes('\\@react-three\\postprocessing\\') ||
  id.includes('/postprocessing/') ||
  id.includes('\\postprocessing\\') ||
  id.includes('/n8ao/') ||
  id.includes('\\n8ao\\')

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : repoBase,
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined
          }

          if (isThreeEffectsDependency(id)) {
            return 'three-effects'
          }

          if (isThreeDreiDependency(id)) {
            return 'three-drei'
          }

          if (isThreeCoreDependency(id)) {
            return 'three-core'
          }

          if (id.includes('/swiper/') || id.includes('\\swiper\\')) {
            return 'swiper'
          }

          if (id.includes('/react-router/') || id.includes('\\react-router\\')) {
            return 'router'
          }

          if (
            id.includes('/react-dom/') ||
            id.includes('\\react-dom\\') ||
            id.includes('/react/') ||
            id.includes('\\react\\') ||
            id.includes('/scheduler/') ||
            id.includes('\\scheduler\\')
          ) {
            return 'react-vendor'
          }

          return 'vendor'
        },
      },
    },
  },
}))
