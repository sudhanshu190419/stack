export interface ServiceItem {
  id: number
  number: string
  title: string
  href: string
  description: string
  annotation: string
  screenSrc: string
}

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    number: '01',
    title: 'Web Design',
    href: '/website-design',
    description: 'Custom layouts, visual identity, UX and conversion-focused interfaces.',
    annotation: 'Designs that make an impression',
    screenSrc: '/services/screen-webdesign.png',
  },
  {
    id: 2,
    number: '02',
    title: 'Web Development',
    href: '/web-development',
    description: 'Fast, responsive and production-ready websites.',
    annotation: 'Engineered for infinite scale',
    screenSrc: '/services/screen-webdev.png',
  },
  {
    id: 3,
    number: '03',
    title: 'E-commerce',
    href: '/ecommerce-development',
    description: 'Online stores designed to make browsing and buying effortless.',
    annotation: 'Thoughtfully designed commerce',
    screenSrc: '/services/screen-ecom.png',
  },
  {
    id: 4,
    number: '04',
    title: 'App Development',
    href: '/app-development',
    description: 'Turn your ideas into powerful mobile applications that make a real impact.',
    annotation: 'From concept to App Store',
    screenSrc: '/services/screen-appdev.png',
  },
]
