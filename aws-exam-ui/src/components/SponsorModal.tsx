import React from 'react';
import { SPONSOR_BMC_URL, SPONSOR_UPI_ID } from '../types';

interface SponsorModalProps {
  show: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function SponsorModal({ show, onOpen, onClose }: SponsorModalProps) {
  return (
    <>
      <button className="sponsor-fab" onClick={onOpen} title="Support this project">
        ☕
      </button>
      {show && (
        <div className="sponsor-overlay" onClick={onClose}>
          <div className="sponsor-modal" onClick={(e) => e.stopPropagation()}>
            <button className="sponsor-close" onClick={onClose}>✕</button>
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
    </>
  );
}
