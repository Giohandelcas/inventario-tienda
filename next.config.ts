import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Host de imágenes de producto (Cloudinary/S3, sección 5 de
    // requerimientos.md) todavía no está decidido — permissivo por ahora,
    // restringir a los hostnames reales apenas se elija uno (RNF-05).
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
