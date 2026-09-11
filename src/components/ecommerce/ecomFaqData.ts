export interface EcomFaqItem {
  question: string
  answer: string
}

export const ECOM_FAQ_DATA: EcomFaqItem[] = [
  {
    question: 'How much does an e-commerce website cost?',
    answer:
      'E-commerce development costs depend on catalog size, platform choice (Shopify vs. custom headless), design customization, and third-party integrations (ERP, CRM, custom shipping calculators). A streamlined, highly customized Shopify store for an emerging brand requires a very different scope than an enterprise multi-currency catalog with thousands of SKUs and bespoke checkout workflows. We provide transparent, itemized fixed-fee proposals following a discovery call so you have complete cost certainty.',
  },
  {
    question: 'How long does it take to build an online store?',
    answer:
      'Most online stores take between 6 to 12 weeks from initial concept to public launch. This includes store architecture, bespoke UI/UX design, theme and checkout development, product catalog migration, payment and tax configuration, and end-to-end checkout testing. More complex headless builds or stores requiring custom ERP synchronization typically take 12 to 16 weeks.',
  },
  {
    question: 'Which e-commerce platform should I use?',
    answer:
      'The ideal platform depends on your operational priorities. For brands seeking fast time-to-market, reliable hosted infrastructure, and minimal server management, Shopify is typically the best solution. For teams requiring deep integration into an existing WordPress content ecosystem, WooCommerce is viable. For brands demanding sub-second page transitions, complete visual freedom, and bespoke checkout logic, a custom Next.js storefront or headless commerce setup is ideal. We evaluate your product volume, team workflows, and budget before recommending a platform.',
  },
  {
    question: 'Can you redesign my existing online store?',
    answer:
      'Yes. Store redesigns are one of our core specialties. When redesigning an active store, our primary focus is improving conversion rates, smoothing out mobile checkout friction, and upgrading visual storytelling without disrupting your live revenue. We carefully map existing product URLs and category paths with 301 redirects to ensure you maintain your hard-earned search rankings.',
  },
  {
    question: 'Can you migrate an existing store?',
    answer:
      'Yes. We routinely handle store migrations between platforms (e.g., Magento or WooCommerce to Shopify, or monolithic platforms to headless Next.js). We migrate customer accounts, historical order records, product variants, inventory quantities, and reviews, while executing thorough redirect mapping to preserve organic search traffic.',
  },
  {
    question: 'Can you integrate payments and shipping?',
    answer:
      'Absolutely. We configure global and regional payment gateways—including Shopify Payments, Stripe, Apple Pay, Google Pay, PayPal, and Klarna/Afterpay installment plans. We also integrate real-time carrier shipping rates (FedEx, UPS, DHL, regional couriers), automated tax calculation rules, and label printing fulfillment systems.',
  },
  {
    question: 'Will the store work on mobile?',
    answer:
      'Over 70% of modern e-commerce traffic originates on smartphones. Every online store we build is designed mobile-first with thumb-friendly tap targets, sticky add-to-cart buttons, accelerated product image galleries, and express one-tap checkout (Apple Pay and Google Pay) to minimize abandoned carts on smaller screens.',
  },
  {
    question: 'Can I manage products myself after launch?',
    answer:
      'Yes. We provide complete administrative independence. You and your operations team will be able to add new products, update pricing, create discount codes, manage inventory levels, and process refunds through an intuitive visual dashboard without writing code. We provide hands-on training sessions and documented video guides upon project handoff.',
  },
  {
    question: 'Can you help with SEO?',
    answer:
      'Yes. Technical and on-page e-commerce SEO is built directly into our development process. We implement structured product schema markup (enabling Google rich snippets for price, availability, and star ratings), optimized category URL hierarchies, automatic XML sitemaps, fast Core Web Vitals performance, and canonical tag structures that prevent duplicate content issues from product variants.',
  },
  {
    question: 'Do you provide maintenance after launch?',
    answer:
      'Following launch, we provide a 30-day post-launch warranty to monitor live transactions, address any edge-case browser bugs, and ensure tracking pixels fire accurately. Afterwards, we offer flexible ongoing retainer arrangements covering speed monitoring, promotional campaign landing pages, third-party app updates, and conversion rate optimization audits.',
  },
]
