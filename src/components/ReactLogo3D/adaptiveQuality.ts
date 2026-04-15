export type QualityTier = 'strong' | 'low' | 'medium' | 'high'
export type QualityMode = 'auto' | QualityTier

export type AutoQualityPolicy = {
  initialTier: QualityTier
  maxTier: QualityTier
}

export type AutoQualitySignals = {
  prefersReducedMotion: boolean
  saveDataEnabled: boolean
  memory: number
  cores: number
  isMobile: boolean
}

type NavigatorWithHints = Navigator & {
  deviceMemory?: number
  connection?: {
    saveData?: boolean
  }
}

export type AdaptiveCounters = {
  overBudgetHits: number
  underBudgetHits: number
}

export type AdaptiveQualityEvaluationInput = {
  averageFrameMs: number
  frameBudgetMs: number
  counters: AdaptiveCounters
  timeSinceTierChangeMs: number
  qualityTier: QualityTier
  maxTier: QualityTier
}

export type AdaptiveQualityEvaluationResult = {
  nextTier: QualityTier
  counters: AdaptiveCounters
  tierChanged: boolean
}

const MOBILE_DEVICE_REGEX = /Android|iPhone|iPad|iPod|Mobile/i
const QUALITY_ORDER: readonly QualityTier[] = ['strong', 'low', 'medium', 'high']

const ADAPTIVE_OVER_BUDGET_RATIO = 1.2
const ADAPTIVE_UNDER_BUDGET_RATIO = 0.72
const ADAPTIVE_DOWNGRADE_HITS = 2
const ADAPTIVE_UPGRADE_HITS = 3
const ADAPTIVE_DOWNGRADE_COOLDOWN_MS = 3000
const ADAPTIVE_UPGRADE_COOLDOWN_MS = 9000

const getTierIndex = (tier: QualityTier) => QUALITY_ORDER.indexOf(tier)

export const createAdaptiveCounters = (): AdaptiveCounters => ({
  overBudgetHits: 0,
  underBudgetHits: 0,
})

export const getLowerQualityTier = (tier: QualityTier): QualityTier => {
  const currentIndex = getTierIndex(tier)
  return QUALITY_ORDER[Math.max(0, currentIndex - 1)] ?? tier
}

export const getHigherQualityTier = (tier: QualityTier, maxTier: QualityTier): QualityTier => {
  const currentIndex = getTierIndex(tier)
  const maxIndex = getTierIndex(maxTier)
  return QUALITY_ORDER[Math.min(maxIndex, currentIndex + 1)] ?? tier
}

export const resolveAutoQualityPolicyFromSignals = ({
  prefersReducedMotion,
  saveDataEnabled,
  memory,
  cores,
  isMobile,
}: AutoQualitySignals): AutoQualityPolicy => {
  if (prefersReducedMotion || saveDataEnabled) {
    return { initialTier: 'strong', maxTier: 'strong' }
  }

  if (memory <= 2 || cores <= 2) {
    return { initialTier: 'strong', maxTier: 'low' }
  }

  if (memory <= 4 || cores <= 4 || isMobile) {
    return { initialTier: 'low', maxTier: 'medium' }
  }

  return { initialTier: 'medium', maxTier: 'high' }
}

export function resolveAutoQualityPolicy(): AutoQualityPolicy {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { initialTier: 'medium', maxTier: 'high' }
  }

  const typedNavigator = navigator as NavigatorWithHints

  return resolveAutoQualityPolicyFromSignals({
    prefersReducedMotion: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true,
    saveDataEnabled: typedNavigator.connection?.saveData === true,
    memory: typedNavigator.deviceMemory ?? 8,
    cores: typedNavigator.hardwareConcurrency ?? 8,
    isMobile: MOBILE_DEVICE_REGEX.test(typedNavigator.userAgent),
  })
}

export const evaluateAdaptiveQuality = ({
  averageFrameMs,
  frameBudgetMs,
  counters,
  timeSinceTierChangeMs,
  qualityTier,
  maxTier,
}: AdaptiveQualityEvaluationInput): AdaptiveQualityEvaluationResult => {
  let overBudgetHits = counters.overBudgetHits
  let underBudgetHits = counters.underBudgetHits

  const overBudget = averageFrameMs > frameBudgetMs * ADAPTIVE_OVER_BUDGET_RATIO
  const underBudget = averageFrameMs < frameBudgetMs * ADAPTIVE_UNDER_BUDGET_RATIO

  if (overBudget) {
    overBudgetHits += 1
    underBudgetHits = 0
  } else if (underBudget) {
    underBudgetHits += 1
    overBudgetHits = 0
  } else {
    overBudgetHits = Math.max(0, overBudgetHits - 1)
    underBudgetHits = 0
  }

  if (overBudgetHits >= ADAPTIVE_DOWNGRADE_HITS && timeSinceTierChangeMs >= ADAPTIVE_DOWNGRADE_COOLDOWN_MS) {
    const downgradedTier = getLowerQualityTier(qualityTier)

    if (downgradedTier !== qualityTier) {
      return {
        nextTier: downgradedTier,
        counters: createAdaptiveCounters(),
        tierChanged: true,
      }
    }
  } else if (
    underBudgetHits >= ADAPTIVE_UPGRADE_HITS &&
    timeSinceTierChangeMs >= ADAPTIVE_UPGRADE_COOLDOWN_MS
  ) {
    const upgradedTier = getHigherQualityTier(qualityTier, maxTier)

    if (upgradedTier !== qualityTier) {
      return {
        nextTier: upgradedTier,
        counters: createAdaptiveCounters(),
        tierChanged: true,
      }
    }
  }

  return {
    nextTier: qualityTier,
    counters: {
      overBudgetHits,
      underBudgetHits,
    },
    tierChanged: false,
  }
}
