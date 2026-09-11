export interface FaqItem {
  question: string
  answer: string
}

export const FAQ_DATA: FaqItem[] = [
  {
    question: 'How long does website development take?',
    answer:
      'Most custom business websites take between 4 to 8 weeks from initial discovery to live deployment. The timeline depends primarily on the number of pages, custom interactive features, CMS requirements, and how quickly brand assets and feedback are provided. We establish a clear, week-by-week delivery schedule before starting, so you always know what to expect.',
  },
  {
    question: 'Do you design the website as well as develop it?',
    answer:
      'Yes. We provide complete end-to-end service, handling everything from initial wireframing, UI/UX design, and Figma prototypes through to full frontend and backend engineering. If your business already has established brand guidelines or completed Figma designs, we can also step in purely as your development partner.',
  },
  {
    question: 'Will the website work on mobile and tablet?',
    answer:
      'Every website we engineer is built mobile-first and tested rigorously across iOS, Android, tablets, laptops, and ultra-wide desktop monitors. We optimize touch interactions, typography scaling, image compression, and navigation so your visitors get an effortless experience regardless of device.',
  },
  {
    question: 'Can you redesign my existing website?',
    answer:
      'Yes. Website redesigns and rebuilds make up a large portion of our work. When redesigning an existing site, we audit your current analytics, preserve established SEO rankings with careful 301 redirect mapping, and modernize your visual design and codebase to dramatically improve conversion rates and speed.',
  },
  {
    question: 'Can you integrate forms, analytics and third-party tools?',
    answer:
      'Absolutely. We routinely integrate CRMs (HubSpot, Salesforce), booking software (Calendly, OpenTable), payment processors (Stripe, Lemon Squeezy), analytics platforms (Google Analytics 4, Plausible, PostHog), and custom API endpoints. All forms are engineered with spam protection, accessible validation, and reliable submission tracking.',
  },
  {
    question: 'Will the website be SEO-friendly?',
    answer:
      'Yes. Search engine optimization is built into our foundational engineering. We implement semantic HTML5 hierarchies, server-side rendering with Next.js, automated XML sitemaps, OpenGraph metadata, JSON-LD structured schema markup, fast Core Web Vitals, and clean canonical URL structures that search engines prioritize.',
  },
  {
    question: 'Can I update the website myself after launch?',
    answer:
      'Yes. We configure intuitive, modern Content Management Systems (such as Sanity, Contentful, or headless WordPress) tailored to your workflow. You and your team will be able to edit page copy, upload imagery, publish blog posts, and add case studies without touching a single line of code. We also provide full onboarding walk-throughs and video guides upon delivery.',
  },
  {
    question: 'What happens after the website launches?',
    answer:
      'Following launch, we provide a 30-day post-launch warranty period during which we monitor performance, address any unforeseen bugs, and ensure analytics and indexing are firing smoothly. Afterwards, we offer flexible ongoing maintenance, security updates, and performance monitoring arrangements to support your business as it grows.',
  },
]
