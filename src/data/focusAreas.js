// The five thematic areas SATHI-UP works in (as listed on sathiup.com).
// Icons are names from components/Icon.jsx. Images come from the project photo folders.
import imgWomen from '../assets/projects/erw/women-s-collective-meeting-in-the-village.jpg';
import imgEducation from '../assets/projects/scope/digital-school-innovative-learning-activity-by-a-partner-cso.jpg';
import imgHealth from '../assets/projects/smhm/school-awareness-session.jpg';
import imgLivelihood from '../assets/projects/mrc-banda/information-session-on-safe-migration.jpg';
import imgCso from '../assets/projects/mausam/od-training-of-cso-partners.jpg';

export const focusAreas = [
  {
    icon: 'women',
    image: imgWomen,
    imageAlt: 'Women of a Nari Sangh sitting in a circle at a village meeting',
    title: 'Women Empowerment & Local Governance',
    text: 'Nari Sangh women’s collectives, rights awareness and access to entitlements.',
  },
  {
    icon: 'book',
    image: imgEducation,
    imageAlt: 'Children and community members outside a digital school run by a partner CSO',
    title: 'Education & Child Development',
    text: 'School enrolment, Vidyasabha, digital learning and protection from child labour and child marriage.',
  },
  {
    icon: 'health',
    image: imgHealth,
    imageAlt: 'Menstrual health awareness session with adolescent girls in a school classroom',
    title: 'Health, Nutrition & WASH',
    text: 'Nutrition counselling, screening, health camps and menstrual health awareness.',
  },
  {
    icon: 'shield',
    image: imgLivelihood,
    imageAlt: 'Information session on safe migration with a Migrants Resilience Collaborative banner',
    title: 'Livelihoods & Climate Resilience',
    text: 'Safe migration, social protection and climate-resilient farming.',
  },
  {
    icon: 'building',
    image: imgCso,
    imageAlt: 'Partner CSO representatives at an organisational development training',
    title: 'Civil Society Strengthening',
    text: 'Organisational development and training for partner CSOs.',
  },
];
