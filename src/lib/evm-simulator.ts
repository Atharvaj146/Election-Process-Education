/**
 * EVM Simulator Logic
 * 
 * Models the state machine for the Electronic Voting Machine (EVM)
 * simulation used in the GuidePage. This module is designed to be
 * testable independently of the React component.
 */

export type EVMState = 'ready' | 'voted' | 'vvpat_display' | 'cooldown'

export interface Candidate {
  id: number
  name: string
  symbol: string
}

export interface EVMSimulatorState {
  status: EVMState
  votedFor: number | null
  vvpatVisible: boolean
  /** Timestamp (ms) when the vote was cast */
  voteTimestamp: number | null
}

/** VVPAT display duration in milliseconds */
export const VVPAT_DISPLAY_DURATION_MS = 7000

/** Cooldown duration before EVM resets (after VVPAT display) */
export const COOLDOWN_DURATION_MS = 5000

/**
 * Creates the initial state for the EVM simulator.
 */
export function createInitialState(): EVMSimulatorState {
  return {
    status: 'ready',
    votedFor: null,
    vvpatVisible: false,
    voteTimestamp: null,
  }
}

/**
 * Returns the list of candidates for the EVM simulator.
 */
export function getCandidates(language: string): Candidate[] {
  return [
    { id: 1, name: language === 'en' ? 'Candidate A' : 'उम्मीदवार क', symbol: '🌟' },
    { id: 2, name: language === 'en' ? 'Candidate B' : 'उम्मीदवार ख', symbol: '🚀' },
    { id: 3, name: 'NOTA', symbol: '❌' },
  ]
}

/**
 * Processes a vote action.
 * Returns the new state after a vote is cast.
 * If the EVM is not in 'ready' state, the vote is rejected.
 */
export function castVote(
  currentState: EVMSimulatorState,
  candidateId: number
): EVMSimulatorState {
  if (currentState.status !== 'ready') {
    return currentState // Reject: already voted or in cooldown
  }

  return {
    status: 'voted',
    votedFor: candidateId,
    vvpatVisible: true,
    voteTimestamp: Date.now(),
  }
}

/**
 * Checks if the VVPAT display period has elapsed.
 */
export function isVVPATExpired(state: EVMSimulatorState): boolean {
  if (!state.voteTimestamp || state.status !== 'voted') return false
  return Date.now() - state.voteTimestamp >= VVPAT_DISPLAY_DURATION_MS
}

/**
 * Transitions the EVM state after the VVPAT display has expired.
 */
export function hideVVPAT(state: EVMSimulatorState): EVMSimulatorState {
  if (state.status !== 'voted') return state
  return {
    ...state,
    vvpatVisible: false,
    status: 'cooldown',
  }
}

/**
 * Resets the EVM simulator to its initial state.
 */
export function resetEVM(): EVMSimulatorState {
  return createInitialState()
}

/**
 * Validates whether a given candidate ID exists in the candidate list.
 */
export function isValidCandidate(candidateId: number, language: string = 'en'): boolean {
  const candidates = getCandidates(language)
  return candidates.some((c) => c.id === candidateId)
}
