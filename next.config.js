/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
