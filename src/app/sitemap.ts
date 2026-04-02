import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://goslend.ru',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // For a multi-page site, you would dynamically map over blog posts or services here
  ];
}
