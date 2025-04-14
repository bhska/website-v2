import { cn, getPosts } from '@/lib/utils';
import Post from './post';
import { Cross, Section } from '@/components/common/section';

interface PostsProps {
  range?: [number] | [number, number];
  columns?: '1' | '2' | '3';
  thumbnail?: boolean;
}

export function Posts({ range, columns = '1', thumbnail = false }: PostsProps) {
  let allBlogs = getPosts(['src', 'app', 'blog', 'posts']);

  const sortedBlogs = allBlogs.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && (
        <div className={cn('relative grid grid-cols-1', `md:grid-cols-[${columns}]`)}>
          <div className="absolute -top-3 -left-3 z-10 hidden h-6 sm:block">
            <Cross />
          </div>
          <div className="absolute -top-3 -right-3 z-10 hidden h-6 sm:block">
            <Cross />
          </div>

          {displayedBlogs.map((post, index) => (
            <Section
              key={post.slug}
              className={cn(
                'bg-backdrop relative flex w-full justify-center gap-8 border-t shadow-none',
                index === displayedBlogs.length - 1 && 'border-b',
              )}
            >
              <Post key={post.slug} post={post} thumbnail={thumbnail} />
            </Section>
          ))}
        </div>
      )}
    </>
  );
}
