import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services';
import { SITE } from '@/lib/constants';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const { data, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data: s } = await api.settings();
      return s;
    },
    staleTime: 5 * 60 * 1000,
  });

  const settings = { ...SITE, ...(data || {}) };

  return (
    <SettingsContext.Provider value={{ settings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
