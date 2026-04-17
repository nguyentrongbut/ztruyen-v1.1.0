// ** Next
import type { NextConfig } from "next";

// ** Next PWA
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,

    runtimeCaching: [],

    buildExcludes: [
        /firebase-messaging-sw\.js$/,
    ],
})(nextConfig);