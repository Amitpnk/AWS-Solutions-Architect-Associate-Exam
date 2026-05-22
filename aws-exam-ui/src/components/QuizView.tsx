import React, { useCallback, useEffect, useState } from 'react';
import { ExamDefinition, ExamQuestion } from '../data/exams/index';
import { AnswerMap, SkippedMap } from '../types';
import { formatTime, normalizeAnswer, getCorrectIndexes, isAnswerCorrect } from '../utils/examUtils';

interface QuizViewProps {
  selectedExam: ExamDefinition;
  currentQuestionIndex: number;
  currentQuestion: ExamQuestion;
  answers: AnswerMap;
  skippedQuestions: SkippedMap;
  timerEnabled: boolean;
  timeLeft: number;
  timerPaused: boolean;
  onTogglePause: () => void;
  onAnswer: (optionIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onFinish: () => void;
  onMainPage: () => void;
  onQuestionJump: (index: number) => void;
}

export default function QuizView({
  selectedExam,
  currentQuestionIndex,
  currentQuestion,
  answers,
  skippedQuestions,
  timerEnabled,
  timeLeft,
  timerPaused,
  onTogglePause,
  onAnswer,
  onNext,
  onPrev,
  onSkip,
  onFinish,
  onMainPage,
  onQuestionJump,
}: QuizViewProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [checkedAnswers, setCheckedAnswers] = useState<Set<string>>(new Set());

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const speakQuestion = useCallback(
    (question: ExamQuestion, questionNumber: number) => {
      stopSpeaking();
      const letters = ['A', 'B', 'C', 'D', 'E'];
      const text = [
        `Question ${questionNumber}. ${question.prompt}`,
        ...question.options.map((opt, i) => `Option ${letters[i]}: ${opt}`),
      ].join('. ');
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    [stopSpeaking]
  );

  // Stop speaking on question change
  useEffect(() => {
    stopSpeaking();
  }, [currentQuestionIndex, stopSpeaking]);

  const toggleCheckedAnswer = (id: string) => {
    setCheckedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isLocked = checkedAnswers.has(currentQuestion.id);
  const selectedAnswer = answers[currentQuestion.id];
  const selectedIndexes = normalizeAnswer(selectedAnswer);

  return (
    <section className="quiz-screen">
      <div className="quiz-header">
        <div>
          <h2>{selectedExam.title}</h2>
          <p>{selectedExam.description}</p>
        </div>
        <div className="quiz-status">
          <span>
            Question {currentQuestionIndex + 1} of {selectedExam.questions.length}
          </span>
          {selectedExam.durationSeconds && (
            timerEnabled ? (
              <div className="timer-wrap">
                <span className={`timer-pill${timerPaused ? ' timer-pill--paused' : ''}`}>
                  {timerPaused ? `Paused · ${formatTime(timeLeft)}` : `Time left: ${formatTime(timeLeft)}`}
                </span>
                <button
                  type="button"
                  className="timer-pause-btn"
                  onClick={onTogglePause}
                  title={timerPaused ? 'Resume timer' : 'Pause timer'}
                >
                  {timerPaused ? '▶ Resume' : '⏸ Pause'}
                </button>
              </div>
            ) : (
              <span className="timer-pill">No timer applied</span>
            )
          )}
        </div>
      </div>

      <div className="question-card">
        <div className="question-prompt-row">
          <h3>{currentQuestion.prompt}</h3>
          <button
            type="button"
            className={`speak-btn${isSpeaking ? ' speaking' : ''}`}
            onClick={() =>
              isSpeaking
                ? stopSpeaking()
                : speakQuestion(currentQuestion, currentQuestionIndex + 1)
            }
            title={isSpeaking ? 'Stop reading' : 'Read question aloud'}
          >
            {isSpeaking ? (
              <>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <rect x="2" y="2" width="12" height="12" rx="2" />
                </svg>
                Stop
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M3 2l10 6-10 6V2z" />
                </svg>
                Read
              </>
            )}
          </button>
        </div>
        {currentQuestion.correctOptionIndexes && (
          <p className="multi-select-note">Select all that apply.</p>
        )}
        <div className="options-grid">
          {currentQuestion.options.map((option, optionIndex) => {
            const isSelected = selectedIndexes.includes(optionIndex);
            const isMultiSelect = !!currentQuestion.correctOptionIndexes;
            const inputType = isMultiSelect ? 'checkbox' : 'radio';
            const inputName = isMultiSelect ? undefined : currentQuestion.id;

            return (
              <label
                key={option}
                className={`option-button ${isSelected ? 'selected' : ''} ${isLocked ? 'option-locked' : ''}`}
              >
                <input
                  type={inputType}
                  name={inputName}
                  value={optionIndex}
                  checked={isSelected}
                  onChange={() => onAnswer(optionIndex)}
                  disabled={isLocked}
                />
                {option}
              </label>
            );
          })}
        </div>
      </div>

      <div className="quiz-controls">
        <button className="mainpage-button" onClick={onMainPage}>
          Main Page
        </button>
        <button className="secondary-button" onClick={onPrev} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button className="secondary-button" onClick={onSkip}>
          Skip &amp; Return Later
        </button>
        <button className="secondary-button" onClick={onNext}>
          {currentQuestionIndex + 1 < selectedExam.questions.length ? 'Next' : 'Finish'}
        </button>
        <button className="danger-button" onClick={onFinish}>
          End Exam
        </button>
        <button
          className={`check-answer-btn ${isLocked ? 'revealed' : ''}`}
          onClick={() => toggleCheckedAnswer(currentQuestion.id)}
          type="button"
          disabled={answers[currentQuestion.id] === undefined}
          title={answers[currentQuestion.id] === undefined ? 'Select an option first' : undefined}
        >
          {isLocked ? 'Hide Answer' : 'Check Answer'}
        </button>
      </div>

      {isLocked && (() => {
        const correct = isAnswerCorrect(currentQuestion, selectedIndexes);
        return (
          <div className="revision-answer-body" style={{ margin: '0 0 12px 0' }}>
            <div className={`quiz-verdict ${correct ? 'quiz-verdict--correct' : 'quiz-verdict--wrong'}`}>
              {correct ? '✓ Correct!' : '✗ Incorrect'}
            </div>
            <div className="revision-answer-header">Correct Answer</div>
            <div className="revision-correct-list">
              {getCorrectIndexes(currentQuestion).map((i) => (
                <div key={i} className="revision-correct-item">
                  <span className="revision-correct-letter">{String.fromCharCode(65 + i)}</span>
                  <span>{currentQuestion.options[i]}</span>
                </div>
              ))}
            </div>
            {currentQuestion.explanation && (
              <div className="revision-explanation">
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </div>
            )}
            {currentQuestion.incorrectOptionExplanations && (
              <div className="revision-incorrect-explanations">
                <div className="revision-incorrect-explanations-header">Why other options are wrong</div>
                {Object.entries(currentQuestion.incorrectOptionExplanations).map(([origIdx, reason]) => {
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
          </div>
        );
      })()}

      <div className="question-nav">
        <span>Jump to question:</span>
        <div className="question-nav-grid">
          {selectedExam.questions.map((question, index) => {
            const isAnswered = answers[question.id] !== undefined;
            const isSkipped = skippedQuestions[question.id] && answers[question.id] === undefined;
            return (
              <button
                key={question.id}
                className={`question-nav-button ${index === currentQuestionIndex ? 'active' : ''} ${isAnswered ? 'answered' : ''} ${isSkipped ? 'skipped' : ''}`}
                onClick={() => onQuestionJump(index)}
                type="button"
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
