/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['tecdn.b-cdn.net'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tecdn.b-cdn.net',
            },
        ],
    },
}

module.exports = nextConfig
