import React from 'react';
import { ExamDefinition } from '../../data/exams/index';
import { formatTime } from '../../utils/examUtils';

interface ExamsTabProps {
  exams: ExamDefinition[];
  timerEnabled: boolean;
  onToggleTimer: () => void;
  onStartExam: (examId: string) => void;
  onOpenRevision: (examId: string) => void;
}

export default function ExamsTab({
  exams,
  timerEnabled,
  onToggleTimer,
  onStartExam,
  onOpenRevision,
}: ExamsTabProps) {
  return (
    <section className="exam-list">
      {exams.map((exam) => (
        <article key={exam.id} className="exam-card">
          <div>
            <h2>{exam.title}</h2>
            <p>{exam.description}</p>
            <div className="exam-meta">
              <span>{exam.questions.length} questions</span>
              <span>
                {exam.durationSeconds
                  ? `Up to ${formatTime(exam.durationSeconds)} if timed`
                  : 'No time limit'}
              </span>
            </div>
          </div>
          {exam.durationSeconds && (
            <label className="timer-option">
              <input type="checkbox" checked={timerEnabled} onChange={onToggleTimer} />
              Use time limit ({formatTime(exam.durationSeconds)})
            </label>
          )}
          <div className="exam-card-buttons">
            <button className="primary-button" onClick={() => onStartExam(exam.id)}>
              Start Exam
            </button>
            <button className="secondary-button" onClick={() => onOpenRevision(exam.id)}>
              Revision
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
