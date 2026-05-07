import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Company {
  id: string;
  company_name: string;
  logo: string;
  logo_url: string;
  address: string;
  email: string;
  phone: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

interface Contact {
  id: string;
  email: string;
  phone: string;
  address: string;
  opening_hours: string;
}

interface FooterItem {
  id: string;
  title: string;
  link: string;
}

interface FooterConfig {
  id: string;
  copyright_text: string;
  footer_logo: string;
}

interface SiteSettings {
  company: Company | null;
  contact: Contact | null;
  footer: {
    config: FooterConfig | null;
    items_first: FooterItem[];
    items_second: FooterItem[];
  };
}

interface SiteContextType {
  settings: SiteSettings | null;
  isLoading: boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_BARGAIN_URL || 'http://bargainshop.test';

export function SiteProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/Settings_api`);
        
        // Handle non-JSON responses (like 500 errors returning HTML)
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error('Server returned non-JSON response');
        }

        const data = await response.json();
        
        if (data.status === 'success' && data.data) {
          setSettings(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <SiteContext.Provider value={{ settings, isLoading }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteProvider');
  }
  return context;
}
