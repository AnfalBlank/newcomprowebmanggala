import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'PT. Manggala Utama Indonesia | System Integrator & Engineering'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 50%, #0a0a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 400,
            background: 'radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            zIndex: 10,
            padding: '0 80px',
            textAlign: 'center',
          }}
        >
          {/* Badge */}
          <div
            style={{
              background: 'rgba(59,130,246,0.2)',
              border: '1px solid rgba(59,130,246,0.4)',
              borderRadius: 100,
              padding: '8px 24px',
              color: '#93c5fd',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            System Integrator & Engineering
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            PT. Manggala Utama
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1,
            }}
          >
            Indonesia
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 20,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 700,
              lineHeight: 1.5,
            }}
          >
            Fueling System · Infrastruktur IT · Otomatisasi Industri · Software Development
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.3)',
              marginTop: 8,
            }}
          >
            www.manggala-utama.id
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
