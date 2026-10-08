/**
 * Legal documents of SATHI-UP, taken from https://sathiup.com/legal-documents/.
 * Files are stored in /public/legal-documents/ so they keep working independently of the old site.
 *
 *  - `file`: file name inside /public/legal-documents/ (omit if there is no file yet)
 *  - `details`: key/value facts shown on the card
 *  - `pending: true`: shows "copy being updated" instead of a download button
 */
export const legalHighlights = [
  { label: 'FCRA Registration No.', value: '136780014', note: 'Valid until 31 December 2026' },
  { label: 'Registered under', value: 'Societies Registration Act, 1860', note: 'Registered in July 2004' },
  { label: 'Tax exemptions', value: '12A & 80G', note: 'Certificates available below' },
  { label: 'Government portal', value: 'NGO Darpan', note: 'Registered on NITI Aayog’s NGO Darpan' },
];

export const legalGroups = [
  {
    id: 'registration',
    title: 'Registration & Identity',
    intro: 'Documents that establish who we are as a registered organisation.',
    icon: 'building',
    docs: [
      {
        title: 'Registration Certificate',
        text: 'Society registration (renewal) certificate of SATHI-UP.',
        pending: true,
      },
      { title: 'CSR Certificate', text: 'CSR-1 registration with the Ministry of Corporate Affairs, enabling CSR funding.', file: 'csr-certificate.pdf', size: '74 KB' },
      { title: 'PAN', text: 'Permanent Account Number of the organisation.', file: 'pan.jpg', size: '249 KB', type: 'Image' },
      { title: 'TAN', text: 'Tax Deduction and Collection Account Number.', file: 'tan.pdf', size: '5.1 MB' },
      { title: 'Bylaws', text: 'The rules and bylaws governing SATHI-UP.', file: 'bylaws.pdf', size: '1.6 MB' },
    ],
  },
  {
    id: 'compliance',
    title: 'Government & Compliance',
    intro: 'Registrations and approvals that keep us compliant and eligible to receive support.',
    icon: 'shield',
    docs: [
      { title: 'NGO Darpan', text: 'Unique ID and profile on the NGO Darpan portal of NITI Aayog.', file: 'ngo-darpan.png', size: '430 KB', type: 'Image' },
      { title: 'Supporting Registration Letter', text: 'Supporting letter for the organisation’s registration.', file: 'supporting-registration-letter.pdf', size: '237 KB' },
      { title: '12A Certificate', text: 'Registration under Section 12A of the Income Tax Act for tax exemption.', file: '12a-certificate.pdf', size: '192 KB' },
      {
        title: 'FCRA Certificate',
        text: 'Registration under the Foreign Contribution (Regulation) Act.',
        details: [
          ['Registration No.', '136780014'],
          ['Valid until', '31 December 2026'],
        ],
      },
      { title: '80G Certificate', text: 'Approval under Section 80G, under which donors may claim tax deduction.', file: '80g-certificate.pdf', size: '190 KB' },
    ],
  },
  {
    id: 'audit',
    title: 'Audit Reports',
    intro: 'Independently audited financial statements.',
    icon: 'book',
    docs: [
      { title: 'Audit Report 2025-26', text: 'Audited financial statements for the financial year 2025-26.', file: 'audit-report-2025-26.pdf', size: '2.7 MB', year: '2025-26' },
      { title: 'Audit Report 2024-25', text: 'Consolidated audit statement for the financial year 2024-25.', file: 'audit-report-2024-25.pdf', size: '5.7 MB', year: '2024-25' },
      { title: 'Audit Report 2023-24', text: 'Audited financial statements for the financial year 2023-24.', file: 'audit-report-2023-24.pdf', size: '1.7 MB', year: '2023-24' },
      { title: 'Audit Report 2022-23', text: 'Audited financial statements for the financial year 2022-23.', file: 'audit-report-2022-23.pdf', size: '1.1 MB', year: '2022-23' },
    ],
  },
  {
    id: 'tax',
    title: 'Tax & Financial Filings',
    intro: 'Income tax returns filed by the organisation.',
    icon: 'calendar',
    docs: [
      { title: 'ITR 2025-26', text: 'Income tax return for assessment year 2025-26.', file: 'itr-2025-26.pdf', size: '64 KB', year: 'AY 2025-26' },
      { title: 'ITR 2024-25', text: 'Income tax return for assessment year 2024-25.', file: 'itr-2024-25.pdf', size: '63 KB', year: 'AY 2024-25' },
      { title: 'ITR 2023-24', text: 'Income tax return for assessment year 2023-24.', file: 'itr-2023-24.pdf', size: '63 KB', year: 'AY 2023-24' },
    ],
  },
  {
    id: 'fcra',
    title: 'FCRA Reports & Returns',
    intro: 'Foreign contribution audit statements and FC-4 annual returns.',
    icon: 'megaphone',
    docs: [
      { title: 'FC Audit 2024-25', text: 'FCRA audit statement for 2024-25.', file: 'audit-report-2024-25.pdf', size: '5.7 MB', year: '2024-25' },
      { title: 'FC Audit 2023-24', text: 'FCRA audit statement for 2023-24.', file: 'fc-audit-2023-24.pdf', size: '634 KB', year: '2023-24' },
      { title: 'FC Audit 2022-23', text: 'FCRA audit statement for 2022-23.', file: 'audit-report-2022-23.pdf', size: '1.1 MB', year: '2022-23' },
      { title: 'FC-4 Return 2024-25', text: 'Annual return of foreign contribution received, FY 2024-25.', file: 'fc4-return-2024-25.pdf', size: '27 KB', year: '2024-25' },
      { title: 'FC-4 Return 2023-24', text: 'Annual return of foreign contribution received, FY 2023-24.', file: 'fc4-return-2023-24.pdf', size: '3.9 MB', year: '2023-24' },
      { title: 'FC-4 Return 2022-23', text: 'Annual return of foreign contribution received, FY 2022-23.', file: 'fc4-return-2022-23.pdf', size: '24 KB', year: '2022-23' },
    ],
  },
];
