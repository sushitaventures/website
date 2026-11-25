import React from 'react';

export const Badge = ({ variant = 'default', children }) => {
  const styles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '3px 10px',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.04em',
    textTransform: 'none',
    fontFamily: 'var(--font-mono)'
  };

  const variantStyles = {
    default: { background: '#1e2230', color: '#8b92a5', border: '1px solid #2d3345' },
    success: { background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' },
    warning: { background: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' },
    danger: { background: 'rgba(244, 63, 94, 0.12)', color: '#f43f5e', border: '1px solid rgba(244, 63, 94, 0.3)' },
    cyan: { background: 'rgba(0, 210, 255, 0.12)', color: '#00d2ff', border: '1px solid rgba(0, 210, 255, 0.3)' }
  };

  const applied = { ...styles, ...(variantStyles[variant] || variantStyles.default) };

  return <span style={applied}>{children}</span>;
};
