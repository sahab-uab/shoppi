/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa");
const { hostname } = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`);

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      `${hostname}`,
      "preview.codesuab.com",
      "source.unsplash.com",
      "picsum.photos", // ✅ THIS is the key part
    ],
  },
};

const pwa = process.env.NEXT_PWA_STATUS;
const nextConfigWithPwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);

module.exports = pwa === "1" ? nextConfigWithPwa : nextConfig;
