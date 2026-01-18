import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Load Figtree font from Google Fonts
const figtreeRegular = fetch(
  new URL(
    'https://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_d_QF5ewkEU4HTy.ttf',
  ),
).then((res) => res.arrayBuffer());

const figtreeMedium = fetch(
  new URL(
    'https://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_chQF5ewkEU4HTy.ttf',
  ),
).then((res) => res.arrayBuffer());

export async function GET() {
  const [fontRegular, fontMedium] = await Promise.all([figtreeRegular, figtreeMedium]);

  // Grid cross positions for the minimalist design
  const crossPositions = [
    { x: 200, y: 157 },
    { x: 400, y: 157 },
    { x: 600, y: 157 },
    { x: 800, y: 157 },
    { x: 1000, y: 157 },
    { x: 200, y: 315 },
    { x: 1000, y: 315 },
    { x: 200, y: 473 },
    { x: 400, y: 473 },
    { x: 600, y: 473 },
    { x: 800, y: 473 },
    { x: 1000, y: 473 },
  ];

  const root: any = {
    type: 'div',
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafaf9',
        fontFamily: 'Figtree',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        // Horizontal lines
        {
          type: 'div',
          key: 'h-line-1',
          props: {
            style: {
              position: 'absolute',
              top: 157,
              left: 0,
              right: 0,
              height: 1,
              backgroundColor: '#e7e5e4',
            },
          },
        },
        {
          type: 'div',
          key: 'h-line-2',
          props: {
            style: {
              position: 'absolute',
              top: 473,
              left: 0,
              right: 0,
              height: 1,
              backgroundColor: '#e7e5e4',
            },
          },
        },

        // Cross marks at intersections
        ...crossPositions.map((pos, i) => ({
          type: 'div',
          key: `cross-${i}`,
          props: {
            style: {
              position: 'absolute',
              left: pos.x - 8,
              top: pos.y - 8,
              width: 16,
              height: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              color: '#d6d3d1',
              fontWeight: 300,
            },
            children: '+',
          },
        })),
        // Main content
        {
          type: 'div',
          key: 'content',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 100px',
              zIndex: 10,
            },
            children: [
              {
                type: 'div',
                key: 'name',
                props: {
                  style: {
                    fontSize: 64,
                    fontWeight: 500,
                    color: '#1c1917',
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  },
                  children: 'Azra Muhammad Bhaskarogra',
                },
              },
              {
                type: 'div',
                key: 'title',
                props: {
                  style: {
                    fontSize: 28,
                    color: '#78716c',
                    margin: '20px 0 0 0',
                    textAlign: 'center',
                    fontWeight: 400,
                  },
                  children: 'Software Engineer & Creative Developer',
                },
              },
              {
                type: 'div',
                key: 'url',
                props: {
                  style: {
                    fontSize: 20,
                    color: '#a8a29e',
                    marginTop: 24,
                    padding: '8px 20px',
                    border: '1px solid #e7e5e4',
                    borderRadius: 6,
                    backgroundColor: '#ffffff',
                  },
                  children: 'bhsk.dev',
                },
              },
            ],
          },
        },
      ],
    },
  };

  return new ImageResponse(root, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Figtree',
        data: fontRegular,
        style: 'normal',
        weight: 400,
      },
      {
        name: 'Figtree',
        data: fontMedium,
        style: 'normal',
        weight: 500,
      },
    ],
  });
}
