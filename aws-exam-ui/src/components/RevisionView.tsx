import React, { useMemo, useState } from 'react';
import { ExamDefinition } from '../data/exams/index';
import { getCorrectIndexes } from '../utils/examUtils';

interface RevisionViewProps {
  selectedExam: ExamDefinition;
  onRestart: () => void;
}

export default function RevisionView({ selectedExam, onRestart }: RevisionViewProps) {
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());
  const [revisionShuffleKey, setRevisionShuffleKey] = useState(0);

  const toggleRevealAnswer = (id: string) => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const revisionShuffledOptions = useMemo(() => {
    const result: Record<string, { shuffled: string[]; oldToNew: number[] }> = {};
    for (const q of selectedExam.questions) {
      const indexes = q.options.map((_, i) => i);
      for (let i = indexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
      }
      const shuffled = indexes.map((i) => q.options[i]);
      const oldToNew: number[] = new Array(q.options.length);
      indexes.forEach((oldPos, newPos) => {
        oldToNew[oldPos] = newPos;
      });
      result[q.id] = { shuffled, oldToNew };
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExam.id, revisionShuffleKey]);

  const allRevealed = selectedExam.questions.every((q) => revealedAnswers.has(q.id));

  return (
    <section className="revision-screen">
      <div className="revision-header">
        <div>
          <h2>{selectedExam.title}</h2>
          <p>{selectedExam.description}</p>
        </div>
        <div className="revision-header-actions">
          <button
            className="shuffle-options-btn"
            onClick={() => setRevisionShuffleKey((k) => k + 1)}
          >
            Shuffle Options
          </button>
          <button
            className="toggle-all-answers-btn"
            onClick={() => {
              const allIds = selectedExam.questions.map((q) => q.id);
              setRevealedAnswers(allRevealed ? new Set() : new Set(allIds));
            }}
          >
            {allRevealed ? 'Hide All Answers' : 'Reveal All Answers'}
          </button>
          <button className="pdf-export-btn" onClick={() => window.print()}>
            Export PDF
          </button>
          <button className="mainpage-button" onClick={onRestart}>
            Back to Home
          </button>
        </div>
      </div>

      <div className="revision-list">
        {selectedExam.questions.map((question, index) => {
          const correctIndexes = getCorrectIndexes(question);
          const shuffle = revisionShuffleKey > 0 ? revisionShuffledOptions[question.id] : null;
          const displayOptions = shuffle ? shuffle.shuffled : question.options;
          const displayCorrectIndexes = shuffle
            ? correctIndexes.map((i) => shuffle.oldToNew[i])
            : correctIndexes;

          return (
            <article key={question.id} className="revision-card">
              <div className="revision-header-card">
                <h3>
                  Question {index + 1}
                  <span className="revision-q-count"> of {selectedExam.questions.length}</span>
                </h3>
              </div>
              <p className="revision-prompt">{question.prompt}</p>
              <div className="revision-options">
                {displayOptions.map((option, optionIndex) => {
                  const letter = String.fromCharCode(65 + optionIndex);
                  return (
                    <div key={optionIndex} className="revision-option">
                      <span className="option-letter">{letter}</span>
                      <span>{option}</span>
                    </div>
                  );
                })}
              </div>
              <div className="revision-answer-section">
                <button
                  className={`check-answer-btn ${revealedAnswers.has(question.id) ? 'revealed' : ''}`}
                  onClick={() => toggleRevealAnswer(question.id)}
                  type="button"
                >
                  {revealedAnswers.has(question.id) ? 'Hide Answer' : 'Check Answer'}
                </button>
                {revealedAnswers.has(question.id) && (
                  <div className="revision-answer-body">
                    <div className="revision-answer-header">Correct Answer</div>
                    <div className="revision-correct-list">
                      {displayCorrectIndexes.map((i) => (
                        <div key={i} className="revision-correct-item">
                          <span className="revision-correct-letter">{String.fromCharCode(65 + i)}</span>
                          <span>{displayOptions[i]}</span>
                        </div>
                      ))}
                    </div>
                    {question.explanation && (
                      <div className="revision-explanation">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    )}
                    {question.incorrectOptionExplanations &&
                      Object.keys(question.incorrectOptionExplanations).length > 0 && (
                        <div className="revision-incorrect-explanations">
                          <div className="revision-incorrect-explanations-header">
                            Why other options are wrong
                          </div>
                          {Object.entries(question.incorrectOptionExplanations).map(([origIdx, reason]) => {
                            const orig = parseInt(origIdx, 10);
                            const displayIdx = shuffle ? shuffle.oldToNew[orig] : orig;
                            const letter = String.fromCharCode(65 + displayIdx);
                            return (
                              <div key={origIdx} className="revision-incorrect-item">
                                <span className="revision-incorrect-letter">{letter}</span>
                                <span>{reason}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
