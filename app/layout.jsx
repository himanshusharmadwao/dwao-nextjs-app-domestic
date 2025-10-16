import Header from '@/components/layout/header'

import '@/styles/global.css'
import Footer from "@/components/layout/footer";
import { getRegions } from '@/libs/apis/data/menu';
import { headers } from 'next/headers';
import Script from 'next/script';

export const metadata = {
  title: {
    template: "%s | DWAO",
    default: "DWAO"
  },
  description: "DWAO offers digital transformation and marketing services, including analytics, CRO, performance marketing, CDP, marketing automation, SEO, and more, helping businesses enhance their online presence, optimize performance, and drive growth."
};

export default async function RootLayout({ children, searchParams }) {

  const h = headers();
  const preview = h.get('x-preview') === '1';

  const regions = await getRegions(preview);

  return (
    <html lang="en">
      <head>
        {/* ✅ Google Tag Manager */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function (w, d, s, l, i) {
                    w[l] = w[l] || []; w[l].push({
                      'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
                }); var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
              })(window, document, 'script', 'dataLayer', 'GTM-5G4XP4S');
            `,
          }}
        />
        {regions?.data?.map(region => {
          const slug = region?.slug;
          const hreflang = region?.hrefLang;
          if (!hreflang) return null;
          const url =
            hreflang === "default"
              ? process.env.NEXT_PUBLIC_DWAO_DOMESTIC_URL
              : `${process.env.NEXT_PUBLIC_DWAO_DOMESTIC_URL}/${slug}`;
          return (
            <link
              key={hreflang}
              rel="alternate"
              hrefLang={hreflang}
              href={url}
            />
          );
        })}
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5G4XP4S"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Header preview={preview} />
        {children}
        <Footer preview={preview} />
      </body>
    </html>
  );
}
