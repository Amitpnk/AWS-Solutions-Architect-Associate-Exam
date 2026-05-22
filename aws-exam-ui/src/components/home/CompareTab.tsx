import React from 'react';
import { cloudComparisonCategories } from '../../data/cloudComparison';

interface CompareTabProps {
  compareSearch: string;
  onSearchChange: (value: string) => void;
  filteredCategories: typeof cloudComparisonCategories;
}

export default function CompareTab({ compareSearch, onSearchChange, filteredCategories }: CompareTabProps) {
  return (
    <section className="compare-section">
      <div className="compare-intro">
        <p>
          Side-by-side mapping of AWS services to their Azure and GCP equivalents. Use the search to
          filter by any service name or description.
        </p>
      </div>
      <div className="resource-search-bar">
        <input
          type="search"
          placeholder="Search AWS, Azure, or GCP service..."
          value={compareSearch}
          onChange={(e) => onSearchChange(e.target.value)}
          className="resource-search-input"
        />
      </div>
      {filteredCategories.length === 0 ? (
        <p className="resource-no-results">No services match "{compareSearch}".</p>
      ) : (
        filteredCategories.map((cat) => (
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
  );
}
