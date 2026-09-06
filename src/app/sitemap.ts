// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://awasscampmi.com';

  // Ambil semua slug dari Supabase
  const { data: scams } = await supabase.from('scams').select('slug, created_at');

  const scamUrls = (scams || []).map((scam) => ({
    url: `${baseUrl}/modus/${scam.slug}`,
    lastModified: new Date(scam.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/modus`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...scamUrls,
  ];
}