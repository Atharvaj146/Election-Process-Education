import { describe, it, expect } from 'vitest'
import { deriveActions } from './chat-utils'

describe('deriveActions', () => {
  it('should return Form 6 action when "new voter" is mentioned in English', () => {
    const text = 'You can register as a new voter using Form 6.'
    const actions = deriveActions(text, 'en')
    
    expect(actions).toHaveLength(1)
    expect(actions[0].label).toBe('Apply Form 6')
    expect(actions[0].url).toContain('registration-details/1')
  })

  it('should return Hindi label when "फॉर्म 6" is mentioned in Hindi', () => {
    const text = 'आप फॉर्म 6 का उपयोग करके पंजीकरण कर सकते हैं।'
    const actions = deriveActions(text, 'hi')
    
    expect(actions).toHaveLength(1)
    expect(actions[0].label).toBe('फॉर्म 6 भरें')
  })

  it('should return Polling Station action when "booth" is mentioned', () => {
    const text = 'Find your polling booth location here.'
    const actions = deriveActions(text, 'en')
    
    expect(actions).toHaveLength(1)
    expect(actions[0].icon).toBe('map')
    expect(actions[0].label).toBe('Find Polling Station')
  })

  it('should return multiple actions if multiple keywords match', () => {
    const text = 'Visit the voter portal to download your e-EPIC card.'
    const actions = deriveActions(text, 'en')
    
    expect(actions).toHaveLength(2)
    const labels = actions.map(a => a.label)
    expect(labels).toContain('Voters Portal')
    expect(labels).toContain('Download e-EPIC')
  })

  it('should return empty array when no keywords match', () => {
    const text = 'Hello! How can I help you today?'
    const actions = deriveActions(text, 'en')
    
    expect(actions).toHaveLength(0)
  })
})
