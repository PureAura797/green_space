import { MetadataRoute } from 'next';
import { absoluteUrl, company, services, siteUrl } from '@/lib/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: '2026-04-16',
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        absoluteUrl(company.ogImage),
        ...services.map((service) => absoluteUrl(service.image)),
      ],
    },
  ];
}
