'use client';

import { Section } from '@/components/common/section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/date';
import Image from 'next/image';
import Link from 'next/link';

interface PostProps {
  post: any;
  thumbnail: boolean;
}

export default function Post({ post, thumbnail }: PostProps) {
  const tags = post.metadata.tag.split(',').map((tag: string) => tag.trim());

  return (
    <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex w-full p-1">
      <div className="flex w-full justify-center">
        {post.metadata.image && thumbnail && (
          <Image
            width={20}
            height={640}
            src={post.metadata.image}
            alt={'Thumbnail of ' + post.metadata.title}
          />
        )}

        <div className="relative flex flex-1 flex-col items-center gap-2 p-3 transition-all duration-100 ease-in-out group-hover:bg-neutral-200">
          <h2 className="font-mono text-2xl font-medium">{post.metadata.title}</h2>
          <span className="text-xs">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt, false)}
          </span>
          {tags.length > 0 && (
            <div className="flex gap-2">
              {tags.map((tag: string, index: number) =>
                index < 3 ? (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ) : null,
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
