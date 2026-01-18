import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
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
        backgroundColor: '#f5f5f4',
        fontFamily: 'Figtree',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        {
          type: 'div',
          key: 'bg',
          props: {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'radial-gradient(circle at 20% 80%, rgba(13, 33, 47, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.05) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.03) 0%, transparent 70%)',
            },
          },
        },
        {
          type: 'div',
          key: 'tl',
          props: {
            style: {
              position: 'absolute',
              top: 40,
              left: 40,
              width: 100,
              height: 100,
              borderTop: '3px solid #0d212f',
              borderLeft: '3px solid #0d212f',
            },
          },
        },
        {
          type: 'div',
          key: 'tr',
          props: {
            style: {
              position: 'absolute',
              top: 40,
              right: 40,
              width: 100,
              height: 100,
              borderTop: '3px solid #0d212f',
              borderRight: '3px solid #0d212f',
            },
          },
        },
        {
          type: 'div',
          key: 'bl',
          props: {
            style: {
              position: 'absolute',
              bottom: 40,
              left: 40,
              width: 100,
              height: 100,
              borderBottom: '3px solid #0d212f',
              borderLeft: '3px solid #0d212f',
            },
          },
        },
        {
          type: 'div',
          key: 'br',
          props: {
            style: {
              position: 'absolute',
              bottom: 40,
              right: 40,
              width: 100,
              height: 100,
              borderBottom: '3px solid #0d212f',
              borderRight: '3px solid #0d212f',
            },
          },
        },
        {
          type: 'div',
          key: 'content',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
            },
            children: [
              {
                type: 'h1',
                key: 'name1',
                props: {
                  style: {
                    fontSize: 72,
                    fontWeight: 500,
                    color: '#0d212f',
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: 1.1,
                  },
                  children: 'Azra Muhammad',
                },
              },
              {
                type: 'h1',
                key: 'name2',
                props: {
                  style: {
                    fontSize: 72,
                    fontWeight: 500,
                    color: '#0d212f',
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: 1.1,
                  },
                  children: 'Bhaskarogra',
                },
              },
              {
                type: 'div',
                key: 'divider',
                props: {
                  style: {
                    width: 200,
                    height: 3,
                    backgroundColor: '#a855f7',
                    borderRadius: 2,
                  },
                },
              },
              {
                type: 'p',
                key: 'title',
                props: {
                  style: {
                    fontSize: 32,
                    color: '#78716c',
                    margin: 0,
                    textAlign: 'center',
                    maxWidth: 800,
                    lineHeight: 1.4,
                  },
                  children: 'Software Engineer & Creative Developer',
                },
              },
              {
                type: 'div',
                key: 'tags',
                props: {
                  style: {
                    display: 'flex',
                    gap: 16,
                    marginTop: 16,
                  },
                  children: ['Next.js', 'React', 'TypeScript', 'UI/UX'].map((tag, i) => ({
                    type: 'span',
                    key: tag,
                    props: {
                      style: {
                        fontSize: 20,
                        padding: '8px 20px',
                        backgroundColor: '#0d212f',
                        color: '#ffffff',
                        borderRadius: 20,
                        fontWeight: 400,
                      },
                      children: tag,
                    },
                  })),
                },
              },
              {
                type: 'p',
                key: 'url',
                props: {
                  style: {
                    fontSize: 24,
                    color: '#a8a29e',
                    margin: '24px 0 0 0',
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
  });
}
