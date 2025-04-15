import { notFound } from 'next/navigation';
import { getPosts } from '@/lib/utils';
import { formatDate } from '@/lib/date';
import { Button } from '@/components/ui/button';
import { person, baseURL } from '@/resources';
import Link from 'next/link';
import { CustomMDX } from '@/components/common/mdx';
import ScrollToHash from '@/components/common/scroll-to-hash';
import { Section } from '@/components/common/section';
import { ArrowLeft } from 'lucide-react';

interface BlogProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getPosts(['src', 'app', 'blog', 'posts']);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPosts(['src', 'app', 'blog', 'posts']).find((post) => post.slug === slug);

  if (!post) {
    return null;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    images,
    image,
    team,
  } = post.metadata;
  const ogImage = image ? `https://${baseURL}${image}` : `https://${baseURL}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://${baseURL}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
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

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPosts(['src', 'app', 'blog', 'posts']).find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Section className="px-2 py-8">
      <div className="mx-auto flex max-w-md flex-col gap-2">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: post.metadata.image
                ? `https://${baseURL}${post.metadata.image}`
                : `https://${baseURL}/og?title=${post.metadata.title}`,
              url: `https://${baseURL}/blog/${post.slug}`,
              author: {
                '@type': 'Person',
                name: person.name,
              },
            }),
          }}
        />

        <Link href="/blog" className="w-max">
          <Button variant="outline" size="sm" className="w-fit">
            <ArrowLeft />
            Posts
          </Button>
        </Link>
        <div className="flex flex-col gap-3 py-3">
          <h1 className="font-mono text-2xl font-medium sm:text-4xl">{post.metadata.title}</h1>
          <span>{post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}</span>
        </div>

        <div className="flex flex-col gap-2">
          <CustomMDX source={post.content} />
        </div>
        <ScrollToHash />
      </div>
    </Section>
  );
}
