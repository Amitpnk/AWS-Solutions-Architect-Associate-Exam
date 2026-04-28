import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { exams, ExamQuestion } from './data/exams';

type ViewState = 'home' | 'quiz' | 'results';

type AnswerMap = Record<string, number | number[]>;
type SkippedMap = Record<string, boolean>;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${remainder.toString().padStart(2, '0')}`;
}

function normalizeAnswer(answer: number | number[] | undefined) {
  if (Array.isArray(answer)) {
    return answer;
  }
  if (typeof answer === 'number') {
    return [answer];
  }
  return [];
}

function getCorrectIndexes(question: ExamQuestion) {
  return question.correctOptionIndexes ?? (question.correctOptionIndex !== undefined ? [question.correctOptionIndex] : []);
}

function isAnswerCorrect(question: ExamQuestion, selected: number[]) {
  const correct = getCorrectIndexes(question);
  return correct.length > 0 && correct.length === selected.length && correct.every((index) => selected.includes(index));
}

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [skippedQuestions, setSkippedQuestions] = useState<SkippedMap>({});
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [examTimedOut, setExamTimedOut] = useState(false);

  const selectedExam = useMemo(
    () => exams.find((exam) => exam.id === selectedExamId) ?? null,
    [selectedExamId]
  );

  const currentQuestion = selectedExam?.questions[currentQuestionIndex] ?? null;

  useEffect(() => {
    if (view !== 'quiz' || !selectedExam || !timerEnabled || !selectedExam.durationSeconds) {
      return undefined;
    }

    if (timeLeft <= 0) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          setExamTimedOut(true);
          setView('results');
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [view, selectedExam, timeLeft, timerEnabled]);

  const score = useMemo(() => {
    if (!selectedExam) {
      return 0;
    }
    return selectedExam.questions.reduce((count, question) => {
      const selectedAnswers = normalizeAnswer(answers[question.id]);
      return isAnswerCorrect(question, selectedAnswers) ? count + 1 : count;
    }, 0);
  }, [selectedExam, answers]);

  const handleStartExam = (examId: string) => {
    const exam = exams.find((item) => item.id === examId);
    if (!exam) {
      return;
    }
    setSelectedExamId(examId);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSkippedQuestions({});
    setExamTimedOut(false);
    setView('quiz');
    setTimeLeft(timerEnabled && exam.durationSeconds ? exam.durationSeconds : 0);
  };

  const handleAnswer = (optionIndex: number) => {
    if (!currentQuestion) {
      return;
    }

    const multiSelect = !!currentQuestion.correctOptionIndexes;
    if (!multiSelect) {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
      return;
    }

    setAnswers((prev) => {
      const existing = normalizeAnswer(prev[currentQuestion.id]);
      const nextAnswers = existing.includes(optionIndex)
        ? existing.filter((id) => id !== optionIndex)
        : [...existing, optionIndex];

      if (nextAnswers.length === 0) {
        const updated = { ...prev };
        delete updated[currentQuestion.id];
        return updated;
      }

      return { ...prev, [currentQuestion.id]: nextAnswers };
    });
  };

  const handleNext = () => {
    if (!selectedExam) {
      return;
    }
    if (currentQuestionIndex + 1 < selectedExam.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }
    setView('results');
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkipQuestion = () => {
    if (!currentQuestion || !selectedExam) {
      return;
    }
    setSkippedQuestions((prev) => ({ ...prev, [currentQuestion.id]: true }));
    if (currentQuestionIndex + 1 < selectedExam.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinish = () => {
    setView('results');
  };

  const handleMainPageClick = () => {
    const shouldLeave = window.confirm('Are you sure you want to leave the exam and return to the main page? Your progress will be reset.');
    if (shouldLeave) {
      handleRestart();
    }
  };

  const handleRestart = () => {
    setView('home');
    setSelectedExamId(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimerEnabled(true);
    setTimeLeft(0);
    setExamTimedOut(false);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div>
          <p className="app-title">AWS SAA-C03 Exam Practice</p>
          <p className="app-subtitle">Choose an exam, answer questions, and review correct answers at the end.</p>
        </div>
      </header>

      <main className="page-content">
        {view === 'home' && (
          <section className="exam-list">
            {exams.map((exam) => (
              <article key={exam.id} className="exam-card">
                <div>
                  <h2>{exam.title}</h2>
                  <p>{exam.description}</p>
                  <div className="exam-meta">
                    <span>{exam.questions.length} questions</span>
                    <span>{exam.durationSeconds ? `Up to ${formatTime(exam.durationSeconds)} if timed` : 'No time limit'}</span>
                  </div>
                </div>
                {exam.durationSeconds && (
                  <label className="timer-option">
                    <input
                      type="checkbox"
                      checked={timerEnabled}
                      onChange={() => setTimerEnabled((prev) => !prev)}
                    />
                    Use time limit ({formatTime(exam.durationSeconds)})
                  </label>
                )}
                <button className="primary-button" onClick={() => handleStartExam(exam.id)}>
                  Start Exam
                </button>
              </article>
            ))}
          </section>
        )}

        {view === 'quiz' && selectedExam && currentQuestion && (
          <section className="quiz-screen">
            <div className="quiz-header">
              <div>
                <h2>{selectedExam.title}</h2>
                <p>{selectedExam.description}</p>
              </div>
              <div className="quiz-status">
                <span>Question {currentQuestionIndex + 1} of {selectedExam.questions.length}</span>
                {selectedExam.durationSeconds && (
                  <span className="timer-pill">
                    {timerEnabled ? `Time left: ${formatTime(timeLeft)}` : 'No timer applied'}
                  </span>
                )}
              </div>
            </div>

           

            <div className="question-card">
              <h3>{currentQuestion.prompt}</h3>
              {currentQuestion.correctOptionIndexes && <p className="multi-select-note">Select all that apply.</p>}
              <div className="options-grid">
                {currentQuestion.options.map((option, optionIndex) => {
                  const selectedAnswer = answers[currentQuestion.id];
                  const selectedIndexes = normalizeAnswer(selectedAnswer);
                  const isSelected = selectedIndexes.includes(optionIndex);
                  const isMultiSelect = !!currentQuestion.correctOptionIndexes;
                  const inputType = isMultiSelect ? 'checkbox' : 'radio';
                  const inputName = isMultiSelect ? undefined : currentQuestion.id;

                  return (
                    <label
                      key={option}
                      className={`option-button ${isSelected ? 'selected' : ''}`}
                    >
                      <input
                        type={inputType}
                        name={inputName}
                        value={optionIndex}
                        checked={isSelected}
                        onChange={() => handleAnswer(optionIndex)}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="quiz-controls">
              <button className="mainpage-button" onClick={handleMainPageClick}>
                Main Page
              </button>
              <button className="secondary-button" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                Previous
              </button>
              <button className="secondary-button" onClick={handleSkipQuestion}>
                Skip & Return Later
              </button>
              <button className="secondary-button" onClick={handleNext}>
                {currentQuestionIndex + 1 < selectedExam.questions.length ? 'Next' : 'Finish'}
              </button>
              <button className="danger-button" onClick={handleFinish}>
                End Exam
              </button>
            </div>

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
                      onClick={() => setCurrentQuestionIndex(index)}
                      type="button"
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {view === 'results' && selectedExam && (
          <section className="results-screen">
            <div className="results-summary">
              <h2>Exam Completed</h2>
              {examTimedOut && <p className="alert-text">Time expired and the exam ended automatically.</p>}
              <p>
                Score: <strong>{score}</strong> / <strong>{selectedExam.questions.length}</strong>
              </p>
              <div className="results-actions">
                <button className="primary-button" onClick={handleRestart}>Back to Home</button>
                <button className="secondary-button" onClick={() => handleStartExam(selectedExam.id)}>
                  Retake Exam
                </button>
              </div>
            </div>

            <div className="review-list">
              {selectedExam.questions.map((question, index) => {
                const selectedAnswer = answers[question.id];
                const selectedIndexes = normalizeAnswer(selectedAnswer);
                const correctIndexes = getCorrectIndexes(question);
                const isCorrect = isAnswerCorrect(question, selectedIndexes);
                return (
                  <article key={question.id} className={`review-card ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="review-header">
                      <h3>Question {index + 1}</h3>
                      <span>{isCorrect ? 'Correct' : 'Incorrect'}</span>
                    </div>
                    <p>{question.prompt}</p>
                    <div className="review-answer">
                      <strong>Your answer{selectedIndexes.length > 1 ? 's' : ''}:</strong>{' '}
                      {selectedIndexes.length > 0
                        ? selectedIndexes.map((optionIndex) => question.options[optionIndex]).join(', ')
                        : 'No answer selected'}
                    </div>
                    {!isCorrect && (
                      <div className="review-answer">
                        <strong>Correct answer{correctIndexes.length > 1 ? 's' : ''}:</strong>{' '}
                        {correctIndexes.map((optionIndex) => question.options[optionIndex]).join(', ')}
                      </div>
                    )}
                    {question.explanation && <p className="explanation">{question.explanation}</p>}
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
