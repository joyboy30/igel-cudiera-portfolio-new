/**
 * Client testimonials, shown on the Testimonials page and the Home card.
 *
 * Each quote is the client's own words, kept exactly as supplied. Names are
 * shown as given - no job title, company, date, rating or photo is added that
 * the client did not provide.
 */

export type Testimonial = { index: string; name: string; quote: string }

export const TESTIMONIALS: Testimonial[] = [
  {
    index: '01',
    name: 'Mendy Perlman',
    quote: 'I just looked at the Holistic Midwifery site, and the design updates look great super clean!',
  },
  {
    index: '02',
    name: 'Ivy Abenilla',
    quote: 'Thank you Igel. Your efforts mean a lot to my business and have helped me in getting more sales',
  },
  {
    index: '03',
    name: 'Saad Jamil',
    quote: 'Thank you for the effort Igel. I’m happy with the results.',
  },
]
