import React, { useMemo, useState } from 'react';
import { exams } from '../../data/exams/index';
import { resourceCategories } from '../../data/resources';
import { awsServiceCategories } from '../../data/awsServices';
import { scenarioCategories, comparisons, keyFacts } from '../../data/cheatSheet';
import { cloudComparisonCategories } from '../../data/cloudComparison';
import ExamsTab from './ExamsTab';
import StudyTab from './StudyTab';
import ServicesTab from './ServicesTab';
import CheatSheetTab from './CheatSheetTab';
import CompareTab from './CompareTab';
import AboutTab from './AboutTab';

type HomeTab = 'exams' | 'study' | 'services' | 'cheatsheet' | 'compare' | 'about';
type CheatSection = 'scenarios' | 'comparisons' | 'keyfacts';

interface HomeViewProps {
  timerEnabled: boolean;
  onToggleTimer: () => void;
  onStartExam: (examId: string) => void;
  onOpenRevision: (examId: string) => void;
}

export default function HomeView({ timerEnabled, onToggleTimer, onStartExam, onOpenRevision }: HomeViewProps) {
  const [homeTab, setHomeTab] = useState<HomeTab>('exams');
  const [resourceSearch, setResourceSearch] = useState('');
  const [serviceSearch, setServiceSearch] = useState('');
  const [cheatSearch, setCheatSearch] = useState('');
  const [cheatSection, setCheatSection] = useState<CheatSection>('scenarios');
  const [compareSearch, setCompareSearch] = useState('');

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
        c.options.some(
          (o) => o.name.toLowerCase().includes(term) || o.useWhen.toLowerCase().includes(term)
        )
    );
  }, [cheatSearch, cheatSection]);

  const filteredKeyFacts = useMemo(() => {
    const term = cheatSearch.trim().toLowerCase();
    if (!term || cheatSection !== 'keyfacts') return keyFacts;
    return keyFacts.filter(
      (f) => f.service.toLowerCase().includes(term) || f.fact.toLowerCase().includes(term)
    );
  }, [cheatSearch, cheatSection]);

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
          (s) =>
            s.name.toLowerCase().includes(term) || s.definition.toLowerCase().includes(term)
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

  return (
    <>
      <div className="home-tabs">
        {(
          [
            { id: 'exams', label: 'Practice Exams' },
            { id: 'study', label: 'Study Material' },
            { id: 'services', label: 'AWS Services' },
            { id: 'cheatsheet', label: 'Cheat Sheet' },
            { id: 'compare', label: 'AWS vs Azure vs GCP' },
            { id: 'about', label: 'About' },
          ] as { id: HomeTab; label: string }[]
        ).map(({ id, label }) => (
          <button
            key={id}
            className={`home-tab ${homeTab === id ? 'active' : ''}`}
            onClick={() => setHomeTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {homeTab === 'exams' && (
        <ExamsTab
          exams={exams}
          timerEnabled={timerEnabled}
          onToggleTimer={onToggleTimer}
          onStartExam={onStartExam}
          onOpenRevision={onOpenRevision}
        />
      )}

      {homeTab === 'study' && (
        <StudyTab
          resourceSearch={resourceSearch}
          onSearchChange={setResourceSearch}
          filteredCategories={filteredResourceCategories}
        />
      )}

      {homeTab === 'services' && (
        <ServicesTab
          serviceSearch={serviceSearch}
          onSearchChange={setServiceSearch}
          filteredCategories={filteredServiceCategories}
        />
      )}

      {homeTab === 'cheatsheet' && (
        <CheatSheetTab
          cheatSearch={cheatSearch}
          onSearchChange={setCheatSearch}
          cheatSection={cheatSection}
          onSectionChange={setCheatSection}
          filteredScenarios={filteredScenarios}
          filteredComparisons={filteredComparisons}
          filteredKeyFacts={filteredKeyFacts}
        />
      )}

      {homeTab === 'compare' && (
        <CompareTab
          compareSearch={compareSearch}
          onSearchChange={setCompareSearch}
          filteredCategories={filteredCompareCategories}
        />
      )}

      {homeTab === 'about' && <AboutTab />}
    </>
  );
}
