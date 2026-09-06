// src/types/scam.ts

export interface ScamItem {
  id: string;
  created_at?: string;
  updated_at?: string;
  title: string;
  slug: string;
  summary?: string;
  description?: string;
  chronology?: string;

  // Kategori (Support Supabase & CamelCase)
  category_slug?: string;
  categorySlug?: string;
  category?: string;

  // Target Negara
  target_country?: string;
  targetCountry?: string;

  // Tingkat Risiko
  risk_level?: string;
  riskLevel?: string;

  // Ciri-ciri Penipuan
  red_flags?: string[];
  redFlags?: string[];

  // Data tambahan
  check_steps?: any[];
  official_contacts?: any[];
  views?: number;
}