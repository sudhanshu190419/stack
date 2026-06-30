export interface ServiceItem {
  id: number
  title: string
  shortTitle: string
  description: string
  technologies: string[]
  gradient: string
  glowColor: string
}

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: 'Web Development',
    shortTitle: 'Web',
    description:
      'We build high-performance web applications using modern frameworks and architectures. From Next.js platforms to real-time SaaS products, our engineering delivers speed, scalability, and exceptional user experiences.',
    technologies: ['Next.js', 'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'GraphQL'],
    gradient: 'from-orange-500 via-red-500 to-rose-500',
    glowColor: 'rgba(249,115,22,0.15)',
  },
  {
    id: 2,
    title: 'Mobile App Development',
    shortTitle: 'Mobile',
    description:
      'Native-feeling mobile experiences built with React Native and Flutter. We ship to iOS and Android simultaneously without sacrificing performance or platform-specific design language.',
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'App Write'],
    gradient: 'from-rose-500 via-purple-500 to-indigo-500',
    glowColor: 'rgba(244,63,94,0.15)',
  },
  {
    id: 3,
    title: 'UI / UX Design',
    shortTitle: 'Design',
    description:
      'Data-driven design that balances beauty with usability. We craft interfaces that guide users naturally, reduce friction, and create memorable brand experiences across every touchpoint.',
    technologies: ['Figma', 'Framer', 'After Effects', 'Prototyping', 'Design Systems', 'Usability'],
    gradient: 'from-purple-500 via-indigo-500 to-blue-500',
    glowColor: 'rgba(168,85,247,0.15)',
  },
  {
    id: 4,
    title: 'AI Solutions',
    shortTitle: 'AI',
    description:
      'Intelligent automation and AI-powered features that transform how businesses operate. From LLM integrations to custom ML models, we build AI that delivers real results.',
    technologies: ['OpenAI', 'LangChain', 'TensorFlow', 'Python', 'Vector DBs', 'RAG'],
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    glowColor: 'rgba(59,130,246,0.15)',
  },
  {
    id: 5,
    title: 'Cloud & DevOps',
    shortTitle: 'Cloud',
    description:
      'Enterprise-grade infrastructure that scales effortlessly. We architect cloud solutions with automated CI/CD pipelines, containerization, and observability built in from day one.',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Datadog'],
    gradient: 'from-teal-500 via-emerald-500 to-green-500',
    glowColor: 'rgba(20,184,166,0.15)',
  },
  {
    id: 6,
    title: 'Product Strategy',
    shortTitle: 'Strategy',
    description:
      'End-to-end product strategy that aligns business goals with technical execution. From discovery and roadmap planning to launch and iteration, we guide products to market fit.',
    technologies: ['Strategy', 'Analytics', 'Roadmapping', 'A/B Testing', 'Growth', 'KPIs'],
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    glowColor: 'rgba(245,158,11,0.15)',
  },
]
