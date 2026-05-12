import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { exams, ExamQuestion } from './data/exams';
import { resourceCategories } from './data/resources';

type ViewState = 'home' | 'quiz' | 'results' | 'revision';

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

const SPONSOR_UPI_ID = '';
const SPONSOR_BMC_URL = 'https://buymeacoffee.com/codewithamit';

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [skippedQuestions, setSkippedQuestions] = useState<SkippedMap>({});
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [examTimedOut, setExamTimedOut] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showSponsor, setShowSponsor] = useState(false);
  const [homeTab, setHomeTab] = useState<'exams' | 'study' | 'about'>('exams');

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

  const handleOpenRevision = (examId: string) => {
    setSelectedExamId(examId);
    setView('revision');
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <header className="app-header">
        <div className="header-center">
          <p className="app-title">AWS Solutions Architect Associate</p>
          <p className="app-subtitle">Sharpen your AWS skills with timed practice exams, instant feedback, and curated study material.</p>
        </div>
        <input
          type="checkbox"
          id="dark-mode-checkbox"
          className="dark-mode-checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <label htmlFor="dark-mode-checkbox" className="dark-mode-label">
          <span className="moon">🌙</span>
          <span className="sun">☀️</span>
          <span className="ball"></span>
        </label>
        <a
          href="https://github.com/Amitpnk/AWS-Solutions-Architect-Associate-Exam"
          target="_blank"
          rel="noreferrer"
          className="github-link"
          title="View on GitHub"
        >
          <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>
      </header>

      <main className="page-content">
        {view === 'home' && (
          <>
            <div className="home-tabs">
              <button
                className={`home-tab ${homeTab === 'exams' ? 'active' : ''}`}
                onClick={() => setHomeTab('exams')}
              >
                Practice Exams
              </button>
              <button
                className={`home-tab ${homeTab === 'study' ? 'active' : ''}`}
                onClick={() => setHomeTab('study')}
              >
                Study Material
              </button>
              <button
                className={`home-tab ${homeTab === 'about' ? 'active' : ''}`}
                onClick={() => setHomeTab('about')}
              >
                About
              </button>
            </div>

            {homeTab === 'exams' && (
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
                    <div className="exam-card-buttons">
                      <button className="primary-button" onClick={() => handleStartExam(exam.id)}>
                        Start Exam
                      </button>
                      <button className="secondary-button" onClick={() => handleOpenRevision(exam.id)}>
                        Revision
                      </button>
                    </div>
                  </article>
                ))}
              </section>
            )}

            {homeTab === 'study' && (
              <section className="resources-section">
                <div className="resources-grid">
                  {resourceCategories.map((cat) => (
                    <div key={cat.category} className="resource-card">
                      <h3 className="resource-category">{cat.icon} {cat.category}</h3>
                      <ul className="resource-list">
                        {cat.resources.map((r) => (
                          <li key={r.service}>
                            {r.url.includes('https') ? (
                              <a href={r.url} target="_blank" rel="noreferrer" className="resource-link">
                                {r.service}
                              </a>
                            ) : (
                              <span className="resource-link--no-url">{r.service}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {homeTab === 'about' && (
              <section className="about-section">
                <div className="about-hero">
                  <div className="about-avatar">AN</div>
                  <h2 className="about-name">Amit Naik</h2>
                  <p className="about-tagline">Software Architect &amp; Technology Enthusiast</p>
                  <div className="about-links">
                    <a
                      href="https://github.com/Amitpnk/AWS-Solutions-Architect-Associate-Exam"
                      target="_blank"
                      rel="noreferrer"
                      className="about-link-btn"
                    >
                      <svg height="18" width="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                      GitHub
                    </a>
                    <a
                      href={SPONSOR_BMC_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="about-link-btn about-link-btn--coffee"
                    >
                      ☕ Buy Me a Coffee
                    </a>
                  </div>
                </div>

                <div className="about-cards">
                  <div className="about-card">
                    <h3>About This Project</h3>
                    <p>
                      This free, open-source practice platform was built to help candidates prepare for the
                      <strong> AWS Solutions Architect – Associate (SAA-C03)</strong> certification. It offers
                      timed practice exams, instant feedback with explanations, revision mode, and curated study
                      resources — all in one place.
                    </p>
                  </div>

                  <div className="about-card">
                    <h3>Features</h3>
                    <ul className="about-feature-list">
                      <li>Timed &amp; untimed practice exams</li>
                      <li>Single and multiple-choice questions</li>
                      <li>Detailed answer explanations</li>
                      <li>Revision mode with correct answers highlighted</li>
                      <li>PDF export for offline study</li>
                      <li>Curated AWS documentation &amp; resource links</li>
                      <li>Dark mode support</li>
                    </ul>
                  </div>

                  <div className="about-card">
                    <h3>Contribute</h3>
                    <p>
                      Found a bug or want to add more questions? Contributions are welcome on GitHub.
                      Open an issue or submit a pull request — every improvement helps the community.
                    </p>
                    <a
                      href="https://github.com/Amitpnk/AWS-Solutions-Architect-Associate-Exam/issues"
                      target="_blank"
                      rel="noreferrer"
                      className="about-contribute-btn"
                    >
                      Open an Issue on GitHub
                    </a>
                  </div>

                  <div className="about-card">
                    <h3>Disclaimer</h3>
                    <p>
                      This project is not affiliated with, endorsed by, or sponsored by Amazon Web Services.
                      All AWS trademarks and service names are the property of Amazon.com, Inc. Questions are
                      created for educational purposes only.
                    </p>
                  </div>
                </div>
              </section>
            )}
          </>
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

        {view === 'revision' && selectedExam && (
          <section className="revision-screen">
            <div className="revision-header">
              <div>
                <h2>{selectedExam.title}</h2>
                <p>{selectedExam.description}</p>
              </div>
              <div className="revision-header-actions">
                <button className="pdf-export-btn" onClick={() => window.print()}>
                  Export PDF
                </button>
                <button className="mainpage-button" onClick={handleRestart}>
                  Back to Home
                </button>
              </div>
            </div>

            <div className="revision-list">
              {selectedExam.questions.map((question, index) => {
                const correctIndexes = getCorrectIndexes(question);
                return (
                  <article key={question.id} className="revision-card">
                    <div className="revision-header-card">
                      <h3>Question {index + 1}</h3>
                    </div>
                    <p className="revision-prompt">{question.prompt}</p>
                    <div className="revision-options">
                      {question.options.map((option, optionIndex) => {
                        const isCorrect = correctIndexes.includes(optionIndex);
                        return (
                          <div
                            key={optionIndex}
                            className={`revision-option ${isCorrect ? 'correct' : 'incorrect'}`}
                          >
                            <span className={`option-indicator ${isCorrect ? 'correct' : ''}`}>
                              {isCorrect ? '✓' : '○'}
                            </span>
                            {option}
                          </div>
                        );
                      })}
                    </div>
                    {question.explanation && (
                      <p className="revision-explanation"><strong>Explanation:</strong> {question.explanation}</p>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {view === 'results' && selectedExam && (
          <section className="results-screen">
            <div className="results-summary">
              <h2>Exam Completed</h2>
              {examTimedOut && <p className="alert-text">Time expired and the exam ended automatically.</p>}
              <p>
                Score: <strong>{score}</strong> / <strong>{selectedExam.questions.length}</strong> {`(${((score / selectedExam.questions.length) * 100).toFixed(2)}%)`  }
              </p>
              <div className="results-actions">
                <button className="primary-button" onClick={handleRestart}>Back to Home</button>
                <button className="secondary-button" onClick={() => handleStartExam(selectedExam.id)}>
                  Retake Exam
                </button>
                <button className="pdf-export-btn" onClick={() => window.print()}>
                  Export PDF
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

      <button className="sponsor-fab" onClick={() => setShowSponsor(true)} title="Support this project">
        ☕
      </button>

      {showSponsor && (
        <div className="sponsor-overlay" onClick={() => setShowSponsor(false)}>
          <div className="sponsor-modal" onClick={(e) => e.stopPropagation()}>
            <button className="sponsor-close" onClick={() => setShowSponsor(false)}>✕</button>
            <h3>Support this project</h3>
            <p className="sponsor-tagline">If this helped your AWS prep, consider buying me a coffee!</p>

            <div className="sponsor-option">
              <span className="sponsor-option-label">🇮🇳 UPI (INR)</span>
              <img src={`${process.env.PUBLIC_URL}/upi-qr.png`} alt="UPI QR Code" className="sponsor-upi-qr" />
              <p className="sponsor-upi-text">{SPONSOR_UPI_ID}</p>
            </div>

            <div className="sponsor-option">
              <span className="sponsor-option-label">Buy Me a Coffee (USD)</span>
              <a className="sponsor-bmc-btn" href={SPONSOR_BMC_URL} target="_blank" rel="noreferrer">
                Buy Me a Coffee
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
