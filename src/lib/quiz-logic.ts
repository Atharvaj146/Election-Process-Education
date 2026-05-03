import type { QuizQuestion } from '../data/quiz-questions'

/**
 * Selects a random subset of quiz questions for a session.
 * Uses Fisher-Yates shuffle for unbiased randomization.
 */
export function selectSessionQuestions(
  allQuestions: QuizQuestion[],
  count: number = 5
): QuizQuestion[] {
  if (count <= 0) return []
  if (count >= allQuestions.length) return [...allQuestions]

  const shuffled = [...allQuestions]
  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
}

/**
 * Checks if the selected answer is correct for the given question.
 */
export function isAnswerCorrect(question: QuizQuestion, selectedIndex: number): boolean {
  return question.correct === selectedIndex
}

/**
 * Calculates the final score from a list of answers.
 * @param questions - The questions in the session
 * @param answers - An array of selected answer indices (one per question)
 * @returns The number of correct answers
 */
export function calculateScore(questions: QuizQuestion[], answers: number[]): number {
  return questions.reduce((score, question, index) => {
    if (answers[index] !== undefined && isAnswerCorrect(question, answers[index])) {
      return score + 1
    }
    return score
  }, 0)
}

/**
 * Determines the badge title based on score and total questions.
 */
export function getBadgeTitle(score: number, total: number, language: 'en' | 'hi'): string {
  const ratio = score / total
  if (ratio === 1) return language === 'en' ? '🏆 Democracy Champion' : '🏆 लोकतंत्र के प्रहरी'
  if (ratio >= 0.8) return language === 'en' ? '🌟 Election Expert' : '🌟 चुनाव विशेषज्ञ'
  if (ratio >= 0.6) return language === 'en' ? '✅ Informed Voter' : '✅ जागरूक मतदाता'
  return language === 'en' ? '📚 Rising Citizen' : '📚 उभरते नागरिक'
}

/**
 * Calculates the progress percentage for the quiz progress bar.
 */
export function calculateProgress(currentIndex: number, totalQuestions: number): number {
  if (totalQuestions <= 0) return 0
  return (currentIndex / totalQuestions) * 100
}
