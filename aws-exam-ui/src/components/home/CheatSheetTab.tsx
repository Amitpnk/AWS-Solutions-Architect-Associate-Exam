import React from 'react';
import { scenarioCategories, comparisons, keyFacts } from '../../data/cheatSheet';

type CheatSection = 'scenarios' | 'comparisons' | 'keyfacts';

interface CheatSheetTabProps {
  cheatSearch: string;
  onSearchChange: (value: string) => void;
  cheatSection: CheatSection;
  onSectionChange: (section: CheatSection) => void;
  filteredScenarios: typeof scenarioCategories;
  filteredComparisons: typeof comparisons;
  filteredKeyFacts: typeof keyFacts;
}

export default function CheatSheetTab({
  cheatSearch,
  onSearchChange,
  cheatSection,
  onSectionChange,
  filteredScenarios,
  filteredComparisons,
  filteredKeyFacts,
}: CheatSheetTabProps) {
  return (
    <section className="cheatsheet-section">
      <div className="cheatsheet-toolbar">
        <div className="cheatsheet-sub-tabs">
          <button
            className={`cheatsheet-sub-tab ${cheatSection === 'scenarios' ? 'active' : ''}`}
            onClick={() => { onSectionChange('scenarios'); onSearchChange(''); }}
          >
            Scenario Guide
          </button>
          <button
            className={`cheatsheet-sub-tab ${cheatSection === 'comparisons' ? 'active' : ''}`}
            onClick={() => { onSectionChange('comparisons'); onSearchChange(''); }}
          >
            Service Comparisons
          </button>
          <button
            className={`cheatsheet-sub-tab ${cheatSection === 'keyfacts' ? 'active' : ''}`}
            onClick={() => { onSectionChange('keyfacts'); onSearchChange(''); }}
          >
            Key Numbers
          </button>
        </div>
        <input
          type="search"
          placeholder="Search..."
          value={cheatSearch}
          onChange={(e) => onSearchChange(e.target.value)}
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
  );
}
