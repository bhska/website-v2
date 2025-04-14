import { Section } from '@/components/common/section';
import ExpItem, { ExpItemProps } from './exp-item';

const items: ExpItemProps[] = [
  {
    status: ['hybrid', 'full-time'],
    period: '2024 - Present',
    title: 'Lazuardy',
    description: (
      <>
        <p className="prose">
          Currently, I am serving as the Head of Software Engineering at Lazuardy, a position I've
          held since October 2024. In this role, I lead and manage software engineering teams to
          deliver innovative and robust software solutions, ensuring high-quality standards and
          efficient development practices.
        </p>
      </>
    ),
    role: 'Head of Software Engineering • Software Engineer',
    image: '/images/lazuardy.webp',
    link: 'https://lazuardy.tech/?ref=bhsk.dev',
    position: 'reverse',
  },
  {
    status: ['onsite', 'internship'],
    period: '2024 - Present',
    title: 'Unit Pengelola dan Pelayanan Teknologi Informasi (UP2TI) FSM Universitas Diponegoro',
    description: (
      <>
        <p className="prose">
          At Unit Pengelola dan Pelayanan Teknologi Informasi, since February 2024, I have been
          actively involved in multiple specialized roles, including Full Stack Developer, Network
          Engineer, and System Administrator. As a Full Stack Developer, I spearheaded the creation
          of an advanced security patrol information platform integrated with a mobile application,
          significantly enhancing operational efficiency. Additionally, I engineered a web-based
          academic correspondence request system to streamline faculty communications and
          administrative processes.
        </p>
        <p className="prose">
          As a Network Engineer at the same institution, I optimized the faculty's local network
          topology, ensuring seamless connectivity and enhancing performance for all users. I
          expertly configured network devices from vendors such as Aruba, Cisco, and MikroTik,
          installed and maintained complex local network infrastructures, and revitalized existing
          network technologies to improve user experience significantly.
        </p>
        <p className="prose">
          In my role as a System Administrator, I have performed installations, routine checks, and
          maintenance on physical servers, ensuring optimal performance and reliability. I managed
          and configured server infrastructure utilizing Proxmox VE virtualization technology across
          up to 10 nodes and oversaw effective power and network distribution to ensure stable and
          continuous operations.
        </p>
      </>
    ),
    image: '/images/undip.webp',
    role: 'Full-Stack Engineer • Network Engineer • System Administrator',
    link: 'https://example.com/project1',
  },
  {
    status: ['remote', 'freelance'],
    period: '2024 - present',
    title: 'DirectMail 2.0',
    description: (
      <>
        <p className="prose">
          During my tenure at DirectMail 2.0, I contributed to the development of the company's
          latest web-based platform, actively participating in building and refining its core
          functionalities. My responsibilities included designing and developing reusable front-end
          components, ensuring consistency and scalability across the entire application.
          Collaborating closely with cross-functional teams, I translated complex requirements into
          intuitive, user-focused solutions that enhanced platform performance and user experience.
          This role allowed me to leverage and further develop my expertise in modern web
          development technologies, demonstrating my capability to deliver high-quality, impactful
          software solutions.
        </p>
      </>
    ),
    role: 'Front-End Engineer',
    image: '/images/dm20.webp',
    link: 'https://example.com/project2',
    position: 'reverse',
  },
  {
    status: ['hybrid', 'full-time'],
    period: '2019 - 2023',
    title: 'KodingWorks',
    description: (
      <>
        <p className="prose">
          At KodingWorks, I worked as a Front-End Engineer across multiple periods between December
          2019 and October 2023. My responsibilities included developing innovative applications
          such as blockchain-based payment gateway dashboards, merchant management platforms like
          Warung.io, spa order management systems, educational learning management systems, carbon
          footprint calculators, hotel booking applications, coworking space management solutions,
          and e-commerce platforms. Utilizing advanced technologies like JavaScript, ReactJS,
          NextJS, and Typescript, I collaborated with cross-functional teams and consistently
          delivered impactful, user-oriented front-end solutions.
        </p>
      </>
    ),
    role: 'Front-End Engineer',
    image: '/images/kw.webp',
    link: 'https://kodingworks.io/?ref=bhsk.dev',
  },
];

export const ExpList = () => {
  return (
    <Section>
      {items.map((item, index) => (
        <ExpItem key={item.title} {...item} />
      ))}
    </Section>
  );
};
