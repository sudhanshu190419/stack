export interface FaqItem {
  question: string
  answer: string
}

export const WEBDESIGN_FAQ_DATA: FaqItem[] = [
  {
    question: 'What is the difference between website design and website development?',
    answer:
      'Website design focuses on the visual identity, user experience (UX), layout structure, typography, and interactive prototypes of how a website looks and feels. Website development is the technical engineering phase that turns those approved Figma designs into functional, accessible, and high-performance code (such as Next.js, HTML, and CSS) that runs in a browser and connects to content management systems.',
  },
  {
    question: 'How long does website design take?',
    answer:
      'A typical website design engagement spans 3 to 6 weeks, depending on catalog scope and UX complexity. A targeted marketing site or landing page often takes 2 to 3 weeks, while a comprehensive multi-page corporate site with custom design systems, responsive wireframes, and interactive prototypes takes 4 to 6 weeks before entering development.',
  },
  {
    question: 'Do you design mobile versions too?',
    answer:
      'Yes, every single page we design is meticulously crafted across desktop (1440px), tablet (768px), and mobile (375px) breakpoints. We take a mobile-first approach to typography scaling, touch target sizing, image reflow, and simplified thumb-friendly navigation so the smartphone experience feels just as polished as desktop.',
  },
  {
    question: 'Can you redesign my existing website?',
    answer:
      'Yes. Website redesign is one of our core services. We begin with an audit of your current site’s analytics, user pain points, and conversion drop-offs, then modernize your visual identity, re-architect content hierarchy, and improve mobile responsiveness without unnecessarily throwing away what already works.',
  },
  {
    question: 'Do you provide UX research?',
    answer:
      'Yes. Our UX process includes customer journey mapping, competitor visual benchmarking, information architecture modeling, and user persona analysis. For existing sites, we review heatmaps, analytics funnels, and user friction points to make evidence-based layout decisions.',
  },
  {
    question: 'Can you work with my existing brand identity?',
    answer:
      'Absolutely. If you already have established brand guidelines (logos, color palettes, fonts, and photography standards), we will translate them into a coherent digital design system. If your brand guidelines are minimal or outdated, we can refine and expand them for modern digital screens.',
  },
  {
    question: 'Do you create the website content?',
    answer:
      'We guide your content architecture, headline messaging, page hierarchy, and call-to-action strategy. Clients typically provide their core business specifics, product details, and team media, which we edit and structure for scannability and conversion. We can also provide strategic copywriting assistance upon request.',
  },
  {
    question: 'Can you design a website before development begins?',
    answer:
      'Yes. In fact, our recommended workflow completes all wireframing, high-fidelity visual design, responsive layouts, and prototype sign-offs before writing a single line of code. This eliminates costly guesswork during development and guarantees that all stakeholders are aligned on the end result.',
  },
  {
    question: 'How many design revisions are included?',
    answer:
      'Our standard design scopes include 2 to 3 structured revision rounds per project phase (wireframes, visual mockups, and prototypes). Because we share iterative progress and align on information architecture early, revisions are focused on refining details rather than starting over.',
  },
  {
    question: 'Can you also develop the website after designing it?',
    answer:
      'Yes. Stack is a full-service digital agency offering seamless end-to-end delivery. Once designs are approved, our in-house engineering team builds the website using clean, production-grade Next.js, React, and Tailwind CSS, ensuring 100% pixel fidelity to the approved Figma files with zero handoff miscommunication.',
  },
]
