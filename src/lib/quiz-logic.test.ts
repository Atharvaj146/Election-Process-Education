import { describe, it, expect } from 'vitest'
import { 
  selectSessionQuestions, 
  isAnswerCorrect, 
  calculateScore, 
  getBadgeTitle,
  calculateProgress 
} from './quiz-logic'
import { quizData } from '../data/quiz-questions'

describe('Quiz Logic', () => {
  describe('selectSessionQuestions', () => {
    it('should return exactly 5 questions by default', () => {
      const questions = selectSessionQuestions(quizData)
      expect(questions).toHaveLength(5)
    })

    it('should return the requested number of questions', () => {
      const questions = selectSessionQuestions(quizData, 3)
      expect(questions).toHaveLength(3)
    })

    it('should return all questions if count exceeds total', () => {
      const questions = selectSessionQuestions(quizData, 100)
      expect(questions).toHaveLength(quizData.length)
    })
  })

  describe('isAnswerCorrect', () => {
    const mockQuestion = quizData[0] // Correct is 1

    it('should return true for the correct answer', () => {
      expect(isAnswerCorrect(mockQuestion, 1)).toBe(true)
    })

    it('should return false for an incorrect answer', () => {
      expect(isAnswerCorrect(mockQuestion, 0)).toBe(false)
    })
  })

  describe('calculateScore', () => {
    const mockQuestions = [
      { id: 1, correct: 1 } as any,
      { id: 2, correct: 0 } as any,
      { id: 3, correct: 2 } as any
    ]

    it('should calculate the correct score', () => {
      const answers = [1, 0, 2] // All correct
      expect(calculateScore(mockQuestions, answers)).toBe(3)
    })

    it('should handle incorrect answers', () => {
      const answers = [1, 1, 2] // One incorrect
      expect(calculateScore(mockQuestions, answers)).toBe(2)
    })
  })

  describe('getBadgeTitle', () => {
    it('should return Democracy Champion for perfect score', () => {
      expect(getBadgeTitle(5, 5, 'en')).toContain('Democracy Champion')
    })

    it('should return Election Expert for 80%+', () => {
      expect(getBadgeTitle(4, 5, 'en')).toContain('Election Expert')
    })

    it('should return Hindi labels when requested', () => {
      expect(getBadgeTitle(5, 5, 'hi')).toBe('🏆 लोकतंत्र के प्रहरी')
    })
  })

  describe('calculateProgress', () => {
    it('should return 0 when at the start', () => {
      expect(calculateProgress(0, 5)).toBe(0)
    })

    it('should return 100 when at the end', () => {
      expect(calculateProgress(5, 5)).toBe(100)
    })

    it('should return 50 when in the middle', () => {
      expect(calculateProgress(2.5, 5)).toBe(50)
    })
  })
})
