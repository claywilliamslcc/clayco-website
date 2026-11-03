/**
 * Site-wide configuration.
 *
 * Edit `currentTerm` at the start of each new term. The homepage shows only
 * the current term's industries and posts; every earlier term moves to
 * Past Industries (/industries). Posts and pages from prior terms remain
 * live indefinitely at the same URLs.
 *
 * Full rollover checklist: README.md, "Term lifecycle".
 */
export const site = {
  name: 'ClayCo',
  tagline: 'Empowering Student Industries',
  description:
    'A directory of student-run businesses publishing under the ClayCo umbrella. A COMM 130 project at Lane Community College.',
  url: 'https://clayco.work',
  email: 'williamsc@lanecc.edu',

  /**
   * The currently active term. Must match the `term` value on this term's
   * businesses and the `term` default in public/admin/config.yml.
   */
  currentTerm: 'Fall 2026',

  /**
   * Show Past Industries surfaces on the public site: the archive section
   * of /industries and the Past Industries list on the homepage.
   */
  showPastIndustries: true,

  /**
   * The current term's trade show, shown on /showcase. Update each term.
   * Once the event poster exists, set `poster`, e.g.
   *   { image: '/showcase/comm130-showcase-f26.jpg', pdf: '/showcase/comm130-showcase-f26.pdf',
   *     alt: 'COMM 130 Showcase, December 8, ...', width: 2592, height: 3456 }
   */
  showcase: {
    date: 'Tuesday, December 8, 2026',
    time: '1:00 – 3:00 PM',
    place: 'Center Building, Room 453',
    poster: null as null | { image: string; pdf: string; alt: string; width: number; height: number },
  },

  /**
   * Extras for past terms on the Past Industries archive. Add a term here
   * when it ends if its showcase poster should stay linked.
   */
  pastTerms: {
    'Spring 2026': { showcasePoster: '/showcase/comm130-showcase-sp26.pdf' },
  } as Record<string, { showcasePoster?: string }>,

  institution: 'Lane Community College',
  courseCode: 'COMM 130',
  course: 'COMM 130: Business and Professional Communication',
} as const;
