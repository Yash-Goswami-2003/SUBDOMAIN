'use client'

import { useInView } from './useInView'

/**
 * Custom hook for scroll-triggered animations
 * @param {Object} options - Animation configuration
 * @returns {Array} [ref, isInView] - Ref and visibility state
 */
export function useScrollAnimation(options = {}) {
    const {
        delay = 0,
        duration = 0.6,
        once = true,
        threshold = 0.1
    } = options

    const [ref, isInView] = useInView({ threshold, once })

    const style = {
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`
    }

    return [ref, isInView, style]
}
