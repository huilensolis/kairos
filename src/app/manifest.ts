import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Kairos PWA',
        short_name: 'KairosPWA',
        description: 'Minimalist time blocking aplication for deep work sessions',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/favicon_io/favicon-16x16.png',
                sizes: '16x16',
                type: 'image/png',
            },
            {
                src: '/favicon_io/favicon-32x32.png',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                src: '/favicon_io/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/favicon_io/android-chrome-512x512.png',
                sizes: '192x192',
                type: 'image/png',
            },
        ],
    }
}
