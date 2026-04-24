// ─────────────────────────────────────────────
//  CHANTER — Site Content · 2026 Edition
//  Edit everything here. Keep components clean.
// ─────────────────────────────────────────────

export const brand = {
  name:       'CHANTER',
  tagline:    'AI direction / worldbuilding / visual systems',
  supporting: 'Cinematic AI-driven visuals, systems, and experimental worlds.',
  year:       '2026',
}

export const nav = [
  { label: 'Systems', scene: 1 },
  { label: 'Work',    scene: 2 },
  { label: 'Contact', scene: 3 },
]

export const capabilities = [
  {
    index: '01',
    discipline: 'AI Direction',
    description:
      'Shaping AI systems into instruments of intention — directing outputs toward coherent visual worlds.',
  },
  {
    index: '02',
    discipline: 'World Building',
    description:
      'Constructing imagined realities with internal logic. Mythology, atmosphere, geography, time.',
  },
  {
    index: '03',
    discipline: 'Visual Systems',
    description:
      'Designing the rules that govern how a world looks — not one image, but a living language.',
  },
  {
    index: '04',
    discipline: 'Experimental Film',
    description:
      'Sequences that exist between cinema and computation. Time-based works that resist genre.',
  },
  {
    index: '05',
    discipline: 'Generative Design',
    description:
      'Systematic aesthetics driven by logic, randomness, and controlled entropy.',
  },
]

export const works = [
  {
    id:          '001',
    title:       'Meridian',
    category:    'Visual System',
    year:        '2026',
    description: 'A planetary atlas built entirely through directed diffusion.',
    imageSrc:    null,
    gradient: 'linear-gradient(148deg, #06090f 0%, #0d1829 40%, #0a1520 70%, #040811 100%)',
  },
  {
    id:          '002',
    title:       'Lacuna',
    category:    'Experimental Film',
    year:        '2026',
    description: 'A 12-minute sequence depicting the archaeology of a forgetting.',
    imageSrc:    null,
    gradient: 'linear-gradient(148deg, #08090e 0%, #141b2a 45%, #0c1320 75%, #05060c 100%)',
  },
  {
    id:          '003',
    title:       'Stratum',
    category:    'Generative Design',
    year:        '2025',
    description: 'Geological time rendered as modular design infrastructure.',
    imageSrc:    null,
    gradient: 'linear-gradient(148deg, #0a0c0f 0%, #161c26 45%, #0d1018 75%, #060709 100%)',
  },
  {
    id:          '004',
    title:       'Veil Protocol',
    category:    'AI Direction',
    year:        '2025',
    description: 'A collaborative system for high-volume cinematic world generation.',
    imageSrc:    null,
    gradient: 'linear-gradient(148deg, #08080f 0%, #12112a 45%, #0d0c20 75%, #050508 100%)',
  },
]

export const contact = {
  headline: 'Begin a world.',
  subtext:
    'Available for select commissions, collaborations, and long-form projects.',
  email: 'cchanter1@gmail.com',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/davidchristos_/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@__chanter' },
  ],
  footnote: `© ${new Date().getFullYear()} CHANTER. All rights reserved.`,
}