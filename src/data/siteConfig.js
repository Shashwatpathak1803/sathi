/**
 * =====================================================================
 *  SITE CONFIGURATION — EDIT THIS FILE FIRST
 * =====================================================================
 *  Details below were taken from the organisation's existing website
 *  (sathiup.com). Please check them before going live.
 *  Anything marked [PLACEHOLDER] still needs to be filled in.
 * =====================================================================
 */

export const siteConfig = {
  // ---- Identity -----------------------------------------------------
  name: 'SATHI-UP',
  fullName: 'Supporting Association for Thematic and Holistic Initiative',
  tagline: 'Supporting communities with education, healthcare and opportunity. Building a future where no one is left behind.',
  // Put your logo file in /public (e.g. /public/logo.png) and set the path here.
  // Leave as null to show the text-only name in the header.
  logo: '/logo.png',
  logoLight: '/logo-white.png', // used when the navbar is transparent over the hero photo
  foundedYear: '1992',
  registration: 'Registered in July 2004 under the Societies Registration Act, 1860',
  workingArea: 'Uttar Pradesh, India',

  // ---- Reach (shown in the "Rooted Across Uttar Pradesh" block on the home page) ----
  stats: {
    title: 'Rooted Across Uttar Pradesh',
    text: 'For decades, SATHI-UP has worked alongside communities to create sustainable, locally-driven change.',
    items: [
      { value: '40+', label: 'Districts Across Uttar Pradesh' },
      { value: '25L+', label: 'Individuals Reached' },
      { value: '310K+', label: 'Families Directly Served' },
      { value: '30+', label: 'Institutional Projects Delivered' },
    ],
  },

  // ---- Contact ------------------------------------------------------
  contact: {
    registeredOffice: 'Post: Dhirendrapuri, Chachikpur, Via Goshainganj, District Ambedkar Nagar – 224141, Uttar Pradesh, India',
    coordinationOffice: '4044/3 Parikrama Marg, Civil Lines, District Ayodhya – 224001, Uttar Pradesh',
    email: 'sathiup@gmail.com',
    phone: '+91-9565181920',
    // Google Maps: embed URL (shown in an iframe) and the public link (opens in Google Maps).
    mapEmbedUrl: 'https://www.google.com/maps?q=26.76845,82.1240793&z=15&output=embed',
    mapLink: 'https://www.google.com/maps/place/SATHI-UP/@26.76845,82.124079,10z/data=!4m6!3m5!1s0x399a05ff345ba10b:0x3e24bb0534a89091!8m2!3d26.76845!4d82.1240793!16s%2Fg%2F11c6png790',
  },

  // ---- Support / donation (used ONLY in the "Support Our Work" section) ----
  donation: {
    // Optional online payment link. Leave null to show bank details only.
    url: null, // [PLACEHOLDER] e.g. 'https://pages.razorpay.com/...'
    bank: {
      accountName: 'SATHI UP',
      accountNumber: '22260100010155',
      bankName: 'Bank of Baroda',
      branch: 'Fatehganj Road, Faizabad',
      ifsc: 'BARB0FATFAI', // fifth character is zero
      note: 'Cheque donations are also accepted.',
    },
  },

  // ---- Social media (set a value to null to hide that link) ---------
  social: {
    facebook: 'https://www.facebook.com/SATHIUP',
    instagram: 'https://www.instagram.com/sathi.up/',
    youtube: 'https://youtube.com/@sathi-up942',
    linkedin: 'https://www.linkedin.com/in/sathi-up-221a364a/',
  },
};
