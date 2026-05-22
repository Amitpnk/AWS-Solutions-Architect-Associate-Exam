import React from 'react';
import { resourceCategories } from '../../data/resources';

interface StudyTabProps {
  resourceSearch: string;
  onSearchChange: (value: string) => void;
  filteredCategories: typeof resourceCategories;
}

export default function StudyTab({ resourceSearch, onSearchChange, filteredCategories }: StudyTabProps) {
  return (
    <section className="resources-section">
      <div className="resource-search-bar">
        <input
          type="search"
          placeholder="Search services or categories..."
          value={resourceSearch}
          onChange={(e) => onSearchChange(e.target.value)}
          className="resource-search-input"
        />
      </div>
      {filteredCategories.length === 0 ? (
        <p className="resource-no-results">No services match "{resourceSearch}".</p>
      ) : (
        <div className="resources-grid">
          {filteredCategories.map((cat) => (
            <div key={cat.category} className="resource-card">
              <h3 className="resource-category">
                {cat.icon} {cat.category}
              </h3>
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
  );
}
