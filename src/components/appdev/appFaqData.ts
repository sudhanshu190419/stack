export interface AppFaqItem {
  question: string
  answer: string
}

export const APP_FAQ_DATA: AppFaqItem[] = [
  {
    question: 'Should we build a native iOS/Android app or use a cross-platform framework?',
    answer:
      'For the vast majority of commercial business applications, modern cross-platform engineering with React Native and Expo is the optimal choice. It allows us to build a single, type-safe codebase that compiles to native iOS and Android components with 60fps performance. This cuts initial development and ongoing maintenance costs in half without compromising on user experience. If your project specifically demands specialized low-level hardware drivers or 3D gaming engines, pure native Swift and Kotlin can be evaluated.',
  },
  {
    question: 'How long does it take to develop and launch a mobile app?',
    answer:
      'A focused Minimum Viable Product (MVP) or straightforward business mobile app typically takes between 8 to 14 weeks from initial architecture through to App Store and Google Play approval. More complex platforms with custom backend databases, extensive third-party integrations, and multi-tier user permissions generally require 14 to 20 weeks. We provide a milestone-driven schedule with weekly progress builds delivered directly to your test devices.',
  },
  {
    question: 'How do you handle the Apple App Store and Google Play Store approval process?',
    answer:
      'We manage the entire submission lifecycle from start to finish. This includes provisioning developer certificates, setting up App Store Connect and Google Play Console assets, configuring privacy manifests, drafting store listings and screenshots, and submitting production binaries for review. If Apple or Google reviewers request technical clarifications, our engineering team handles compliance updates directly until approval is secured.',
  },
  {
    question: 'Can the mobile app connect to our existing website or database?',
    answer:
      'Yes. Connecting mobile apps to existing cloud backends, databases (PostgreSQL, MySQL, MongoDB), and REST or GraphQL APIs is standard practice for us. If your website already runs on a modern platform or CMS, we can build custom API endpoints so product inventories, customer accounts, orders, and content synchronize seamlessly between your web and mobile ecosystems.',
  },
  {
    question: 'Can the app work offline and send push notifications?',
    answer:
      'Yes. We configure robust push notification services (such as Firebase Cloud Messaging and Apple APNs) for targeted campaigns, transactional updates, and deep links. For offline resilience, we implement local on-device caching so users can view data and queue actions even when network connectivity drops, syncing automatically once reconnected.',
  },
  {
    question: 'What happens when Apple or Google release new iOS and Android updates?',
    answer:
      'Both Apple and Google release major operating system updates annually, alongside periodic SDK updates and store compliance policies. We provide proactive maintenance arrangements to test your application against developer beta builds, upgrade core dependencies, and ensure your app continues to function flawlessly without deprecation warnings.',
  },
  {
    question: 'What ongoing costs are required to maintain a mobile app?',
    answer:
      'Beyond initial development, mobile apps have predictable baseline operational costs: Apple Developer Program membership ($99/year), Google Play Console registration ($25 one-time), cloud backend and database hosting (typically $20–$150/month depending on traffic), and ongoing maintenance/SLA support for OS compatibility and security patches.',
  },
  {
    question: 'Who owns the source code and app store accounts?',
    answer:
      'You own 100% of the intellectual property, source code, design assets, and database architecture. All production apps are published directly under your company’s Apple and Google developer accounts so that you retain full commercial ownership, customer relationships, and platform control.',
  },
]
