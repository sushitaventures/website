import React from 'react';

export const StatusCard = ({ title, subtitle, status, badgeVariant = 'default', details, error }) => {
  const cardStyle = {
    background: 'var(--surface)',
    border: '1px solid var(--surface-border)',
    borderRadius: '12px',
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const titleStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-primary)'
  };

  const subtitleStyle = {
    fontSize: '0.85rem',
    color: 'var(--text-muted)'
  };

  const codeBoxStyle = {
    background: '#0a0b10',
    padding: '10px 14px',
    borderRadius: '8px',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.78rem',
    color: '#a5b4fc',
    border: '1px solid #1a1d29',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all'
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div>
          <h3 style={titleStyle}>{title}</h3>
          {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        </div>
        {status}
      </div>

      {details && (
        <div style={codeBoxStyle}>
          {typeof details === 'string' ? details : JSON.stringify(details, null, 2)}
        </div>
      )}

      {error && (
        <div style={{ ...codeBoxStyle, color: '#f87171', border: '1px solid rgba(244, 63, 94, 0.3)', background: 'rgba(244, 63, 94, 0.05)' }}>
          {error}
        </div>
      )}
    </div>
  );
};
