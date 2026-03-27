import { fetchHosts } from "@/app/lib/api";

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elite-lounge.sv";

  let hosts = [];
  try {
    hosts = await fetchHosts({ page: 0, size: 100 });
  } catch {
    hosts = [];
  }

  const profileUrls = hosts
    .filter((host) => host?.code)
    .map((host) => ({
      url: `${siteUrl}/perfiles/${host.code}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...profileUrls,
  ];
}
