export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elite-lounge.sv";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
