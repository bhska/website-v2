import HeroSection from '@/components/common/hero-section';
import { blog, baseURL, person } from '@/resources';
import { Posts } from './components/posts';
import { Section } from '@/components/common/section';
import { ViewAnimation } from '@/providers/view-animation';

export async function generateMetadata() {
  const title = blog.title;
  const description = blog.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://${baseURL}/blog`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog() {
  return (
    <>
      <HeroSection
        title="Blog"
        description="The entirety of my musings and annotations throughout this existence abundant with melodrama."
      />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            headline: blog.title,
            description: blog.description,
            url: `https://${baseURL}/blog`,
            image: `${baseURL}/og?title=${encodeURIComponent(blog.title)}`,
            author: {
              '@type': 'Person',
              name: person.name,
              image: {
                '@type': 'ImageObject',
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />

      <Section>
        <ViewAnimation
          initial={{ opacity: 0, translateY: -4 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.4}
          viewport={{ once: true }}
        >
          <div className="flex flex-col p-10">
            <Posts range={[1, 3]} thumbnail />
            <Posts range={[4]} columns="2" />
          </div>
        </ViewAnimation>
      </Section>
    </>
  );
}
