import React from 'react';
import { SPONSOR_BMC_URL } from '../../types';

export default function AboutTab() {
  return (
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
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
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
            A free, open-source all-in-one prep platform for the{' '}
            <strong>AWS Solutions Architect – Associate (SAA-C03)</strong> certification. From timed
            mock exams to a service glossary and exam cheat sheet — everything you need to pass, in
            one place.
          </p>
        </div>

        <div className="about-card about-card--highlight">
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
            The <strong>Cheat Sheet</strong> tab is designed purely for exam day recall. It covers 3
            areas:
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
            Found a bug, missing a question, or want to improve the cheat sheet? Contributions are
            welcome — open an issue or submit a pull request on GitHub.
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
            All AWS trademarks and service names are the property of Amazon.com, Inc. Questions and
            content are created for educational purposes only.
          </p>
        </div>
      </div>
    </section>
  );
}
