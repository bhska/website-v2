'use client';

import { ViewAnimation } from '@/providers/view-animation';
import { Section } from '@/components/common/section';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export const AboutMe = () => {
  return (
    <Section className="grid items-start divide-y lg:grid-cols-2 lg:divide-x lg:divide-y-0">
      <div>
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.3}
          viewport={{ once: true }}
          className={cn('flex h-full flex-col items-start justify-between gap-4 p-6', 'sm:p-8')}
        >
          <div className="flex flex-col gap-2">
            <small className="text-muted-foreground">About me</small>
            <span className="prose [&_a]:no-underline">
              <p>Hi there!</p>
              <p>
                My name is Azra Muhammad Bhaskarogra, but most people simply call me Azra or Bhaska.
                Right now, I'm currently studying at Diponegoro University, majoring in Informatics.
                Being an informatics student has opened up many exciting opportunities for me to
                explore all about technology, programming, and software engineering.
              </p>
              <p>
                When I'm not busy with classes, assignments, or work, I have several hobbies that
                I'm really passionate about. I love playing badminton because it's a great way to
                stay active, have fun, and relieve stress. Apart from sports, I also enjoy exploring
                machinery, robotics, and keeping myself updated with the latest tech developments—I
                just can't resist learning about new innovations!
              </p>
              <p>
                At my university, I'm actively involved in student organizations. I&apos;m a proud
                member of my department's student association, and I also contribute as a programmer
                in our university's robotic student activity unit, specifically working on drones.
                Being part of these groups has helped me develop teamwork skills, meet awesome
                people, and gain practical experience in my field.
              </p>

              <p>
                As an Informatics student, I'm expected to master various aspects of the software
                engineering process. While I definitely enjoy the technical side of things, coding
                and developing software, I also have a keen interest in the creative side. Designing
                intuitive, user-friendly interfaces and user experiences (UI/UX) is something I
                genuinely love doing. I believe a good design can make technology accessible and
                enjoyable for everyone. Feel free to reach out and connect if you share similar
                interests or just want to chat about technology, badminton, robotics, or anything
                exciting.
              </p>

              <p>I'm always open to making new friends and connections!</p>
              <p>
                Sound interesting? Feel free to <Link href="/contact">chat with me!</Link>
              </p>
            </span>
          </div>
        </ViewAnimation>
      </div>
      <div className="size-full p-8 pb-0">
        <ViewAnimation
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          delay={0.4}
          viewport={{ once: true }}
          className="size-full"
        >
          <div className="sticky top-24 pb-16">
            <div className="relative">
              <div className="absolute -bottom-10 z-10 h-1/5 w-full bg-white blur-[16px] filter"></div>
              <Image
                src="/images/me.webp"
                width="450"
                height="660"
                alt="Azra Muhammad Bhaskarogra"
                className="border-background mx-auto rounded-2xl border-b"
              />
            </div>
          </div>
        </ViewAnimation>
      </div>
    </Section>
  );
};
