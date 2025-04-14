import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import Image, { ImageProps } from 'next/image';
import Link, { LinkProps } from 'next/link';
import React, { ReactNode } from 'react';
import { CodeBlock } from './code-block';

type TableProps = {
  data: {
    headers: string[];
    rows: string[][];
  };
};

function Table({ data }: TableProps) {
  const headers = data.headers.map((header, index) => <th key={index}>{header}</th>);
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement & LinkProps> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: ImageProps & { src: string }) {
  if (!src) {
    console.error("Image requires a valid 'src' property.");
    return null;
  }

  return <Image className="my-20 aspect-video rounded-lg" alt={alt} src={src} {...props} />;
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const CustomHeading = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const slug = slugify(children as string);

    const headingStyle = () => {
      switch (level) {
        case 1:
          return 'text-3xl md:text-4xl  font-medium font-mono';
        case 2:
          return 'text-2xl md:text-3xl  font-medium font-mono';
        case 3:
          return 'text-xl md:text-2xl  font-medium font-mono';
        case 4:
          return 'text-lg md:text-xl  font-medium font-mono';
        case 5:
          return 'text-md md:text-lg  font-medium font-mono';
        case 6:
          return 'text-sm md:text-base  font-medium font-mono';
      }
    };

    return (
      <span id={slug} className={`${headingStyle()} ${props.className || ''}`} {...props}>
        {children}
      </span>
    );
  };

  CustomHeading.displayName = `Heading${level}`;

  return CustomHeading;
}

function createParagraph({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={className || 'prose mt-2 mb-3'} {...props}>
      {children}
    </p>
  );
}

const components = {
  p: createParagraph as any,
  h1: createHeading(1) as any,
  h2: createHeading(2) as any,
  h3: createHeading(3) as any,
  h4: createHeading(4) as any,
  h5: createHeading(5) as any,
  h6: createHeading(6) as any,
  img: createImage as any,
  a: CustomLink as any,
  Table,
  CodeBlock,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    // @ts-ignore: Suppressing type error for MDXRemote usage
    <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
  );
}
