import { ExamQuestion } from '../data/exams/index';

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${remainder.toString().padStart(2, '0')}`;
}

export function normalizeAnswer(answer: number | number[] | undefined): number[] {
  if (Array.isArray(answer)) return answer;
  if (typeof answer === 'number') return [answer];
  return [];
}

export function getCorrectIndexes(question: ExamQuestion): number[] {
  return (
    question.correctOptionIndexes ??
    (question.correctOptionIndex !== undefined ? [question.correctOptionIndex] : [])
  );
}

export function isAnswerCorrect(question: ExamQuestion, selected: number[]): boolean {
  const correct = getCorrectIndexes(question);
  return (
    correct.length > 0 &&
    correct.length === selected.length &&
    correct.every((index) => selected.includes(index))
  );
}
