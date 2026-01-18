const person = {
  firstName: 'Azra',
  lastName: 'Muhammad Bhaskarogra',
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: 'Software Engineer',
  avatar: '/images/me.png',
  location: 'Asia/Jakarta', // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ['English', 'Bahasa'], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to Lazuardy's Newsletter</>,
  description: (
    <>
      At Lazuardy, I sometimes write on about design, technology, and the intersection of creativity
      and engineering.
    </>
  ),
};

const contact = [
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    link: 'https://www.linkedin.com/in/mhmdbhsk',
  },
  {
    name: 'Github',
    icon: 'github',
    link: 'https://www.github.com/bhska',
  },
  {
    name: 'Facebook',
    icon: 'facebook',
    link: 'https://www.facebook.com/mhmdbhsk',
  },
  {
    name: 'X',
    icon: 'x',
    link: 'https://www.x.com/bhskaaa',
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    link: 'https://www.instagram.com/bhskaaa',
  },
  {
    name: 'Email',
    icon: 'personal-email',
    link: 'mailto:me@bhsk.dev',
  },
];

const home = {
  label: 'Home',
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing ${person.firstName}'s work.`,
  headline: <>Software Engineer</>,
  subline: (
    <>
      Hi there! I'm Bhaska, Software Engineer at Lazuardy,
      <br /> where I help businesses grow bigger through technology.
    </>
  ),
};

