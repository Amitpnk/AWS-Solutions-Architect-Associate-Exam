import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import { exams, ExamQuestion } from './data/exams/index';
import { resourceCategories } from './data/resources';
import { awsServiceCategories } from './data/awsServices';
import { scenarioCategories, comparisons, keyFacts } from './data/cheatSheet';
import { cloudComparisonCategories } from './data/cloudComparison';

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
  const [isSpeaking, setIsSpeaking] = useState(false);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const speakQuestion = useCallback((question: ExamQuestion, questionNumber: number) => {
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
  }, [stopSpeaking]);
  const [homeTab, setHomeTab] = useState<'exams' | 'study' | 'services' | 'cheatsheet' | 'compare' | 'about'>('exams');
  const [resourceSearch, setResourceSearch] = useState('');
  const [serviceSearch, setServiceSearch] = useState('');
  const [cheatSearch, setCheatSearch] = useState('');
  const [cheatSection, setCheatSection] = useState<'scenarios' | 'comparisons' | 'keyfacts'>('scenarios');

  const selectedExam = useMemo(
    () => exams.find((exam) => exam.id === selectedExamId) ?? null,
    [selectedExamId]
  );

  const filteredScenarios = useMemo(() => {
    const term = cheatSearch.trim().toLowerCase();
    if (!term || cheatSection !== 'scenarios') return scenarioCategories;
    return scenarioCategories
      .map((cat) => ({
        ...cat,
        tips: cat.tips.filter(
          (t) =>
            t.scenario.toLowerCase().includes(term) ||
            t.service.toLowerCase().includes(term) ||
            t.note.toLowerCase().includes(term) ||
            t.keywords.some((k) => k.toLowerCase().includes(term))
        ),
      }))
      .filter((cat) => cat.category.toLowerCase().includes(term) || cat.tips.length > 0);
  }, [cheatSearch, cheatSection]);

  const filteredComparisons = useMemo(() => {
    const term = cheatSearch.trim().toLowerCase();
    if (!term || cheatSection !== 'comparisons') return comparisons;
    return comparisons.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        c.options.some((o) => o.name.toLowerCase().includes(term) || o.useWhen.toLowerCase().includes(term))
    );
  }, [cheatSearch, cheatSection]);

  const filteredKeyFacts = useMemo(() => {
    const term = cheatSearch.trim().toLowerCase();
    if (!term || cheatSection !== 'keyfacts') return keyFacts;
    return keyFacts.filter(
      (f) => f.service.toLowerCase().includes(term) || f.fact.toLowerCase().includes(term)
    );
  }, [cheatSearch, cheatSection]);

  const [compareSearch, setCompareSearch] = useState('');
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());

  const toggleRevealAnswer = (id: string) => {
    setRevealedAnswers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const filteredCompareCategories = useMemo(() => {
    const term = compareSearch.trim().toLowerCase();
    if (!term) return cloudComparisonCategories;
    return cloudComparisonCategories
      .map((cat) => ({
        ...cat,
        services: cat.services.filter(
          (s) =>
            s.aws.toLowerCase().includes(term) ||
            s.azure.toLowerCase().includes(term) ||
            s.gcp.toLowerCase().includes(term) ||
            s.description.toLowerCase().includes(term)
        ),
      }))
      .filter((cat) => cat.category.toLowerCase().includes(term) || cat.services.length > 0);
  }, [compareSearch]);

  const filteredServiceCategories = useMemo(() => {
    const term = serviceSearch.trim().toLowerCase();
    if (!term) return awsServiceCategories;
    return awsServiceCategories
      .map((cat) => ({
        ...cat,
        services: cat.services.filter(
          (s) => s.name.toLowerCase().includes(term) || s.definition.toLowerCase().includes(term)
        ),
      }))
      .filter((cat) => cat.category.toLowerCase().includes(term) || cat.services.length > 0);
  }, [serviceSearch]);

  const filteredResourceCategories = useMemo(() => {
    const term = resourceSearch.trim().toLowerCase();
    if (!term) return resourceCategories;
    return resourceCategories
      .map((cat) => ({
        ...cat,
        resources: cat.resources.filter((r) => r.service.toLowerCase().includes(term)),
      }))
      .filter((cat) => cat.category.toLowerCase().includes(term) || cat.resources.length > 0);
  }, [resourceSearch]);

  const currentQuestion = selectedExam?.questions[currentQuestionIndex] ?? null;

  useEffect(() => {
    stopSpeaking();
  }, [currentQuestionIndex, stopSpeaking]);

  useEffect(() => {
    if (view !== 'quiz') stopSpeaking();
  }, [view, stopSpeaking]);

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
                className={`home-tab ${homeTab === 'services' ? 'active' : ''}`}
                onClick={() => setHomeTab('services')}
              >
                AWS Services
              </button>
              <button
                className={`home-tab ${homeTab === 'cheatsheet' ? 'active' : ''}`}
                onClick={() => setHomeTab('cheatsheet')}
              >
                Cheat Sheet
              </button>
              <button
                className={`home-tab ${homeTab === 'compare' ? 'active' : ''}`}
                onClick={() => setHomeTab('compare')}
              >
                AWS vs Azure vs GCP
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
                <div className="resource-search-bar">
                  <input
                    type="search"
                    placeholder="Search services or categories..."
                    value={resourceSearch}
                    onChange={(e) => setResourceSearch(e.target.value)}
                    className="resource-search-input"
                  />
                </div>
                {filteredResourceCategories.length === 0 ? (
                  <p className="resource-no-results">No services match "{resourceSearch}".</p>
                ) : (
                  <div className="resources-grid">
                    {filteredResourceCategories.map((cat) => (
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
                )}
              </section>
            )}

            {homeTab === 'services' && (
              <section className="services-glossary-section">
                <div className="resource-search-bar">
                  <input
                    type="search"
                    placeholder="Search services or categories..."
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    className="resource-search-input"
                  />
                </div>
                {filteredServiceCategories.length === 0 ? (
                  <p className="resource-no-results">No services match "{serviceSearch}".</p>
                ) : (
                  filteredServiceCategories.map((cat) => (
                    <div key={cat.category} className="services-glossary-group">
                      <h3 className="services-glossary-heading">{cat.icon} {cat.category}</h3>
                      <ul className="services-glossary-list">
                        {cat.services.map((svc) => (
                          <li key={svc.name} className="services-glossary-item">
                            <span className="services-glossary-name">{svc.name}</span>
                            <span className="services-glossary-sep">—</span>
                            <span className="services-glossary-def">{svc.definition}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </section>
            )}

            {homeTab === 'cheatsheet' && (
              <section className="cheatsheet-section">
                <div className="cheatsheet-toolbar">
                  <div className="cheatsheet-sub-tabs">
                    <button
                      className={`cheatsheet-sub-tab ${cheatSection === 'scenarios' ? 'active' : ''}`}
                      onClick={() => { setCheatSection('scenarios'); setCheatSearch(''); }}
                    >
                      Scenario Guide
                    </button>
                    <button
                      className={`cheatsheet-sub-tab ${cheatSection === 'comparisons' ? 'active' : ''}`}
                      onClick={() => { setCheatSection('comparisons'); setCheatSearch(''); }}
                    >
                      Service Comparisons
                    </button>
                    <button
                      className={`cheatsheet-sub-tab ${cheatSection === 'keyfacts' ? 'active' : ''}`}
                      onClick={() => { setCheatSection('keyfacts'); setCheatSearch(''); }}
                    >
                      Key Numbers
                    </button>
                  </div>
                  <input
                    type="search"
                    placeholder="Search..."
                    value={cheatSearch}
                    onChange={(e) => setCheatSearch(e.target.value)}
                    className="resource-search-input cheatsheet-search"
                  />
                </div>

                {cheatSection === 'scenarios' && (
                  <>
                    {filteredScenarios.length === 0 ? (
                      <p className="resource-no-results">No scenarios match "{cheatSearch}".</p>
                    ) : (
                      filteredScenarios.map((cat) => (
                        <div key={cat.category} className="cheatsheet-group">
                          <h3 className="cheatsheet-group-heading">{cat.icon} {cat.category}</h3>
                          <div className="cheatsheet-scenario-list">
                            {cat.tips.map((tip, i) => (
                              <div key={i} className="cheatsheet-scenario-card">
                                <div className="cheatsheet-scenario-top">
                                  <span className="cheatsheet-scenario-text">{tip.scenario}</span>
                                  <span className="cheatsheet-service-badge">{tip.service}</span>
                                </div>
                                <p className="cheatsheet-note">{tip.note}</p>
                                <div className="cheatsheet-keywords">
                                  {tip.keywords.map((kw) => (
                                    <span key={kw} className="cheatsheet-keyword">{kw}</span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}

                {cheatSection === 'comparisons' && (
                  <>
                    {filteredComparisons.length === 0 ? (
                      <p className="resource-no-results">No comparisons match "{cheatSearch}".</p>
                    ) : (
                      <div className="cheatsheet-comparisons-grid">
                        {filteredComparisons.map((cmp) => (
                          <div key={cmp.title} className="cheatsheet-comparison-card">
                            <h3 className="cheatsheet-comparison-title">{cmp.title}</h3>
                            <div className="cheatsheet-comparison-options">
                              {cmp.options.map((opt) => (
                                <div key={opt.name} className="cheatsheet-comparison-option">
                                  <span className="cheatsheet-service-badge">{opt.name}</span>
                                  <p className="cheatsheet-comparison-use">{opt.useWhen}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {cheatSection === 'keyfacts' && (
                  <>
                    {filteredKeyFacts.length === 0 ? (
                      <p className="resource-no-results">No facts match "{cheatSearch}".</p>
                    ) : (
                      <ul className="cheatsheet-facts-list">
                        {filteredKeyFacts.map((fact, i) => (
                          <li key={i} className="cheatsheet-fact-item">
                            <span className="cheatsheet-service-badge">{fact.service}</span>
                            <span className={`cheatsheet-fact-tag cheatsheet-fact-tag--${fact.tag}`}>{fact.tag}</span>
                            <span className="cheatsheet-fact-text">{fact.fact}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </section>
            )}

            {homeTab === 'compare' && (
              <section className="compare-section">
                <div className="compare-intro">
                  <p>Side-by-side mapping of AWS services to their Azure and GCP equivalents. Use the search to filter by any service name or description.</p>
                </div>
                <div className="resource-search-bar">
                  <input
                    type="search"
                    placeholder="Search AWS, Azure, or GCP service..."
                    value={compareSearch}
                    onChange={(e) => setCompareSearch(e.target.value)}
                    className="resource-search-input"
                  />
                </div>
                {filteredCompareCategories.length === 0 ? (
                  <p className="resource-no-results">No services match "{compareSearch}".</p>
                ) : (
                  filteredCompareCategories.map((cat) => (
                    <div key={cat.category} className="compare-group">
                      <h3 className="compare-group-heading">{cat.icon} {cat.category}</h3>
                      <div className="compare-table-wrapper">
                        <table className="compare-table">
                          <thead>
                            <tr>
                              <th className="compare-th compare-th--aws">AWS</th>
                              <th className="compare-th compare-th--azure">Azure</th>
                              <th className="compare-th compare-th--gcp">GCP</th>
                              <th className="compare-th compare-th--desc">What it does</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cat.services.map((row, i) => (
                              <tr key={i} className="compare-row">
                                <td className="compare-td compare-cell--aws">{row.aws}</td>
                                <td className="compare-td compare-cell--azure">{row.azure}</td>
                                <td className="compare-td compare-cell--gcp">{row.gcp}</td>
                                <td className="compare-td compare-cell--desc">{row.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))
                )}
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
                      A free, open-source all-in-one prep platform for the
                      <strong> AWS Solutions Architect – Associate (SAA-C03)</strong> certification.
                      From timed mock exams to a service glossary and exam cheat sheet — everything you need to pass, in one place.
                    </p>
                  </div>

                  <div className="about-card about-card--highlight" >
                    <h3>What's Inside</h3>
                    <ul className="about-feature-list">
                      <li><strong>Practice Exams</strong> — timed &amp; untimed with instant scoring</li>
                      <li><strong>Single &amp; multi-select</strong> question types</li>
                      <li><strong>Detailed explanations</strong> for every answer</li>
                      <li><strong>Revision mode</strong> — all correct answers at a glance</li>
                      <li><strong>AWS Services</strong> — one-liner definitions for 130+ services by category</li>
                      <li><strong>Cheat Sheet</strong> — scenario → service guide, comparisons &amp; key numbers</li>
                      <li><strong>Study Material</strong> — curated AWS docs &amp; resource links</li>
                      <li><strong>PDF export</strong> for offline study</li>
                      <li><strong>Dark mode</strong> support</li>
                    </ul>
                  </div>

                  <div className="about-card">
                    <h3>Cheat Sheet</h3>
                    <p>
                      The <strong>Cheat Sheet</strong> tab is designed purely for exam day recall.
                      It covers 3 areas:
                    </p>
                    <ul className="about-feature-list">
                      <li><strong>Scenario Guide</strong> — read the scenario, pick the right service</li>
                      <li><strong>Service Comparisons</strong> — SQS vs SNS, ALB vs NLB, and 8 more</li>
                      <li><strong>Key Numbers</strong> — limits, defaults, gotchas &amp; tips</li>
                    </ul>
                  </div>

                  <div className="about-card">
                    <h3>Contribute</h3>
                    <p>
                      Found a bug, missing a question, or want to improve the cheat sheet?
                      Contributions are welcome — open an issue or submit a pull request on GitHub.
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
                      All AWS trademarks and service names are the property of Amazon.com, Inc.
                      Questions and content are created for educational purposes only.
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
              <div className="question-prompt-row">
                <h3>{currentQuestion.prompt}</h3>
                <button
                  type="button"
                  className={`speak-btn${isSpeaking ? ' speaking' : ''}`}
                  onClick={() => isSpeaking ? stopSpeaking() : speakQuestion(currentQuestion, currentQuestionIndex + 1)}
                  title={isSpeaking ? 'Stop reading' : 'Read question aloud'}
                >
                  {isSpeaking ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="2" y="2" width="12" height="12" rx="2"/></svg>
                      Stop
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M3 2l10 6-10 6V2z"/></svg>
                      Read
                    </>
                  )}
                </button>
              </div>
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
                      <h3>
                        Question {index + 1}
                        <span className="revision-q-count"> of {selectedExam.questions.length}</span>
                      </h3>
                    </div>
                    <p className="revision-prompt">{question.prompt}</p>
                    <div className="revision-options">
                      {question.options.map((option, optionIndex) => {
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
                            {correctIndexes.map(i => (
                              <div key={i} className="revision-correct-item">
                                <span className="revision-correct-letter">{String.fromCharCode(65 + i)}</span>
                                <span>{question.options[i]}</span>
                              </div>
                            ))}
                          </div>
                          {question.explanation && (
                            <div className="revision-explanation">
                              <strong>Explanation:</strong> {question.explanation}
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
