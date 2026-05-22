import React, { useMemo, useState } from 'react';
import { ExamDefinition } from '../data/exams/index';
import { AnswerMap } from '../types';
import { normalizeAnswer, getCorrectIndexes, isAnswerCorrect } from '../utils/examUtils';

type ResultFilter = 'all' | 'correct' | 'incorrect' | 'skipped';

interface ResultsViewProps {
  selectedExam: ExamDefinition;
  answers: AnswerMap;
  examTimedOut: boolean;
  onRestart: () => void;
  onRetake: (examId: string) => void;
}

export default function ResultsView({
  selectedExam,
  answers,
  examTimedOut,
  onRestart,
  onRetake,
}: ResultsViewProps) {
  const [resultFilter, setResultFilter] = useState<ResultFilter>('all');

  const score = useMemo(
    () =>
      selectedExam.questions.reduce((count, question) => {
        const selectedAnswers = normalizeAnswer(answers[question.id]);
        return isAnswerCorrect(question, selectedAnswers) ? count + 1 : count;
      }, 0),
    [selectedExam, answers]
  );

  const total = selectedExam.questions.length;
  const skipped = selectedExam.questions.filter(
    (q) => normalizeAnswer(answers[q.id]).length === 0
  ).length;
  const incorrect = total - score - skipped;
  const wrong = total - score;
  const pct = score / total;
  const circ = 2 * Math.PI * 45;
  const passed = pct >= 0.72;

  return (
    <section className="results-screen">
      <div className="results-summary">
        <h2>Exam Completed</h2>
        {examTimedOut && (
          <p className="alert-text">Time expired and the exam ended automatically.</p>
        )}

        <div className="score-chart-wrap">
          <svg className="score-donut" viewBox="0 0 120 120">
            {/* track */}
            <circle cx="60" cy="60" r="45" fill="none" stroke="#e2e8f0" strokeWidth="16" />
            {/* incorrect arc (red) */}
            <circle
              cx="60" cy="60" r="45" fill="none" stroke="#fca5a5"
              strokeWidth="16"
              strokeDasharray={`${(wrong / total) * circ} ${circ}`}
              transform="rotate(-90 60 60)"
              style={{ strokeDashoffset: -(pct * circ) }}
            />
            {/* correct arc */}
            <circle
              cx="60" cy="60" r="45" fill="none"
              stroke={passed ? '#22c55e' : '#f97316'}
              strokeWidth="16"
              strokeDasharray={`${pct * circ} ${circ}`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="52" textAnchor="middle" fontSize="22" fontWeight="700" fill="currentColor" className="donut-main-text">
              {(pct * 100).toFixed(1)}%
            </text>
            <text x="60" y="70" textAnchor="middle" fontSize="11" fill="#64748b">
              {score} / {total}
            </text>
          </svg>
          <span className={`pass-fail-badge ${passed ? 'pass' : 'fail'}`}>
            {passed ? '✓ PASS' : '✗ FAIL'}
          </span>
          <div className="score-legend">
            <button
              className={`legend-chip ${resultFilter === 'correct' ? 'active' : ''}`}
              onClick={() => setResultFilter((f) => (f === 'correct' ? 'all' : 'correct'))}
              title="Filter: Correct answers"
            >
              <span className="legend-dot dot-correct" /> Correct: <strong>{score}</strong>
            </button>
            <button
              className={`legend-chip ${resultFilter === 'incorrect' ? 'active' : ''}`}
              onClick={() => setResultFilter((f) => (f === 'incorrect' ? 'all' : 'incorrect'))}
              title="Filter: Incorrect answers"
            >
              <span className="legend-dot dot-incorrect" /> Incorrect: <strong>{incorrect}</strong>
            </button>
            <button
              className={`legend-chip ${resultFilter === 'skipped' ? 'active' : ''}`}
              onClick={() => setResultFilter((f) => (f === 'skipped' ? 'all' : 'skipped'))}
              title="Filter: Skipped / no answer"
            >
              <span className="legend-dot dot-skipped" /> Skipped: <strong>{skipped}</strong>
            </button>
          </div>
        </div>

        <div className="results-actions">
          <button className="primary-button" onClick={onRestart}>
            Back to Home
          </button>
          <button className="secondary-button" onClick={() => onRetake(selectedExam.id)}>
            Retake Exam
          </button>
          <button className="pdf-export-btn" onClick={() => window.print()}>
            Export PDF
          </button>
        </div>
      </div>

      {resultFilter !== 'all' && (
        <div className="review-filter-bar">
          Showing: <strong>{resultFilter.charAt(0).toUpperCase() + resultFilter.slice(1)}</strong> questions
          <button className="filter-clear-btn" onClick={() => setResultFilter('all')}>
            ✕ Clear filter
          </button>
        </div>
      )}

      <div className="review-list">
        {selectedExam.questions.map((question, index) => {
          const selectedIndexes = normalizeAnswer(answers[question.id]);
          const correctIndexes = getCorrectIndexes(question);
          const isCorrect = isAnswerCorrect(question, selectedIndexes);
          const isSkipped = selectedIndexes.length === 0;

          if (resultFilter === 'correct' && !isCorrect) return null;
          if (resultFilter === 'incorrect' && (isCorrect || isSkipped)) return null;
          if (resultFilter === 'skipped' && !isSkipped) return null;

          return (
            <article
              key={question.id}
              className={`review-card ${isSkipped ? 'skipped' : isCorrect ? 'correct' : 'incorrect'}`}
            >
              <div className="review-header">
                <h3>Question {index + 1}</h3>
                <span>{isSkipped ? 'Skipped' : isCorrect ? 'Correct' : 'Incorrect'}</span>
              </div>
              <p>{question.prompt}</p>
              <div className="review-answer">
                <strong>Your answer{selectedIndexes.length > 1 ? 's' : ''}:</strong>
                {selectedIndexes.length > 0 ? (
                  <div className="review-options-list">
                    {selectedIndexes.map((optionIndex) => {
                      const isOptionCorrect = correctIndexes.includes(optionIndex);
                      const letter = String.fromCharCode(65 + optionIndex);
                      return (
                        <div
                          key={optionIndex}
                          className={isOptionCorrect ? 'revision-correct-item' : 'revision-incorrect-item'}
                        >
                          <span className={isOptionCorrect ? 'revision-correct-letter' : 'revision-incorrect-letter'}>
                            {letter}
                          </span>
                          <span>{question.options[optionIndex]}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <span> No answer selected</span>
                )}
              </div>
              {!isCorrect && (
                <div className="review-answer">
                  <strong>Correct answer{correctIndexes.length > 1 ? 's' : ''}:</strong>
                  <div className="review-options-list">
                    {correctIndexes.map((optionIndex) => {
                      const letter = String.fromCharCode(65 + optionIndex);
                      return (
                        <div key={optionIndex} className="revision-correct-item">
                          <span className="revision-correct-letter">{letter}</span>
                          <span>{question.options[optionIndex]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {question.explanation && <p className="explanation">{question.explanation}</p>}
              {question.incorrectOptionExplanations &&
                Object.keys(question.incorrectOptionExplanations).length > 0 && (
                  <div className="revision-incorrect-explanations">
                    <div className="revision-incorrect-explanations-header">
                      Why other options are wrong
                    </div>
                    {Object.entries(question.incorrectOptionExplanations).map(([origIdx, reason]) => {
                      const orig = parseInt(origIdx, 10);
                      const letter = String.fromCharCode(65 + orig);
                      return (
                        <div key={origIdx} className="revision-incorrect-item">
                          <span className="revision-incorrect-letter">{letter}</span>
                          <span>{reason}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
