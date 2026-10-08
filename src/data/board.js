/**
 * Board & Advisory of SATHI-UP, from https://sathiup.com/our-board-advisory/.
 * Photos live in /public/board/. Add or reorder people here.
 */
const person = (name, role, file, bio) => ({ name, role, photo: `/board/${file}`, bio });

export const boardGroups = [
  {
    id: 'office-bearers',
    title: 'Office Bearers',
    people: [
      person(
        'Mr. Shashi Bhusan',
        'Chief Functionary',
        'shashi-bhusan.jpg',
        'Shree Shashi Bhushan is a Gandhian activist and grassroots development leader with over 30 years of experience in rural health, women’s empowerment, and strengthening 465+ CSOs across Uttar Pradesh.'
      ),
      person(
        'Ms. Savita Suman',
        'Vice President',
        'savita-suman.jpg',
        'A social development leader since 1989, she heads Gramin Vikas Prayas Samiti and has been honored by the National Foundation and the Government of Uttar Pradesh.'
      ),
      person(
        'Mr. Girijesh Kumar Pandey',
        'Secretary',
        'girijesh-kumar-pandey.jpg',
        'A Gandhian rural development leader inspired by the 1974 Sampurna Kranti Andolan, he founded Vikas Bharti to advance Gram Swaraj and currently serves as Secretary of SATHI-UP.'
      ),
      person(
        'Mr. Rajdev Chaturvedi',
        'Treasurer',
        'rajdev-chaturvedi.jpg',
        'With over 25 years of experience, he works on health, nutrition, women’s empowerment, and education, bringing strong grassroots expertise with international exposure.'
      ),
    ],
  },
  {
    id: 'advisors',
    title: 'Advisors',
    people: [
      person(
        'Ms. Rukmini Datta',
        'Advisor',
        'rukmini-datta.jpg',
        'Ms. Rukmini Datta is an independent consultant with 25+ years of experience in social change, sustainability, CSR, and philanthropy, supporting grassroots organizations in strategic growth and capacity building.'
      ),
      person(
        'Ms. Shipra Deo',
        'Advisor',
        'shipra-deo.jpg',
        'Ms. Shipra Deo, Global Gender and Land Advisor at Landesa, brings 20+ years of experience in advancing gender equality through innovative programs, strategic partnerships, and systemic social inclusion initiatives.'
      ),
    ],
  },
  {
    id: 'board-members',
    title: 'Board Members',
    people: [
      person(
        'Mr. Daya Shankar Singh',
        'Board Member',
        'daya-shankar-singh.jpg',
        'A development sector expert with experience across health, women’s empowerment, livelihoods, disaster management, and education, he is known for strengthening teams through mentoring and training.'
      ),
      person(
        'Mr. Giridharilal Tripathi',
        'Board Member',
        'giridharilal-tripathi.jpg',
        'Passionate about social work since 1980, he specializes in environmental issues and is the co-founder of Rashtriya Asahaya Sewashram Parishad.'
      ),
      person(
        'Mohd Nasim Ansari',
        'Board Member',
        'mohd-nasim-ansari.jpg',
        'An accomplished social worker known for impactful work in health, education, and livelihood initiatives across multiple levels.'
      ),
      person(
        'Pathani Bahera',
        'Board Member',
        'pathani-bahera.jpg',
        'With 27 years of experience in accounts and finance, he serves as Senior Account Manager at PANI Sansthan, specializing in project finance and compliance management.'
      ),
      person(
        'Ms. Ranjana Singh',
        'Board Member',
        'ranjana-singh.jpg',
        'An entrepreneur and social development advocate, she works closely on grassroots initiatives and women’s empowerment through various awareness campaigns.'
      ),
      person(
        'Mr. Shameem Abbasi',
        'Board Member',
        'shameem-abbasi.jpg',
        'With a background in social work and economics, he is passionate about community mobilization and leadership development through Gramin Vikas Sansthan.'
      ),
      person(
        'Mrs. Shalini Singh',
        'Board Member',
        'shalini-singh.jpg',
        'Mrs. Shalini Singh is a dedicated social development professional and valued board member of SATHI, known for her commitment to community development and positive social change.'
      ),
      person(
        'Mr. Jagdish Giri',
        'Board Member',
        'jagdish-giri.jpg',
        'Mr. Jagdish Giri, Lead-Programs at PANI, brings 24+ years of experience in women and adolescent empowerment, community healthcare, and livelihood development across underserved regions of India.'
      ),
      person(
        'Mr. Mirajul Islam',
        'Board Member',
        'mirajul-islam.jpg',
        'Mirajul Islam is a social work professional with an MSW from Visva-Bharati University and over a decade of experience in community development, women’s empowerment, child rights, and organizational development.'
      ),
    ],
  },
];

// Staff team, from https://sathiup.com/our-team/ — shown under the board on the same page.
const team = (name, role, file, bio) => ({ name, role, photo: `/team/${file}`, bio });

export const teamGroup = {
  id: 'team',
  title: 'Our Team',
  intro: 'The dedicated people working every day to create sustainable change, empower communities and support those who need it most.',
  people: [
    team('Lalit Singh', 'Director', 'lalit-singh.jpg', 'Leads grassroots development and community-driven initiatives.'),
    team('Anand Vijay', 'Manager – Finance', 'anand-vijay.jpg', 'Manages financial planning and administrative systems.'),
    team('Pradeep Kumar Singh', 'Senior Program Leader', 'pradeep-kumar-singh.jpg', 'Strengthens local governance and community mobilization efforts.'),
    team('Ram Prakash Singh', 'Training Coordinator', 'ram-prakash-singh.jpg', 'Leads training and capacity-building initiatives in public health.'),
    team('Vandana Gupta', 'Program Coordinator', 'vandana-gupta.jpg', 'Promotes women’s empowerment and grassroots leadership.'),
    team('Ranjan Srivastava', 'Program Manager', 'ranjan-srivastava.jpg', 'Leads public health and community development initiatives.'),
    team('Arti Yadav', 'Program Manager', 'arti-yadav.jpg', 'Leads health, nutrition, and community outreach programs.'),
    team('Dr. Sanjay Pandey', 'Program Manager', 'sanjay-pandey.jpg', 'Drives health and nutrition program implementation.'),
    team('Priya Tiwari', 'Program Manager', 'priya-tiwari.jpg', 'Supports civil society strengthening and partner coordination.'),
    team('Ajeet Kumar', 'Accounts Manager', 'ajeet-kumar.jpg', 'Oversees finance, compliance, and financial operations.'),
  ],
};

export const boardIntro =
  'SATHI-UP is guided by experienced grassroots leaders, development practitioners, and advisors who bring expertise across community health, women’s empowerment, education, livelihoods, governance, and institutional development.';
