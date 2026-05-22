import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { exams } from './data/exams/index';
import { ViewState, AnswerMap, SkippedMap } from './types';
import { normalizeAnswer } from './utils/examUtils';
import Header from './components/Header';
import SponsorModal from './components/SponsorModal';
import HomeView from './components/home/HomeView';
import QuizView from './components/QuizView';
import RevisionView from './components/RevisionView';
import ResultsView from './components/ResultsView';

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [skippedQuestions, setSkippedQuestions] = useState<SkippedMap>({});
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [examTimedOut, setExamTimedOut] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showSponsor, setShowSponsor] = useState(false);

  const selectedExam = useMemo(
    () => exams.find((exam) => exam.id === selectedExamId) ?? null,
    [selectedExamId]
  );

  const currentQuestion = selectedExam?.questions[currentQuestionIndex] ?? null;

  // Timer countdown
  useEffect(() => {
    if (view !== 'quiz' || !selectedExam || !timerEnabled || !selectedExam.durationSeconds) {
      return undefined;
    }
    if (timeLeft <= 0 || timerPaused) return undefined;

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
  }, [view, selectedExam, timeLeft, timerEnabled, timerPaused]);

  const handleStartExam = (examId: string) => {
    const exam = exams.find((item) => item.id === examId);
    if (!exam) return;
    setSelectedExamId(examId);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSkippedQuestions({});
    setExamTimedOut(false);
    setTimerPaused(false);
    setView('quiz');
    setTimeLeft(timerEnabled && exam.durationSeconds ? exam.durationSeconds : 0);
  };

  const handleAnswer = (optionIndex: number) => {
    if (!currentQuestion) return;
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
    if (!selectedExam) return;
    if (currentQuestionIndex + 1 < selectedExam.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }
    setView('results');
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSkipQuestion = () => {
    if (!currentQuestion || !selectedExam) return;
    setSkippedQuestions((prev) => ({ ...prev, [currentQuestion.id]: true }));
    if (currentQuestionIndex + 1 < selectedExam.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinish = () => {
    const shouldLeave = window.confirm(
      'Are you sure you want to leave the exam and return to the results page?'
    );
    if (shouldLeave) setView('results');
  };

  const handleMainPageClick = () => {
    const shouldLeave = window.confirm(
      'Are you sure you want to leave the exam and return to the main page? Your progress will be reset.'
    );
    if (shouldLeave) handleRestart();
  };

  const handleRestart = () => {
    setView('home');
    setSelectedExamId(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimerEnabled(true);
    setTimeLeft(0);
    setExamTimedOut(false);
    setTimerPaused(false);
  };

  const handleOpenRevision = (examId: string) => {
    setSelectedExamId(examId);
    setView('revision');
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode((d) => !d)} />

      <main className="page-content">
        {view === 'home' && (
          <HomeView
            timerEnabled={timerEnabled}
            onToggleTimer={() => setTimerEnabled((prev) => !prev)}
            onStartExam={handleStartExam}
            onOpenRevision={handleOpenRevision}
          />
        )}

        {view === 'quiz' && selectedExam && currentQuestion && (
          <QuizView
            selectedExam={selectedExam}
            currentQuestionIndex={currentQuestionIndex}
            currentQuestion={currentQuestion}
            answers={answers}
            skippedQuestions={skippedQuestions}
            timerEnabled={timerEnabled}
            timeLeft={timeLeft}
            timerPaused={timerPaused}
            onTogglePause={() => setTimerPaused((p) => !p)}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrev={handlePrev}
            onSkip={handleSkipQuestion}
            onFinish={handleFinish}
            onMainPage={handleMainPageClick}
            onQuestionJump={setCurrentQuestionIndex}
          />
        )}

        {view === 'revision' && selectedExam && (
          <RevisionView selectedExam={selectedExam} onRestart={handleRestart} />
        )}

        {view === 'results' && selectedExam && (
          <ResultsView
            selectedExam={selectedExam}
            answers={answers}
            examTimedOut={examTimedOut}
            onRestart={handleRestart}
            onRetake={handleStartExam}
          />
        )}
      </main>

      <SponsorModal show={showSponsor} onOpen={() => setShowSponsor(true)} onClose={() => setShowSponsor(false)} />
    </div>
  );
}

export default App;
