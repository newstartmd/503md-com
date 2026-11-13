// Security headers for 503MD — a PHI-free educational reference.
// The site publishes peptide/metabolic-therapy information and captures
// provider interest (front-end only). No patient health information is
// collected here; fulfillment/clinical systems are a separate, later layer.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=(), payment=(), interest-cohort=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // This repo sits inside a larger working tree with other lockfiles; pin the
  // tracing root to this project so Vercel traces the right files.
  outputFileTracingRoot: import.meta.dirname,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/providers/signup", destination: "/providers", permanent: true },
      { source: "/signup", destination: "/providers", permanent: false },
      { source: "/library", destination: "/compounds", permanent: true },
      { source: "/peptides", destination: "/compounds", permanent: true },
    ];
  },
};

export default nextConfig;
