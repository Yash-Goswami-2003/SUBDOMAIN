import { testData } from '@/data/portfolio'

// Single source of truth for portfolio configuration used by
// both API routes and server components.
export async function getPortfolioConfig() {
  // In the future this can be replaced with a real DB/API call.
  // Keeping it async from day one makes that migration trivial.
  return testData
}

