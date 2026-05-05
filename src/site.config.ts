/**
 * Site-wide configuration.
 *
 * Edit `currentTerm` at the start of each new term. The homepage filters
 * Industries to this value; everything else is automatically considered
 * "past." Posts and pages from prior terms remain live indefinitely at
 * the same URLs.
 */
export const site = {
  name: 'ClayCo',
  tagline: 'Empowering Student Industries',
  description:
    'A directory of student-run businesses publishing under the ClayCo umbrella. A COMM 130 project at Lane Community College.',
  url: 'https://clayco.work',
  email: 'williamsc@lanecc.edu',

  /**
   * The currently active term. When this changes (e.g. to "Fall 2026"),
   * Spring 2026 industries automatically become "Past" and stop appearing
   * on the homepage. Their pages and posts remain live.
   */
  currentTerm: 'Spring 2026',

  /**
   * Toggle Past Industries surfaces on the public site.
   * Hidden until we have at least one past term to show.
   */
  showPastIndustries: false,

  institution: 'Lane Community College',
  course: 'COMM 130 — Business and Professional Communication',
} as const;
