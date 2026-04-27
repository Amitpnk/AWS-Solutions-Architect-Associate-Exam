import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { exams } from './data/exams';

type ViewState = 'home' | 'quiz' | 'results';

type AnswerMap = Record<string, number>;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${remainder.toString().padStart(2, '0')}`;
}

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
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
      return answers[question.id] === question.correctOptionIndex ? count + 1 : count;
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
    setExamTimedOut(false);
    setView('quiz');
    setTimeLeft(timerEnabled && exam.durationSeconds ? exam.durationSeconds : 0);
  };

  const handleAnswer = (optionIndex: number) => {
    if (!currentQuestion) {
      return;
    }
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
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

  const handleFinish = () => {
    setView('results');
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
              <div className="options-grid">
                {currentQuestion.options.map((option, optionIndex) => {
                  const isSelected = answers[currentQuestion.id] === optionIndex;
                  return (
                    <button
                      key={option}
                      className={`option-button ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleAnswer(optionIndex)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="quiz-controls">
              <button className="secondary-button" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                Previous
              </button>
              <button className="secondary-button" onClick={handleNext}>
                {currentQuestionIndex + 1 < selectedExam.questions.length ? 'Next' : 'Finish'}
              </button>
              <button className="danger-button" onClick={handleFinish}>
                End Exam
              </button>
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
                const selectedIndex = answers[question.id];
                const isCorrect = selectedIndex === question.correctOptionIndex;
                return (
                  <article key={question.id} className={`review-card ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="review-header">
                      <h3>Question {index + 1}</h3>
                      <span>{isCorrect ? 'Correct' : 'Incorrect'}</span>
                    </div>
                    <p>{question.prompt}</p>
                    <div className="review-answer">
                      <strong>Your answer:</strong>{' '}
                      {selectedIndex !== undefined ? question.options[selectedIndex] : 'No answer selected'}
                    </div>
                    <div className="review-answer">
                      <strong>Correct answer:</strong>{' '}
                      {question.options[question.correctOptionIndex]}
                    </div>
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
