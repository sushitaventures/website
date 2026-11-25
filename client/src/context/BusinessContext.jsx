import React, { createContext, useContext, useState, useEffect } from 'react';

export const BUSINESS_VERTICALS = [
  {
    id: 'real-estate',
    name: 'Real Estate Advisory',
    tagline: 'Private, Commercial & Strategic Property Portfolios',
    slug: 'real-estate',
  },
  {
    id: 'investments',
    name: 'Capital & Investments',
    tagline: 'High-Yield Asset Placement & Venture Structuring',
    slug: 'investments',
  },
  {
    id: 'turnaround',
    name: 'Turnaround & Distressed',
    tagline: 'Asset Revitalisation & Strategic Workouts',
    slug: 'turnaround',
  },
];

const BusinessContext = createContext({
  activeVertical: BUSINESS_VERTICALS[0],
  setActiveVertical: () => {},
  verticals: BUSINESS_VERTICALS,
});

export const BusinessProvider = ({ children }) => {
  const [activeVertical, setActiveVerticalState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sushita_active_vertical');
      if (saved) {
        const found = BUSINESS_VERTICALS.find((v) => v.id === saved);
        if (found) return found;
      }
    }
    return BUSINESS_VERTICALS[0];
  });

  const setActiveVertical = (vertical) => {
    setActiveVerticalState(vertical);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sushita_active_vertical', vertical.id);
    }
  };

  return (
    <BusinessContext.Provider
      value={{
        activeVertical,
        setActiveVertical,
        verticals: BUSINESS_VERTICALS,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => useContext(BusinessContext);
export default BusinessContext;
