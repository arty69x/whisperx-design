import type { Variants, Transition } from "motion/react"

/**
 * WhisperX motion tokens — sourced from global-tw4-master.v7.full-spec.json
 * (designTokenSystem.motion). Durations are in seconds for motion/react.
 */
export const motionTokens = {
  durations: {
    instant: 0.08,
    fast: 0.15,
    base: 0.22,
    smooth: 0.3,
    slow: 0.42,
    slower: 0.6,
    hero: 0.8,
    epic: 1,
  },
  easing: {
    standard: [0.2, 0, 0, 1],
    spring: [0.34, 1.56, 0.64, 1],
    springSoft: [0.22, 1.2, 0.36, 1],
    out: [0.16, 1, 0.3, 1],
    inOut: [0.65, 0, 0.35, 1],
    smooth: [0.4, 0, 0.2, 1],
    sharp: [0.4, 0, 0.6, 1],
    bounce: [0.18, 1.6, 0.4, 1],
    linear: [0, 0, 1, 1],
  },
} as const

const baseTransition: Transition = {
  duration: motionTokens.durations.base,
  ease: motionTokens.easing.springSoft,
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
}

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.durations.smooth, ease: motionTokens.easing.springSoft },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: motionTokens.durations.slow, ease: motionTokens.easing.spring },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

/** Shared interaction transition for hover/tap on buttons and cards. */
export const tapTransition: Transition = {
  duration: motionTokens.durations.fast,
  ease: motionTokens.easing.spring,
}
