import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Evolution Body System',
        short_name: 'Evolution',
        description: 'Advanced Hypertrophy & Strength Periodization',
        start_url: '/dashboard',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/icon',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
