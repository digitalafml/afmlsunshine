import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteContent, defaultContent, mergeContent } from "@/content/siteContent";

const CONTENT_ID = "main";

interface SiteContentContextValue {
  content: SiteContent;
  loading: boolean;
  refresh: () => Promise<void>;
  save: (next: SiteContent) => Promise<{ error: string | null }>;
}

const SiteContentContext = createContext<SiteContentContextValue>({
  content: defaultContent,
  loading: true,
  refresh: async () => {},
  save: async () => ({ error: null }),
});

function applyTheme(theme: SiteContent["theme"]) {
  const root = document.documentElement;
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--ring", theme.primary);
  root.style.setProperty("--sunshine-yellow", theme.primary);
  root.style.setProperty("--secondary", theme.secondary);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--foreground", theme.foreground);
  root.style.setProperty("--sunshine-gold", theme.sunshineGold);
  root.style.setProperty("--akij-red", theme.akijRed);
}

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data } = await supabase
      .from("site_content")
      .select("data")
      .eq("id", CONTENT_ID)
      .maybeSingle();

    const merged = mergeContent(data?.data);
    setContent(merged);
    applyTheme(merged.theme);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(async (next: SiteContent) => {
    const { error } = await supabase
      .from("site_content")
      .upsert({ id: CONTENT_ID, data: JSON.parse(JSON.stringify(next)) });
    if (error) return { error: error.message };
    setContent(next);
    applyTheme(next.theme);
    return { error: null };
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, loading, refresh, save }}>
      {children}
    </SiteContentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSiteContent = () => useContext(SiteContentContext);
