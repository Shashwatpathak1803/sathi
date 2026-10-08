// The five areas of work shown in the "Our Work" explorer. `cover` is a file inside src/assets/projects/.
// `pool` lists related photos that are spread over project cards that have no photo of their own.
import { assetUrl } from './images';
import { catalog } from './catalog';

const defs = [
  {
    key: 'women',
    pool: [
      'erw/hamlet-level-meeting-with-nari-sangh-women.jpg',
      'erw/purwa-level-nari-sangh-meeting-at-harirampur.jpg',
      'erw/nari-sangh-leaders-learning-about-women-s-rights-and-legal-protections.jpg',
      'erw/women-s-collective-meeting-in-the-village.jpg',
      'erw/nari-sangh-leader-engaging-with-government-officials.jpg',
    ],
    icon: 'women',
    title: 'Women Empowerment & Local Governance',
    blurb: 'Nari Sangh collectives that help women claim rights, entitlements and a voice in local governance.',
    cover: 'erw/hamlet-level-meeting-with-nari-sangh-women.jpg',
    hue: '#c2643f',
  },
  {
    key: 'education',
    pool: [
      'maitri/vidyasabha-at-primary-school-sagarpatti.jpg',
      'scope/digital-school-innovative-learning-activity-by-a-partner-cso.jpg',
      'maitri/vidyasabha-at-primary-school-pilai.jpg',
      'maitri/enrolment-related-school-visit.jpg',
      'maitri/vidyasabha-at-primary-school-adilpur.jpg',
    ],
    icon: 'book',
    title: 'Education & Child Development',
    blurb: 'Bridge centres, digital classrooms and learning support that keep children learning and in school.',
    cover: 'maitri/vidyasabha-at-primary-school-sagarpatti.jpg',
    hue: '#b8871d',
  },
  {
    key: 'health',
    pool: [
      'nutrition/nutritional-counselling-session.jpg',
      'nutrition/screening-of-children-in-the-community.jpg',
      'smhm/community-health-camp.jpg',
      'nutrition/home-visit-for-nutrition-follow-up.jpg',
      'smhm/awareness-session-in-school.jpg',
      'nutrition/participatory-learning-and-action-pla-meeting.jpg',
    ],
    icon: 'health',
    title: 'Health, Nutrition & WASH',
    blurb: 'Child health, nutrition, family planning, vaccination and hygiene work built on community engagement.',
    cover: 'nutrition/nutritional-counselling-session.jpg',
    hue: '#2c7a8c',
  },
  {
    key: 'livelihood',
    pool: [
      'scope/adolescent-girls-economic-empowerment-and-skill-development-programme.jpg',
      'mrc-banda/information-session-on-safe-migration.jpg',
      'mrc-banda/outreach-at-the-labour-chowk.jpg',
      'erw/community-monitoring-visit.jpg',
      'mrc-banda/information-session-on-social-security-schemes-at-vmkrc.jpg',
    ],
    icon: 'megaphone',
    title: 'Livelihoods & Climate Resilience',
    blurb: 'Work days, safe migration, community assets, plantation and climate action that strengthen rural livelihoods.',
    cover: 'scope/adolescent-girls-economic-empowerment-and-skill-development-programme.jpg',
    hue: '#5b7d2a',
  },
  {
    key: 'civil',
    pool: [
      'mausam/od-training-of-cso-partners.jpg',
      'mausam/od-baseline-at-disha-banda.jpg',
      'mausam/training-on-organisational-development-at-chachikpur.jpg',
      'scope/quarterly-planning-and-review-meeting.jpg',
      'scope/refresher-training-for-cso-heads-and-accountants-on-finance-management.jpg',
      'scope/two-day-refresher-training-for-cso-field-staff.jpg',
      'mausam/training-on-cib-for-the-field-team.jpg',
    ],
    icon: 'building',
    title: 'Civil Society Strengthening',
    blurb: 'Training, mentoring, fellowships and hub-based support that make grassroots organisations and leaders stronger.',
    cover: 'mausam/od-training-of-cso-partners.jpg',
    hue: '#2f6b4f',
  },
];

export const categories = defs.map((c) => {
  const items = catalog.filter((p) => p.category === c.key);
  return {
    ...c,
    coverSrc: assetUrl(c.cover),
    poolSrc: (c.pool || []).map(assetUrl).filter(Boolean),
    total: items.length,
    ongoing: items.filter((p) => p.status === 'ongoing').length,
  };
});

export const getCategory = (key) => categories.find((c) => c.key === key);
