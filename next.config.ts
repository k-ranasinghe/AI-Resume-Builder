import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: "4mb",
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "x52nhk97io8supkz.public.blob.vercel-storage.com"
            }
        ]
    }
};

export default nextConfig;
