import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { 
  createInitialState, 
  castVote, 
  hideVVPAT, 
  isVVPATExpired,
  getCandidates,
  isValidCandidate 
} from './evm-simulator'

describe('EVM Simulator Logic', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should initialize correctly', () => {
    const state = createInitialState()
    expect(state.status).toBe('ready')
    expect(state.votedFor).toBeNull()
    expect(state.vvpatVisible).toBe(false)
  })

  it('should process a vote correctly', () => {
    const initialState = createInitialState()
    const newState = castVote(initialState, 1)
    
    expect(newState.status).toBe('voted')
    expect(newState.votedFor).toBe(1)
    expect(newState.vvpatVisible).toBe(true)
    expect(newState.voteTimestamp).toBeDefined()
  })

  it('should not allow voting twice', () => {
    const state = castVote(createInitialState(), 1)
    const state2 = castVote(state, 2)
    
    // Status should still be 'voted' and candidate should still be 1
    expect(state2.status).toBe('voted')
    expect(state2.votedFor).toBe(1)
  })

  it('should detect when VVPAT is expired', () => {
    const state = castVote(createInitialState(), 1)
    
    expect(isVVPATExpired(state)).toBe(false)
    
    // Fast forward 7 seconds
    vi.advanceTimersByTime(7000)
    expect(isVVPATExpired(state)).toBe(true)
  })

  it('should transition to cooldown after VVPAT hide', () => {
    const state = castVote(createInitialState(), 1)
    const cooledState = hideVVPAT(state)
    
    expect(cooledState.status).toBe('cooldown')
    expect(cooledState.vvpatVisible).toBe(false)
  })

  it('should return correct candidates for language', () => {
    const candidatesEn = getCandidates('en')
    expect(candidatesEn[0].name).toBe('Candidate A')
    
    const candidatesHi = getCandidates('hi')
    expect(candidatesHi[0].name).toBe('उम्मीदवार क')
  })

  it('should validate candidate IDs', () => {
    expect(isValidCandidate(1)).toBe(true)
    expect(isValidCandidate(99)).toBe(false)
  })
})
