import { ImageResponse } from 'next/og'

export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 120,
                    background: 'linear-gradient(to bottom right, #333333, #000000)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '20%', // iOS icon style
                    fontWeight: 900,
                    fontFamily: 'sans-serif'
                }}
            >
                E
            </div>
        ),
        {
            ...size,
        }
    )
}