const about = {
  label: 'About',
  title: 'About me',
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: 'https://cal.com',
  },
  intro: {
    display: true,
    title: 'Introduction',
    description: (
      <>
        I lead and manage software engineering teams to deliver innovative and robust software
        solutions, ensuring high-quality standards and efficient development practices.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: 'Work Experience',
    experiences: [
      {
        company: 'Lazuardy',
        timeframe: 'Oct 2024 - Present',
        role: 'Head of Software Engineering • Software Engineer',
        achievements: [
          <>
            Conducted market research and helped shape the company’s vision and mission, driving
            business growth and positioning Lazuardy in the tech industry.
          </>,
          <>
            Lead and managed software engineering teams to deliver innovative and robust software
            solutions, ensuring high-quality standards and efficient development practices.
          </>,
        ],
        images: [
          {
            src: '/images/lazuardy.webp',
            alt: 'Lazuardy Logo',
            width: 16,
            height: 9,
          },
        ],
        status: ['hybrid', 'full-time'],
        link: 'https://lazuardy.tech/?ref=bhsk.dev',
      },
      {
        company:
          'Unit Pengelola dan Pelayanan Teknologi Informasi (UP2TI) FSM Universitas Diponegoro',
        timeframe: 'Feb 2024 - Present',
        role: 'Full-Stack Engineer • Network Engineer • System Administrator',
        achievements: [
          <>
            Spearheaded the creation of an advanced information platform tailored for enhancing
            security patrol operations, seamlessly integrated with a robust mobile app to elevate
            field operational efficiency.
          </>,
          <>
            Engineered a web-based academic correspondence request system for faculty, streamlining
            communication processes and significantly boosting administrative productivity.
          </>,
          <>
            Optimized the faculty's local network topology, ensuring seamless connectivity and
            enhanced performance for all users by configuring devices from vendors such as Aruba,
            Cisco, and MikroTik.
          </>,
          <>
            Successfully installed and maintained a local network infrastructure with over 12 core
            device points, revitalizing existing network technologies and driving improved user
            experiences.
          </>,
          <>
            Managed and configured a robust infrastructure of up to 10 node servers using Proxmox
            VE, enhancing virtualization and resource management capabilities.
          </>,
        ],
        images: [
          {
            src: '/images/undip.webp',
            alt: 'UP2TI FSM Universitas Diponegoro',
            width: 16,
            height: 9,
          },
        ],
        status: ['onsite', 'internship'],
        link: 'https://example.com/project1',
      },
      {
        company: 'DirectMail 2.0',
        timeframe: '2024 - Present',
        role: 'Front-End Engineer',
        achievements: [
          <>
            Contributed to the development of the company’s latest web-based platform by building
            and refining its core functionalities.
          </>,
          <>
            Designed and developed reusable front-end components, ensuring consistency and
            scalability across the application.
          </>,
          <>
            Collaborated with cross-functional teams to translate complex requirements into
            intuitive, user-focused solutions that enhanced platform performance and user
            experience.
          </>,
        ],
        images: [
          {
            src: '/images/dm20.webp',
            alt: 'DirectMail 2.0',
            width: 16,
            height: 9,
          },
        ],
        status: ['remote', 'freelance'],
        link: 'https://example.com/project2',
      },
      {
        company: 'KodingWorks',
        timeframe: 'Dec 2019 - Oct 2023',
        role: 'Front-End Engineer',
        achievements: [
          <>
            Developed a variety of innovative web applications, including blockchain-based payment
            gateway dashboards, merchant management platforms (e.g., Warung.io), spa order
            management systems, and educational learning management systems.
          </>,
          <>
            Built cutting-edge applications such as carbon footprint calculators, hotel booking
            platforms, coworking space management applications, and e-commerce platforms.
          </>,
          <>
            Utilized advanced front-end technologies like JavaScript, ReactJS, NextJS, and
            TypeScript to deliver user-centric solutions in collaboration with cross-functional
            teams.
          </>,
          <>
            Created impactful landing pages and dashboards, demonstrating strong expertise in
            front-end development and UI/UX design.
          </>,
        ],
        images: [
          {
            src: '/images/kw.webp',
            alt: 'KodingWorks',
            width: 16,
            height: 9,
          },
        ],
        status: ['hybrid', 'full-time'],
        link: 'https://kodingworks.io/?ref=bhsk.dev',
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: 'Studies',
    institutions: [
      {
        name: 'Diponegoro University',
        description: <>Bachelor of Computer Science.</>,
      },
      {
        name: 'SMK Negeri 7 Semarang',
        description: <>Graduate of Network Informatics Systems and Applications.</>,
      },
      {
        name: 'Alibaba',
        description: <>Alibaba Cloud Certified Professional, Cloud Computing Certification.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: 'Technical skills',
    skills: [
      {
        title: 'Graphic Design',
        description: <>Crafting visual concepts and designs for digital and print media.</>,
        images: [
          // {
          //   src: "/images/projects/project-01/cover-02.jpg",
          //   alt: "Project image",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        title: 'Adobe Illustrator',
        description: <>Creating vector graphics, illustrations, and branding assets.</>,
        images: [],
      },
      {
        title: 'MATLAB',
        description: <>Developing simulations, data analysis, and algorithm prototyping.</>,
        images: [],
      },
      {
        title: 'Machine Learning',
        description: <>Building predictive models and data-driven solutions.</>,
        images: [],
      },
      {
        title: 'Deep Learning',
        description: <>Developing AI models using neural networks for complex tasks.</>,
        images: [],
      },
      {
        title: 'Recurrent Neural Networks (RNN)',
        description: <>Implementing sequential data models for time-series and NLP applications.</>,
        images: [],
      },
    ],
  },
};

const blog = {
  label: 'Blog',
  title: 'My thoughts about Design and Tech',
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: 'Work',
  title: 'My projects',
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: 'Gallery',
  title: 'My photo gallery',
  description: `A photo collection by ${person.name}`,
  // Images from https://pexels.com
  images: [
    {
      src: '/images/gallery/img-01.jpg',
      alt: 'image',
      orientation: 'vertical',
    },
    {
      src: '/images/gallery/img-02.jpg',
      alt: 'image',
      orientation: 'horizontal',
    },
    {
      src: '/images/gallery/img-03.jpg',
      alt: 'image',
      orientation: 'vertical',
    },
    {
      src: '/images/gallery/img-04.jpg',
      alt: 'image',
      orientation: 'horizontal',
    },
    {
      src: '/images/gallery/img-05.jpg',
      alt: 'image',
      orientation: 'horizontal',
    },
    {
      src: '/images/gallery/img-06.jpg',
      alt: 'image',
      orientation: 'vertical',
    },
    {
      src: '/images/gallery/img-07.jpg',
      alt: 'image',
      orientation: 'horizontal',
    },
    {
      src: '/images/gallery/img-08.jpg',
      alt: 'image',
      orientation: 'vertical',
    },
    {
      src: '/images/gallery/img-09.jpg',
      alt: 'image',
      orientation: 'horizontal',
    },
    {
      src: '/images/gallery/img-10.jpg',
      alt: 'image',
      orientation: 'horizontal',
    },
    {
      src: '/images/gallery/img-11.jpg',
      alt: 'image',
      orientation: 'vertical',
    },
    {
      src: '/images/gallery/img-12.jpg',
      alt: 'image',
      orientation: 'horizontal',
    },
    {
      src: '/images/gallery/img-13.jpg',
      alt: 'image',
      orientation: 'horizontal',
    },
    {
      src: '/images/gallery/img-14.jpg',
      alt: 'image',
      orientation: 'horizontal',
    },
  ],
};

export { person, contact, newsletter, home, about, blog, work, gallery };
