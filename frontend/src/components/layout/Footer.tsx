import React from 'react';

interface FooterProps {
  onOpenAdmin: () => void;
  collegeName?: string;
  email?: string;
  phone?: string;
  address?: string;
  instagramUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer style={{ borderTop: '1px solid var(--line)' }}>
      <div className="wrap mono">
        <span>Tech Gallery 2027</span>
        <span>18–24 January 2027</span>
        <span>Made by the student organising committee</span>
        <button
          onClick={onOpenAdmin}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--mute)',
            cursor: 'pointer',
            padding: 0,
            font: 'inherit',
            textDecoration: 'underline',
          }}
        >
          Admin Portal
        </button>
      </div>
    </footer>
  );
};
