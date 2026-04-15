import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export type LazyWithPreloadComponent = LazyExoticComponent<ComponentType> & {
  preload: () => Promise<unknown>
}

const lazyWithPreload = (factory: () => Promise<{ default: ComponentType }>) => {
  const Component = lazy(factory) as LazyWithPreloadComponent

  Component.preload = factory

  return Component
}

export default lazyWithPreload
