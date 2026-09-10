export interface ServiceItem {
  id: number
  number: string
  title: string
  description: string
  annotation: string
  screenSrc: string
}

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    number: '01',
    title: 'Web Design',
    description: 'Custom layouts, visual identity, UX and conversion-focused interfaces.',
    annotation: 'Designs that make an impression',
    screenSrc: '/services/screen-1.png',
  },
  {
    id: 2,
    number: '02',
    title: 'Web Development',
    description: 'Fast, responsive and production-ready websites.',
    annotation: 'Engineered for infinite scale',
    screenSrc: '/services/screen-webdev.png',
  },
  {
    id: 3,
    number: '03',
    title: 'E-commerce',
    description: 'Online stores designed to make browsing and buying effortless.',
    annotation: 'Thoughtfully designed commerce',
    screenSrc: '/services/screen-3.png',
  },
  {
    id: 4,
    number: '04',
    title: 'Website Redesign',
    description: 'Turn an outdated website into a modern digital experience.',
    annotation: 'Transforming digital architecture',
    screenSrc: '/services/screen-4.png',
  },
]
