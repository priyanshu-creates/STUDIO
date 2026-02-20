
import { CaseStudy, Testimonial, FAQItem } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'LUMINA REIMAGINED',
    category: 'AI VISUALS / 2024',
    image: 'https://picsum.photos/1200/800?grayscale&random=1',
    description: 'Transforming legacy branding into futuristic neural assets.'
  },
  {
    id: '2',
    title: 'NEON VELOCITY',
    category: 'MOTION DESIGN',
    image: 'https://picsum.photos/1200/800?grayscale&random=2',
    description: 'A cinematic high-speed campaign for electric supercars.'
  },
  {
    id: '3',
    title: 'AETHER APPAREL',
    category: 'LUXURY STORYTELLING',
    image: 'https://picsum.photos/1200/800?grayscale&random=3',
    description: 'Using Generative AI to craft bespoke digital fashion identities.'
  },
  {
    id: '4',
    title: 'ONYX INTERIOR',
    category: 'CGI ARCHITECTURE',
    image: 'https://picsum.photos/1200/800?grayscale&random=4',
    description: 'Visualizing luxury spaces through AI-enhanced rendering.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "Working with A2 Studios has completely transformed our online presence. From the very beginning, their team took the time to understand our brand, audience, and long-term goals.",
    author: "ELENA M.",
    role: "MARKETING DIRECTOR",
    company: "GREEN LEAF",
    image: "https://picsum.photos/800/800?random=11",
    featured: true
  },
  {
    id: '2',
    quote: "From the first call, we knew we were in good hands. A2 Studios delivered beyond expectations and with impressive speed.",
    author: "LUIS R.",
    role: "PRODUCT MANAGER",
    company: "HELIOTECH"
  },
  {
    id: '3',
    quote: "Professional, responsive, and genuinely passionate about what they do. We saw results within the first month.",
    author: "AMIRA T.",
    role: "CEO",
    company: "BLOOM CONCEPT"
  },
  {
    id: '4',
    quote: "A2 Studios brought our vision to life with precision and creativity. Their work truly speaks for itself.",
    author: "JAMES K.",
    role: "FOUNDER",
    company: "URBAN GEAR"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: '1',
    question: "What is your typical turnaround time?",
    answer: "Our standard sprint for AI-driven creative campaigns is 4-6 weeks, depending on complexity and the depth of custom neural training required."
  },
  {
    id: '2',
    question: "Do you offer custom design solutions?",
    answer: "Yes, every project is tailored. We build bespoke generative models and visual languages specifically for your brand identity."
  },
  {
    id: '3',
    question: "What industries do you specialize in?",
    answer: "We focus on premium lifestyle, luxury automotive, high-end fashion, and tech pioneers looking to redefine their visual storytelling."
  },
  {
    id: '4',
    question: "Can you handle both design and development?",
    answer: "Absolutely. We bridge the gap between high-end visual design and technical engineering, ensuring your digital products look and perform flawlessly."
  },
  {
    id: '5',
    question: "Do you provide post-launch support?",
    answer: "We offer ongoing strategic partnership packages to ensure your AI-generated assets continue to evolve with current trends and technology."
  }
];
