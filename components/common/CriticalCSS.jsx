export default function CriticalCSS() {
  return (
    <>
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Critical inline styles for above-the-fold content */}
      <style jsx global>{`
        /* Critical CSS for initial render */
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Prevent layout shift from images */
        img {
          max-width: 100%;
          height: auto;
        }
        
        /* Critical container styles */
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        /* Prevent FOUC for header */
        header {
          min-height: 60px;
        }
      `}</style>
    </>
  );
}