import React from 'react';
import { awsServiceCategories } from '../../data/awsServices';

interface ServicesTabProps {
  serviceSearch: string;
  onSearchChange: (value: string) => void;
  filteredCategories: typeof awsServiceCategories;
}

export default function ServicesTab({ serviceSearch, onSearchChange, filteredCategories }: ServicesTabProps) {
  return (
    <section className="services-glossary-section">
      <div className="resource-search-bar">
        <input
          type="search"
          placeholder="Search services or categories..."
          value={serviceSearch}
          onChange={(e) => onSearchChange(e.target.value)}
          className="resource-search-input"
        />
      </div>
      {filteredCategories.length === 0 ? (
        <p className="resource-no-results">No services match "{serviceSearch}".</p>
      ) : (
        filteredCategories.map((cat) => (
          <div key={cat.category} className="services-glossary-group">
            <h3 className="services-glossary-heading">
              {cat.icon} {cat.category}
            </h3>
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
  );
}
