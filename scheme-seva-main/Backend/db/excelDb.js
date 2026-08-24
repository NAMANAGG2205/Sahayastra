import ExcelJS from 'exceljs';
import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync, existsSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXCEL_PATH = path.join(__dirname, 'schemes.xlsx');

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Real Indian Government Schemes Data
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SCHEMES_DATA = [
  {
    _id: "scheme_001",
    schemeName: "Pradhan Mantri Jan Dhan Yojana",
    schemeShortTitle: "PMJDY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Finance" },
    tags: ["Banking", "Financial Inclusion", "BPL", "Women", "Rural"],
    schemeCategory: ["Banking & Financial Services", "Social Welfare"],
    detailedDescription_md: `## Pradhan Mantri Jan Dhan Yojana (PMJDY)\n\nPMJDY is the National Mission for Financial Inclusion to ensure access to financial services, namely Banking/Savings & Deposit Accounts, Remittance, Credit, Insurance and Pension in an affordable manner.\n\nLaunched on **28th August 2014** by Prime Minister Narendra Modi, this scheme has been one of the most successful financial inclusion programmes globally.\n\n### Key Features\n- Zero-balance savings bank account\n- RuPay Debit Card with accident insurance cover of â‚¹2 lakh\n- Overdraft facility up to â‚¹10,000 after 6 months of satisfactory account operation\n- Direct Benefit Transfer (DBT) of government subsidies\n- Life insurance cover of â‚¹30,000 to the beneficiary`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- **Age**: 10 years and above (minors can open accounts with guardian)\n- **Citizenship**: Indian citizen\n- **No existing bank account** in any bank\n- Any individual who does not have a bank account is eligible\n- People living in unbanked and under-banked areas are specifically targeted`,
    benefits: [
      { type: "paragraph", children: [{ text: "Zero balance savings bank account with no minimum balance requirement." }] },
      { type: "paragraph", children: [{ text: "RuPay Debit Card with accident insurance cover of â‚¹2 lakh." }] },
      { type: "paragraph", children: [{ text: "Overdraft facility up to â‚¹10,000 after 6 months of satisfactory account operation." }] },
      { type: "paragraph", children: [{ text: "Life insurance cover of â‚¹30,000 payable on death of the beneficiary due to any reason." }] },
      { type: "paragraph", children: [{ text: "Direct Benefit Transfer (DBT) of subsidies directly into account." }] },
      { type: "paragraph", children: [{ text: "Access to Pension and Insurance products." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Step 1: Visit the nearest bank branch or Business Correspondent (BC) outlet." }] },
          { type: "paragraph", children: [{ text: "Step 2: Carry identity proof (Aadhaar, Voter ID, Passport, or any valid ID)." }] },
          { type: "paragraph", children: [{ text: "Step 3: Fill the account opening form (Form available at branch)." }] },
          { type: "paragraph", children: [{ text: "Step 4: Submit the form along with self-attested copies of documents." }] },
          { type: "paragraph", children: [{ text: "Step 5: Account will be opened and RuPay card will be issued." }] }
        ]
      },
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit the official PMJDY website at pmjdy.gov.in." }] },
          { type: "paragraph", children: [{ text: "Download and fill the account opening form." }] },
          { type: "paragraph", children: [{ text: "Submit at nearest bank branch." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Identity Proof: Aadhaar Card / Voter ID / Driving License / PAN Card / Passport" }] },
      { type: "paragraph", children: [{ text: "Address Proof: Aadhaar Card / Utility Bill / Bank Statement" }] },
      { type: "paragraph", children: [{ text: "2 passport-size photographs" }] },
      { type: "paragraph", children: [{ text: "Mobile number (optional but recommended for SMS alerts)" }] }
    ],
    faqs: [
      { question: "Can I open PMJDY account online?", answer: "You can download the form online but account opening requires visiting a bank branch or Business Correspondent outlet." },
      { question: "What is the overdraft facility limit?", answer: "Up to â‚¹10,000 overdraft is available after 6 months of satisfactory account operation. For accounts linked with Aadhaar, the limit is â‚¹10,000." },
      { question: "Is the account really zero-balance?", answer: "Yes, PMJDY accounts are zero-balance accounts. No minimum balance is required to maintain the account." }
    ],
    references: [{ title: "Official PMJDY Website", url: "https://pmjdy.gov.in" }]
  },
  {
    _id: "scheme_002",
    schemeName: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana",
    schemeShortTitle: "AB-PMJAY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Health and Family Welfare" },
    tags: ["Health", "Insurance", "BPL", "Hospitalization", "Medical"],
    schemeCategory: ["Health & Wellness", "Insurance"],
    detailedDescription_md: `## Ayushman Bharat â€“ PM Jan Arogya Yojana (AB-PMJAY)\n\nAB-PMJAY is the world's largest health insurance scheme fully financed by the government. Launched in **September 2018**, it provides health cover of **â‚¹5 lakh per family per year** for secondary and tertiary care hospitalization.\n\n### Coverage\n- Over **10.74 crore** poor and vulnerable families (approximately 50 crore beneficiaries) are covered.\n- Benefits are available at empanelled public and private hospitals across India.\n\n### What is Covered?\n- Pre and post hospitalization expenses\n- Day care surgeries\n- 1,949 medical and surgical packages\n- All pre-existing conditions covered from day one`,
    eligibilityDescription_md: `### Eligibility Criteria\n\nBased on Socio-Economic Caste Census (SECC) 2011 data:\n\n**Rural families** where at least one of the following conditions is true:\n- Households with only one room with kuccha walls and kuccha roof\n- Families with no adult member between age 16-59\n- Female-headed households with no adult male member between 16-59\n- Households with disabled member and no able-bodied adult member\n- SC/ST households\n- Landless households earning through manual casual labour\n\n**Urban families** belonging to occupational categories like ragpickers, beggars, domestic workers, street vendors, etc.`,
    benefits: [
      { type: "paragraph", children: [{ text: "Health cover of â‚¹5 lakh per family per year for secondary and tertiary care hospitalization." }] },
      { type: "paragraph", children: [{ text: "Cashless and paperless access to services at the point of service in public and private empanelled hospitals." }] },
      { type: "paragraph", children: [{ text: "No cap on family size, age or gender." }] },
      { type: "paragraph", children: [{ text: "All pre-existing conditions covered from Day 1." }] },
      { type: "paragraph", children: [{ text: "Covers 1,949 medical and surgical packages including surgery, medical and day care treatments." }] },
      { type: "paragraph", children: [{ text: "Transport allowance also paid per hospitalization." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Step 1: Visit pmjay.gov.in and click 'Am I Eligible'." }] },
          { type: "paragraph", children: [{ text: "Step 2: Enter mobile number and OTP to verify." }] },
          { type: "paragraph", children: [{ text: "Step 3: Search by name, HHD number, ration card number or mobile number." }] },
          { type: "paragraph", children: [{ text: "Step 4: If eligible, visit nearest empanelled hospital or Common Service Centre (CSC) to get Ayushman card." }] }
        ]
      },
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Visit nearest government hospital or empanelled private hospital." }] },
          { type: "paragraph", children: [{ text: "The hospital has an Ayushman Mitra who will help verify eligibility and process claims." }] },
          { type: "paragraph", children: [{ text: "Show Aadhaar or Ration Card to verify identity." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card (for identity and address verification)" }] },
      { type: "paragraph", children: [{ text: "Ration Card (to prove family membership)" }] },
      { type: "paragraph", children: [{ text: "Any government-issued photo ID" }] }
    ],
    faqs: [
      { question: "How do I know if I am eligible?", answer: "Visit pmjay.gov.in and click 'Am I Eligible'. Enter your mobile number and search by name or HHD number from SECC 2011 data." },
      { question: "Can I use the scheme at private hospitals?", answer: "Yes, you can use AB-PMJAY at any empanelled private hospital. The list of empanelled hospitals is available on the official website." },
      { question: "Is there a limit on number of hospitalizations?", answer: "No, there is no limit on the number of hospitalizations per year. The only cap is â‚¹5 lakh per family per year." }
    ],
    references: [{ title: "Official AB-PMJAY Website", url: "https://pmjay.gov.in" }]
  },
  {
    _id: "scheme_003",
    schemeName: "PM Kisan Samman Nidhi",
    schemeShortTitle: "PM-KISAN",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Agriculture", "Farmers", "Income Support", "Rural", "Direct Benefit"],
    schemeCategory: ["Agriculture, Rural & Environment", "Financial Assistance"],
    detailedDescription_md: `## PM Kisan Samman Nidhi (PM-KISAN)\n\nPM-KISAN is a Central Sector scheme launched in **February 2019** to provide income support to all landholding farmers' families to supplement their financial needs for procuring various inputs related to agriculture and allied activities.\n\n### Financial Benefit\n- **â‚¹6,000 per year** is provided to eligible farmer families\n- Amount is transferred in **3 equal instalments of â‚¹2,000 each**\n- Money is directly transferred to bank accounts via DBT\n\n### Coverage\nThe scheme is implemented by the **Department of Agriculture & Farmers' Welfare** and covers all landholding farmers' families in the country.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n**Eligible Farmers:**\n- All land-holding farmers' families with cultivable land\n- Both small and marginal farmers as well as large farmers are eligible\n\n**Excluded Categories:**\n- Institutional landholders\n- Farmer families who are/were holding constitutional posts\n- Serving/retired officers and employees of State/Central Government Ministries\n- All superannuated/retired pensioners with monthly pension â‰¥ â‚¹10,000\n- People who paid Income Tax in the last assessment year\n- Professionals (Doctors, Engineers, Lawyers, CAs, etc.) registered with professional bodies`,
    benefits: [
      { type: "paragraph", children: [{ text: "â‚¹6,000 per year income support directly to farmer's bank account." }] },
      { type: "paragraph", children: [{ text: "Amount released in 3 equal instalments of â‚¹2,000 every four months." }] },
      { type: "paragraph", children: [{ text: "Direct Bank Transfer (DBT) â€” no middlemen involved." }] },
      { type: "paragraph", children: [{ text: "Helps farmers purchase inputs like seeds, fertilizers, and equipment." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Step 1: Visit pmkisan.gov.in." }] },
          { type: "paragraph", children: [{ text: "Step 2: Click on 'Farmers Corner' and then 'New Farmer Registration'." }] },
          { type: "paragraph", children: [{ text: "Step 3: Enter Aadhaar number, mobile number, and state." }] },
          { type: "paragraph", children: [{ text: "Step 4: Fill the registration form with land and bank details." }] },
          { type: "paragraph", children: [{ text: "Step 5: Submit and note the reference number for tracking." }] }
        ]
      },
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Visit the nearest Common Service Centre (CSC) or Agriculture Department office." }] },
          { type: "paragraph", children: [{ text: "Carry land records (Khasra-Khatauni), bank passbook, and Aadhaar." }] },
          { type: "paragraph", children: [{ text: "The CSC operator will register you in the PM-KISAN portal." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card (mandatory for authentication)" }] },
      { type: "paragraph", children: [{ text: "Land records / Khasra-Khatauni (proof of landholding)" }] },
      { type: "paragraph", children: [{ text: "Bank account passbook (for direct transfer)" }] },
      { type: "paragraph", children: [{ text: "Mobile number linked to Aadhaar" }] }
    ],
    faqs: [
      { question: "When are the instalments released?", answer: "Instalments are released every 4 months: April-July, August-November, and December-March." },
      { question: "Can tenant farmers apply?", answer: "Only landholding farmers are eligible. Tenant farmers who cultivate on leased land are not eligible under this scheme." },
      { question: "How to check payment status?", answer: "Visit pmkisan.gov.in â†’ Farmers Corner â†’ Beneficiary Status â†’ Enter Aadhaar/Account/Mobile number." }
    ],
    references: [{ title: "Official PM-KISAN Website", url: "https://pmkisan.gov.in" }]
  },
  {
    _id: "scheme_004",
    schemeName: "Pradhan Mantri Awas Yojana - Urban",
    schemeShortTitle: "PMAY-U",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Housing and Urban Affairs" },
    tags: ["Housing", "Urban", "EWS", "LIG", "MIG", "Home Loan Subsidy"],
    schemeCategory: ["Housing & Shelter", "Urban Development"],
    detailedDescription_md: `## Pradhan Mantri Awas Yojana â€“ Urban (PMAY-U)\n\nPMAY-U was launched on **25th June 2015** with the mission of providing affordable housing to urban poor. The scheme aims to ensure **"Housing for All"** by providing pucca houses with basic amenities.\n\n### Four Components:\n1. **In-Situ Slum Redevelopment (ISSR)**: Using land as a resource to rehabilitate slum dwellers\n2. **Affordable Housing in Partnership (AHP)**: Affordable housing with States/UTs\n3. **Beneficiary-Led Construction (BLC)**: Individual house construction/enhancement\n4. **Credit Linked Subsidy Scheme (CLSS)**: Subsidy on home loans`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n**Income Groups:**\n- **EWS (Economically Weaker Section)**: Annual income up to â‚¹3 lakh\n- **LIG (Lower Income Group)**: Annual income â‚¹3â€“6 lakh\n- **MIG-I (Middle Income Group)**: Annual income â‚¹6â€“12 lakh\n- **MIG-II (Middle Income Group)**: Annual income â‚¹12â€“18 lakh\n\n**Conditions:**\n- Applicant or family should not own a pucca house anywhere in India\n- Must be an urban area resident\n- EWS/LIG: Female co-ownership mandatory for new construction`,
    benefits: [
      { type: "paragraph", children: [{ text: "EWS/LIG: Interest subsidy of 6.5% on home loans up to â‚¹6 lakh tenure up to 20 years." }] },
      { type: "paragraph", children: [{ text: "MIG-I: Interest subsidy of 4% on home loans up to â‚¹9 lakh." }] },
      { type: "paragraph", children: [{ text: "MIG-II: Interest subsidy of 3% on home loans up to â‚¹12 lakh." }] },
      { type: "paragraph", children: [{ text: "Central Assistance of â‚¹1.5 lakh per house for BLC/AHP components." }] },
      { type: "paragraph", children: [{ text: "Preference given to SC/ST, minorities, differently-abled, transgender, senior citizens." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Step 1: Visit pmaymis.gov.in." }] },
          { type: "paragraph", children: [{ text: "Step 2: Click 'Citizen Assessment' and select the appropriate component." }] },
          { type: "paragraph", children: [{ text: "Step 3: Enter Aadhaar number for authentication." }] },
          { type: "paragraph", children: [{ text: "Step 4: Fill the application form with personal, income, and property details." }] },
          { type: "paragraph", children: [{ text: "Step 5: Submit and save the application ID." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card (mandatory)" }] },
      { type: "paragraph", children: [{ text: "Income proof (salary slip / IT return / bank statement)" }] },
      { type: "paragraph", children: [{ text: "Property documents / agreement" }] },
      { type: "paragraph", children: [{ text: "Bank account details" }] },
      { type: "paragraph", children: [{ text: "Caste certificate (for SC/ST applicants)" }] }
    ],
    faqs: [
      { question: "Can existing home loan borrowers apply for CLSS?", answer: "Yes, existing home loan borrowers can also claim interest subsidy under CLSS if they meet the eligibility criteria." },
      { question: "Is there a deadline to apply?", answer: "PMAY-U 2.0 has been extended with new timelines. Check pmaymis.gov.in for current deadlines." }
    ],
    references: [{ title: "PMAY-U Official Website", url: "https://pmaymis.gov.in" }]
  },
  {
    _id: "scheme_005",
    schemeName: "Pradhan Mantri Mudra Yojana",
    schemeShortTitle: "PMMY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Finance" },
    tags: ["MSME", "Business Loan", "Self Employment", "Entrepreneurship", "Women Entrepreneur"],
    schemeCategory: ["Business & Entrepreneurship", "Banking & Financial Services"],
    detailedDescription_md: `## Pradhan Mantri Mudra Yojana (PMMY)\n\nPMMY was launched on **8th April 2015** for providing loans up to â‚¹10 lakh to non-corporate, non-farm small/micro enterprises. Loans are given by commercial banks, RRBs, small finance banks, MFIs and NBFCs.\n\n### Three Products:\n- **Shishu**: Loans up to â‚¹50,000 â€” for startups and early-stage businesses\n- **Kishore**: Loans from â‚¹50,001 to â‚¹5 lakh â€” for established businesses needing growth capital\n- **Tarun**: Loans from â‚¹5 lakh to â‚¹10 lakh â€” for well-established businesses\n\n### New Category (2024):\n- **Tarun Plus**: Loans from â‚¹10 lakh to â‚¹20 lakh for successful Tarun borrowers`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Any Indian citizen who has a business plan for a non-farm income generating activity\n- Non-corporate and non-farm micro and small enterprises\n- Businesses in manufacturing, trading and services sector\n- Individuals, partnerships, proprietary concerns\n- **No collateral** required for loans under PMMY\n- Age: 18-65 years`,
    benefits: [
      { type: "paragraph", children: [{ text: "Collateral-free loans up to â‚¹10 lakh (â‚¹20 lakh for Tarun Plus)." }] },
      { type: "paragraph", children: [{ text: "Mudra Card (debit card) for working capital needs." }] },
      { type: "paragraph", children: [{ text: "No processing fee for Shishu category loans." }] },
      { type: "paragraph", children: [{ text: "Flexible repayment tenure up to 5 years." }] },
      { type: "paragraph", children: [{ text: "Competitive interest rates â€” no cap but market-linked rates." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit mudra.org.in or Udyamimitra portal (udyamimitra.in)." }] },
          { type: "paragraph", children: [{ text: "Register and fill the loan application form." }] },
          { type: "paragraph", children: [{ text: "Submit documents and business plan." }] },
          { type: "paragraph", children: [{ text: "Bank will evaluate and disburse the loan." }] }
        ]
      },
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Visit any commercial bank, RRB, MFI, or NBFC branch." }] },
          { type: "paragraph", children: [{ text: "Request PMMY loan application form." }] },
          { type: "paragraph", children: [{ text: "Submit filled form with required documents." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Identity proof: Aadhaar, PAN, Voter ID, Passport" }] },
      { type: "paragraph", children: [{ text: "Address proof: Utility bill, Aadhaar, bank statement" }] },
      { type: "paragraph", children: [{ text: "Business proof / registration certificate" }] },
      { type: "paragraph", children: [{ text: "Last 6 months bank statements" }] },
      { type: "paragraph", children: [{ text: "Business plan / project report" }] },
      { type: "paragraph", children: [{ text: "2 passport-size photographs" }] }
    ],
    faqs: [
      { question: "Is collateral required for MUDRA loan?", answer: "No. MUDRA loans are collateral-free. No guarantee or security is required." },
      { question: "Can a salaried person apply for MUDRA loan?", answer: "No, MUDRA loans are for self-employed and business owners, not salaried individuals." },
      { question: "What is the interest rate on MUDRA loans?", answer: "Interest rates vary by bank and loan type, typically ranging from 8.5% to 12% per annum." }
    ],
    references: [{ title: "Official MUDRA Website", url: "https://www.mudra.org.in" }]
  },
  {
    _id: "scheme_006",
    schemeName: "National Scholarship Portal Schemes",
    schemeShortTitle: "NSP",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Electronics and Information Technology" },
    tags: ["Scholarship", "Education", "Students", "SC", "ST", "OBC", "Minority"],
    schemeCategory: ["Education & Learning", "Social Welfare"],
    detailedDescription_md: `## National Scholarship Portal (NSP)\n\nNSP is a one-stop solution for students seeking scholarships from Central and State governments. It was developed to streamline scholarship services to students, right from submission of student application, verification, sanction, and disbursal.\n\n### Scholarships Available:\n- **Pre-Matric Scholarships** for SC, ST, OBC, Minority students\n- **Post-Matric Scholarships** for SC, ST, OBC, Minority students\n- **Top Class Education** scholarship for SC and ST students\n- **Central Sector Scholarship** for College & University students\n- **PM Scholarship** for Central Armed Police Forces and Railway Protection Force`,
    eligibilityDescription_md: `### Eligibility Criteria\n\nVaries by scholarship type. General criteria:\n\n- **Indian citizen** enrolled in a recognized educational institution\n- **Family income** usually below â‚¹2.5 lakh per annum (varies by scheme)\n- **Academic performance**: Usually 50%-60% or above in previous examination\n- **Community**: SC/ST/OBC/Minority/General (depends on specific scholarship)\n- **Age**: Based on class/course (Pre-matric: up to Class 10, Post-matric: Class 11 onwards)`,
    benefits: [
      { type: "paragraph", children: [{ text: "Scholarship amount varies by scheme: â‚¹600 to â‚¹20,000 per annum for pre-matric." }] },
      { type: "paragraph", children: [{ text: "Post-matric scholarships cover maintenance and course fees." }] },
      { type: "paragraph", children: [{ text: "Top Class Education: Full coverage of tuition fee + â‚¹2,000/month living expenses for SC students in top institutions." }] },
      { type: "paragraph", children: [{ text: "Central Sector Scholarship: â‚¹10,000/year for Class 11-12, â‚¹20,000/year for undergraduate/postgraduate." }] },
      { type: "paragraph", children: [{ text: "Direct transfer to student's bank account." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Step 1: Visit scholarships.gov.in." }] },
          { type: "paragraph", children: [{ text: "Step 2: Register as new student applicant." }] },
          { type: "paragraph", children: [{ text: "Step 3: Log in and fill the scholarship application." }] },
          { type: "paragraph", children: [{ text: "Step 4: Upload required documents." }] },
          { type: "paragraph", children: [{ text: "Step 5: Submit the form before deadline." }] },
          { type: "paragraph", children: [{ text: "Step 6: Track application status on the portal." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card (mandatory for authentication)" }] },
      { type: "paragraph", children: [{ text: "Previous year mark sheets / certificates" }] },
      { type: "paragraph", children: [{ text: "Income certificate (family income proof)" }] },
      { type: "paragraph", children: [{ text: "Caste/Community certificate (SC/ST/OBC/Minority)" }] },
      { type: "paragraph", children: [{ text: "Bank account details with IFSC code" }] },
      { type: "paragraph", children: [{ text: "Institute verification / bonafide certificate" }] }
    ],
    faqs: [
      { question: "When does the application window open?", answer: "NSP applications typically open in September-October each year. Check scholarships.gov.in for exact dates." },
      { question: "Can I apply for multiple scholarships?", answer: "Students can apply for multiple scholarships on NSP but can receive only one scholarship amount under each category." }
    ],
    references: [{ title: "National Scholarship Portal", url: "https://scholarships.gov.in" }]
  },
  {
    _id: "scheme_007",
    schemeName: "Sukanya Samriddhi Yojana",
    schemeShortTitle: "SSY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Finance" },
    tags: ["Girl Child", "Savings", "Education", "Women", "Investment"],
    schemeCategory: ["Women & Child Development", "Banking & Financial Services"],
    detailedDescription_md: `## Sukanya Samriddhi Yojana (SSY)\n\nSSY is a small savings scheme launched under the **Beti Bachao, Beti Padhao** campaign in **January 2015**. It provides a high-interest savings vehicle for parents to save for their girl child's education and marriage.\n\n### Key Features:\n- Current interest rate: **8.2% per annum** (one of the highest for small savings)\n- Tax-free returns under Section 80C\n- Account matures in **21 years** from date of opening or at marriage of girl after 18 years`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Account can be opened for a **girl child below 10 years** of age\n- Can be opened by **natural or legal guardian** of the girl child\n- Maximum **two accounts** per family (one per girl child)\n- Third account allowed if twin/triplet girls are born in the second birth or in the first birth itself\n- Girl must be **Indian citizen**`,
    benefits: [
      { type: "paragraph", children: [{ text: "High interest rate of 8.2% per annum (tax-free)." }] },
      { type: "paragraph", children: [{ text: "Tax deduction under Section 80C up to â‚¹1.5 lakh per year." }] },
      { type: "paragraph", children: [{ text: "Partial withdrawal of up to 50% allowed after girl turns 18 for education." }] },
      { type: "paragraph", children: [{ text: "Minimum deposit: â‚¹250 per year. Maximum: â‚¹1.5 lakh per year." }] },
      { type: "paragraph", children: [{ text: "Full withdrawal or account closure on marriage after age 18." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Step 1: Visit any Post Office or authorised bank branch." }] },
          { type: "paragraph", children: [{ text: "Step 2: Request SSY account opening form." }] },
          { type: "paragraph", children: [{ text: "Step 3: Fill the form with girl child's and guardian's details." }] },
          { type: "paragraph", children: [{ text: "Step 4: Submit with required documents and initial deposit (minimum â‚¹250)." }] },
          { type: "paragraph", children: [{ text: "Step 5: Receive passbook for the account." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Birth certificate of the girl child" }] },
      { type: "paragraph", children: [{ text: "Identity proof of guardian (Aadhaar / PAN / Passport)" }] },
      { type: "paragraph", children: [{ text: "Address proof of guardian" }] },
      { type: "paragraph", children: [{ text: "Photograph of the girl child and guardian" }] }
    ],
    faqs: [
      { question: "What happens if minimum deposit is not made in a year?", answer: "The account becomes irregular. A penalty of â‚¹50 per year of default is charged along with minimum deposit to regularize it." },
      { question: "Can the account be transferred?", answer: "Yes, the SSY account can be transferred from one Post Office/bank to another anywhere in India." }
    ],
    references: [{ title: "India Post SSY", url: "https://www.indiapost.gov.in" }]
  },
  {
    _id: "scheme_008",
    schemeName: "Atal Pension Yojana",
    schemeShortTitle: "APY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Finance" },
    tags: ["Pension", "Retirement", "Unorganised Sector", "Social Security"],
    schemeCategory: ["Pension & Retirement", "Social Security"],
    detailedDescription_md: `## Atal Pension Yojana (APY)\n\nAPY was launched in **May 2015** and is focused on the unorganised sector workers. It guarantees a minimum monthly pension of **â‚¹1,000 to â‚¹5,000** after age 60, depending on the contribution.\n\n### How it works:\n- Subscribers contribute a fixed amount monthly/quarterly/half-yearly\n- On attaining 60 years, guaranteed minimum pension is paid\n- On death of subscriber, spouse receives same pension, then nominee gets corpus`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- **Age**: 18 to 40 years\n- Must be an **Indian citizen**\n- Must have a **savings bank account**\n- Should **not be an income tax payer** (from October 2022 onwards, IT payees are not eligible for new accounts)\n- Not covered under any statutory social security scheme`,
    benefits: [
      { type: "paragraph", children: [{ text: "Guaranteed monthly pension of â‚¹1,000 / â‚¹2,000 / â‚¹3,000 / â‚¹4,000 / â‚¹5,000 from age 60." }] },
      { type: "paragraph", children: [{ text: "Same pension amount to spouse after subscriber's death." }] },
      { type: "paragraph", children: [{ text: "Return of pension corpus to nominee on death of both subscriber and spouse." }] },
      { type: "paragraph", children: [{ text: "Tax benefit under Section 80CCD(1B) â€” additional â‚¹50,000 over 80C limit." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit npscra.nsdl.co.in or use your bank's net banking." }] },
          { type: "paragraph", children: [{ text: "Fill APY registration form online." }] },
          { type: "paragraph", children: [{ text: "Provide Aadhaar and bank details for auto-debit setup." }] }
        ]
      },
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Visit your bank branch where you hold a savings account." }] },
          { type: "paragraph", children: [{ text: "Fill the APY enrollment form." }] },
          { type: "paragraph", children: [{ text: "Provide Aadhaar and mobile number." }] },
          { type: "paragraph", children: [{ text: "Contribution will be auto-debited from your account." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Savings bank account (mandatory)" }] },
      { type: "paragraph", children: [{ text: "Aadhaar Card" }] },
      { type: "paragraph", children: [{ text: "Mobile number" }] }
    ],
    faqs: [
      { question: "Can I change my pension amount?", answer: "Yes, you can increase or decrease your pension amount once per year during the months of April to July." },
      { question: "What if I contribute beyond 60 years?", answer: "APY does not allow contributions after age 60. At 60, pension automatically starts." }
    ],
    references: [{ title: "APY Official Page", url: "https://npscra.nsdl.co.in/scheme-details.php" }]
  },
  {
    _id: "scheme_009",
    schemeName: "Pradhan Mantri Fasal Bima Yojana",
    schemeShortTitle: "PMFBY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Agriculture", "Insurance", "Crop Insurance", "Farmers", "Natural Calamity"],
    schemeCategory: ["Agriculture, Rural & Environment", "Insurance"],
    detailedDescription_md: `## Pradhan Mantri Fasal Bima Yojana (PMFBY)\n\nPMFBY was launched in **Kharif 2016** to provide a comprehensive insurance cover against failure of crops, thus helping stabilize the income of farmers.\n\n### Premium Structure:\n- **Kharif crops**: 2% of sum insured\n- **Rabi crops**: 1.5% of sum insured\n- **Annual commercial/horticultural crops**: 5% of sum insured\n- Remaining premium is shared equally by Central and State governments`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- All farmers growing notified crops in notified areas are eligible\n- **Loanee farmers**: Compulsorily covered (those who have taken crop loans from banks)\n- **Non-loanee farmers**: Voluntary enrollment\n- **Tenant/Sharecropper farmers** are also eligible`,
    benefits: [
      { type: "paragraph", children: [{ text: "Comprehensive risk cover for crop loss due to natural calamities, pests & diseases." }] },
      { type: "paragraph", children: [{ text: "Very low premium rates: 2% for Kharif, 1.5% for Rabi crops." }] },
      { type: "paragraph", children: [{ text: "Covers post-harvest losses up to 14 days for crops left in cut and spread condition." }] },
      { type: "paragraph", children: [{ text: "Claims settled quickly using technology (satellite, remote sensing)." }] },
      { type: "paragraph", children: [{ text: "Financial support to maintain farming continuity even after crop failure." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit pmfby.gov.in and click 'Farmer Application'." }] },
          { type: "paragraph", children: [{ text: "Register with mobile number and Aadhaar." }] },
          { type: "paragraph", children: [{ text: "Fill crop, land, and bank details." }] },
          { type: "paragraph", children: [{ text: "Pay the premium online and receive acknowledgment." }] }
        ]
      },
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Visit nearest bank / CSC / agriculture department before cut-off date." }] },
          { type: "paragraph", children: [{ text: "Fill the proposal form and submit land records." }] },
          { type: "paragraph", children: [{ text: "Pay premium at bank counter." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Land records (Khasra/Khatauni for owned land)" }] },
      { type: "paragraph", children: [{ text: "Sowing certificate from agriculture officer" }] },
      { type: "paragraph", children: [{ text: "Bank account passbook" }] },
      { type: "paragraph", children: [{ text: "Aadhaar Card" }] }
    ],
    faqs: [
      { question: "Are organic crop farmers eligible?", answer: "Yes, all farmers growing notified crops including organic farmers are eligible for PMFBY." },
      { question: "What losses are not covered?", answer: "Losses due to war, nuclear risks, malicious damage, and risks not covered by the scheme are excluded." }
    ],
    references: [{ title: "PMFBY Official Website", url: "https://pmfby.gov.in" }]
  },
  {
    _id: "scheme_010",
    schemeName: "Skill India Mission - PMKVY",
    schemeShortTitle: "PMKVY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Skill Development and Entrepreneurship" },
    tags: ["Skill Development", "Youth", "Employment", "Training", "Vocational"],
    schemeCategory: ["Skills & Employment", "Education & Learning"],
    detailedDescription_md: `## Pradhan Mantri Kaushal Vikas Yojana (PMKVY)\n\nPMKVY is the flagship scheme of the Ministry of Skill Development & Entrepreneurship (MSDE). The objective of PMKVY 4.0 is to enable a large number of Indian youth to take up industry-relevant skill training that will help them in securing better livelihoods.\n\n### PMKVY 4.0 (2022-2026):\n- Target: **1.4 crore** youth to be skilled\n- Focus on industry 4.0 skills: AI, IoT, coding, drones, etc.\n- Special emphasis on Aspirational Districts and North-East states`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- **Age**: 15-45 years (varies by programme)\n- **Indian citizen**\n- School/college dropouts or those seeking skill upgradation\n- Unemployed youth\n- No minimum educational qualification required for most courses\n- Existing workers seeking Recognition of Prior Learning (RPL)`,
    benefits: [
      { type: "paragraph", children: [{ text: "Free skill training by certified training partners." }] },
      { type: "paragraph", children: [{ text: "Stipend/compensation during training in some programmes." }] },
      { type: "paragraph", children: [{ text: "Industry-recognized certification upon completion." }] },
      { type: "paragraph", children: [{ text: "Placement assistance and industry linkages." }] },
      { type: "paragraph", children: [{ text: "Post Placement Support and tracking for 90 days." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit skillindia.gov.in or pmkvyofficial.org." }] },
          { type: "paragraph", children: [{ text: "Search for training centres near your location." }] },
          { type: "paragraph", children: [{ text: "Select a relevant skill course." }] },
          { type: "paragraph", children: [{ text: "Register and enroll for the selected training programme." }] }
        ]
      },
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Visit nearest Pradhan Mantri Kaushal Kendra (PMKK)." }] },
          { type: "paragraph", children: [{ text: "Inquire about ongoing training batches." }] },
          { type: "paragraph", children: [{ text: "Register with required documents." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card (for identity verification)" }] },
      { type: "paragraph", children: [{ text: "Educational certificates (if applicable)" }] },
      { type: "paragraph", children: [{ text: "Bank account details" }] },
      { type: "paragraph", children: [{ text: "Passport-size photograph" }] }
    ],
    faqs: [
      { question: "Is the training really free?", answer: "Yes, training under PMKVY is completely free of cost for eligible candidates." },
      { question: "Is the certification valid for jobs?", answer: "Yes, PMKVY certifications are nationally recognized by industry and government bodies." }
    ],
    references: [{ title: "Skill India Portal", url: "https://www.skillindia.gov.in" }]
  },
  {
    _id: "scheme_011",
    schemeName: "Pradhan Mantri Shram Yogi Maan-Dhan",
    schemeShortTitle: "PMSYM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Labour and Employment" },
    tags: ["Pension", "Unorganised Workers", "Social Security", "Labour"],
    schemeCategory: ["Pension & Retirement", "Social Security"],
    detailedDescription_md: `## Pradhan Mantri Shram Yogi Maan-Dhan (PMSYM)\n\nPMSYM was launched in February 2019 to provide pension to unorganised sector workers. It guarantees minimum pension of â‚¹3,000 per month after age 60.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Age: 18 to 40 years\n- Monthly income â‰¤ â‚¹15,000\n- Must be unorganised sector worker\n- Should not be income tax payer`,
    benefits: [
      { type: "paragraph", children: [{ text: "Minimum assured pension of â‚¹3,000 per month after age 60." }] },
      { type: "paragraph", children: [{ text: "Government contributes equal matching amount." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit maan-dhan.gov.in and register." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and bank account details" }] }
    ],
    faqs: [
      { question: "Can I exit the scheme?", answer: "Yes, you can exit with refund of contributions after 10 years." }
    ],
    references: [{ title: "PMSYM Official Portal", url: "https://maan-dhan.gov.in" }]
  },
  {
    _id: "scheme_012",
    schemeName: "Pradhan Mantri Matru Vandana Yojana",
    schemeShortTitle: "PMMVY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Women and Child Development" },
    tags: ["Maternity", "Women", "Health", "Nutrition"],
    schemeCategory: ["Women & Child Development", "Health & Wellness"],
    detailedDescription_md: `## Pradhan Mantri Matru Vandana Yojana (PMMVY)\n\nPMMVY provides â‚¹5,000 to pregnant and lactating women for first living child for wage loss compensation.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Pregnant women and lactating mothers (up to 6 months after delivery)\n- First living child only\n- Age: 19 years and above`,
    benefits: [
      { type: "paragraph", children: [{ text: "â‚¹5,000 total benefit in three instalments." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Visit nearest Anganwadi centre." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and bank account details" }] }
    ],
    faqs: [
      { question: "Is benefit available for second child?", answer: "No, PMMVY is only for the first living child." }
    ],
    references: [{ title: "PMMVY Official Website", url: "https://wcd.nic.in" }]
  },
  {
    _id: "scheme_013",
    schemeName: "Pradhan Mantri Ujjwala Yojana",
    schemeShortTitle: "PMUY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Petroleum and Natural Gas" },
    tags: ["LPG", "Clean Energy", "Women", "Rural"],
    schemeCategory: ["Energy & Environment", "Women & Child Development"],
    detailedDescription_md: `## Pradhan Mantri Ujjwala Yojana (PMUY)\n\nPMUY provides free LPG connections to BPL households to replace traditional cooking fuels.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Adult women (18+) from poor households\n- BPL families or households with no LPG connection`,
    benefits: [
      { type: "paragraph", children: [{ text: "Free LPG connection with â‚¹1,600 subsidy." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Visit nearest LPG distributor." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and BPL Ration Card" }] }
    ],
    faqs: [
      { question: "Is subsidy permanent?", answer: "â‚¹200 per cylinder subsidy available for 12 cylinders annually." }
    ],
    references: [{ title: "PMUY Official Website", url: "https://pmuy.gov.in" }]
  },
  {
    _id: "scheme_014",
    schemeName: "National Rural Livelihood Mission",
    schemeShortTitle: "NRLM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Rural Development" },
    tags: ["Livelihood", "Rural", "Women", "Self Help Groups"],
    schemeCategory: ["Rural Development", "Women & Child Development"],
    detailedDescription_md: `## National Rural Livelihood Mission (NRLM)\n\nNRLM reduces poverty by enabling poor households to access self-employment and skilled wage employment.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Rural poor households identified through participatory process\n- Women from poor households`,
    benefits: [
      { type: "paragraph", children: [{ text: "Formation and strengthening of Self Help Groups." }] },
      { type: "paragraph", children: [{ text: "Bank linkages and access to credit." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Contact local NRLM implementing agency." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and bank details" }] }
    ],
    faqs: [
      { question: "Can men join NRLM SHGs?", answer: "NRLM primarily focuses on women's SHGs." }
    ],
    references: [{ title: "NRLM Official Website", url: "https://nrlm.gov.in" }]
  },
  {
    _id: "scheme_015",
    schemeName: "DAY-NULM",
    schemeShortTitle: "DAY-NULM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Housing and Urban Affairs" },
    tags: ["Urban", "Livelihood", "Self Employment"],
    schemeCategory: ["Urban Development", "Skills & Employment"],
    detailedDescription_md: `## Deendayal Antyodaya Yojana - DAY-NULM\n\nDAY-NULM reduces poverty of urban poor through skill development and employment opportunities.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Urban poor including street vendors and slum dwellers\n- Age: 18-45 years for skill training`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidized loans up to â‚¹2 lakh for micro-enterprises." }] },
      { type: "paragraph", children: [{ text: "Free skill training with placement assistance." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Contact Urban Local Body or Municipal Corporation." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and address proof" }] }
    ],
    faqs: [
      { question: "Is skill training free?", answer: "Yes, skill training under DAY-NULM is completely free." }
    ],
    references: [{ title: "DAY-NULM Official Website", url: "http://daynulm.gov.in" }]
  },
  {
    _id: "scheme_016",
    schemeName: "Pradhan Mantri Gram Sadak Yojana",
    schemeShortTitle: "PMGSY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Rural Development" },
    tags: ["Rural", "Infrastructure", "Roads", "Connectivity"],
    schemeCategory: ["Rural Development", "Infrastructure"],
    detailedDescription_md: `## Pradhan Mantri Gram Sadak Yojana (PMGSY)\n\nPMGSY provides all-weather road connectivity to unconnected rural habitations.`,
    eligibilityDescription_md: `### Eligibility Criteria (for habitations)\n\n- Rural habitations with population 500+ in plain areas, 250+ in hilly areas`,
    benefits: [
      { type: "paragraph", children: [{ text: "All-weather road connectivity to remote villages." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Gram Panchayat identifies unconnected habitations." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Habitation survey report" }] }
    ],
    faqs: [
      { question: "What is the width of PMGSY roads?", answer: "Standard width is 3.75m for single lane and 5.5m for double lane." }
    ],
    references: [{ title: "PMGSY Official Website", url: "https://pmgsy.nic.in" }]
  },
  {
    _id: "scheme_017",
    schemeName: "Swachh Bharat Mission - Gramin",
    schemeShortTitle: "SBM-G",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Jal Shakti" },
    tags: ["Sanitation", "Rural", "Toilets"],
    schemeCategory: ["Health & Wellness", "Rural Development"],
    detailedDescription_md: `## Swachh Bharat Mission - Gramin (SBM-G)\n\nSBM-G aims to achieve open defecation free rural India through toilet construction.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Rural households without toilets\n- Priority to SC/ST and BPL families`,
    benefits: [
      { type: "paragraph", children: [{ text: "â‚¹12,000 incentive for toilet construction." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Contact Gram Panchayat or Swachhagrahi." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and bank details" }] }
    ],
    faqs: [
      { question: "What is ODF Plus?", answer: "ODF Plus includes ODF status plus Solid and Liquid Waste Management." }
    ],
    references: [{ title: "SBM-G Official Website", url: "https://sbm.gov.in" }]
  },
  {
    _id: "scheme_018",
    schemeName: "Swachh Bharat Mission - Urban",
    schemeShortTitle: "SBM-U",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Housing and Urban Affairs" },
    tags: ["Urban", "Sanitation", "Toilets"],
    schemeCategory: ["Urban Development", "Health & Wellness"],
    detailedDescription_md: `## Swachh Bharat Mission - Urban (SBM-U)\n\nSBM-U aims to achieve urban India free from open defecation and solid waste management.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Urban households without toilets\n- Slum dwellers and urban poor`,
    benefits: [
      { type: "paragraph", children: [{ text: "â‚¹4,000-â‚¹12,000 incentive for individual toilet construction." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit sbm-urban.gov.in or municipal corporation website." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and property documents" }] }
    ],
    faqs: [
      { question: "What is the difference between ODF and ODF+?", answer: "ODF means no open defecation. ODF+ includes ODF plus functional community toilets and solid waste management." }
    ],
    references: [{ title: "SBM-U Official Website", url: "https://sbm-urban.gov.in" }]
  },
  {
    _id: "scheme_019",
    schemeName: "National Health Mission",
    schemeShortTitle: "NHM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Health and Family Welfare" },
    tags: ["Health", "Rural Health", "Urban Health"],
    schemeCategory: ["Health & Wellness"],
    detailedDescription_md: `## National Health Mission (NHM)\n\nNHM provides accessible, affordable, and quality healthcare to rural and urban populations.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- All citizens eligible for services at public health facilities`,
    benefits: [
      { type: "paragraph", children: [{ text: "Free or subsidized healthcare at public facilities." }] },
      { type: "paragraph", children: [{ text: "ASHA workers for home-based care." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Visit nearest government health facility." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and BPL card (for priority services)" }] }
    ],
    faqs: [
      { question: "Are all services at government hospitals free?", answer: "Most services are free or heavily subsidized." }
    ],
    references: [{ title: "NHM Official Website", url: "https://nhm.gov.in" }]
  },
  {
    _id: "scheme_020",
    schemeName: "Pradhan Mantri Surakshit Matritva Abhiyan",
    schemeShortTitle: "PMSMA",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Health and Family Welfare" },
    tags: ["Maternity", "Pregnant Women", "Health"],
    schemeCategory: ["Health & Wellness", "Women & Child Development"],
    detailedDescription_md: `## Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)\n\nPMSMA provides assured, comprehensive, and quality antenatal care to pregnant women on 9th of every month.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- All pregnant women eligible\n- Any trimester of pregnancy`,
    benefits: [
      { type: "paragraph", children: [{ text: "Free comprehensive antenatal check-up on 9th of every month." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Visit government health facility on 9th of month." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "ANC card and previous medical records" }] }
    ],
    faqs: [
      { question: "Is the service completely free?", answer: "Yes, PMSMA services are completely free." }
    ],
    references: [{ title: "PMSMA Official Website", url: "https://pmsma.gov.in" }]
  },
  {
    _id: "scheme_021",
    schemeName: "Beti Bachao Beti Padhao",
    schemeShortTitle: "BBBP",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Women and Child Development" },
    tags: ["Girl Child", "Education", "Women"],
    schemeCategory: ["Women & Child Development", "Education & Learning"],
    detailedDescription_md: `## Beti Bachao Beti Padhao (BBBP)\n\nBBBP addresses declining child sex ratio and empowers girls through education.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Girl children from birth to completion of education`,
    benefits: [
      { type: "paragraph", children: [{ text: "Access to education through various scholarship schemes." }] },
      { type: "paragraph", children: [{ text: "Financial security through Sukanya Samriddhi Yojana." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Contact Anganwadi centre for various components." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Birth certificate and Aadhaar Card" }] }
    ],
    faqs: [
      { question: "What is NSIGSE?", answer: "National Scheme for Incentive to Girls for Secondary Education provides â‚¹3,000 to SC/ST girls." }
    ],
    references: [{ title: "BBBP Official Website", url: "https://bbbp.gov.in" }]
  },
  {
    _id: "scheme_022",
    schemeName: "Pradhan Mantri Vidyalakshmi Scheme",
    schemeShortTitle: "PMVS",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Education" },
    tags: ["Education", "Higher Education", "Girl Students"],
    schemeCategory: ["Education & Learning", "Financial Assistance"],
    detailedDescription_md: `## Pradhan Mantri Vidyalakshmi Scheme (PMVS)\n\nPMVS provides interest subsidy on educational loans for girl students pursuing higher education.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Girl students pursuing approved professional/technical courses\n- Family income up to â‚¹8 lakh per annum`,
    benefits: [
      { type: "paragraph", children: [{ text: "Full interest subsidy during moratorium period." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply for educational loan from scheduled bank." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Income certificate and admission certificate" }] }
    ],
    faqs: [
      { question: "What is moratorium period?", answer: "Moratorium period is course duration plus 1 year or 6 months after employment, whichever is earlier." }
    ],
    references: [{ title: "PMVS Official Website", url: "https://vidyalakshmi.co.in" }]
  },
  {
    _id: "scheme_023",
    schemeName: "National Apprenticeship Promotion Scheme",
    schemeShortTitle: "NAPS",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Skill Development and Entrepreneurship" },
    tags: ["Apprenticeship", "Skill Development", "Youth"],
    schemeCategory: ["Skills & Employment", "Education & Learning"],
    detailedDescription_md: `## National Apprenticeship Promotion Scheme (NAPS)\n\nNAPS promotes apprenticeship training by providing financial incentives to employers and stipends to apprentices.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Apprentices: 15 years and above\n- Employers: Any establishment with workforce â‰¥ 40 (mandatory)`,
    benefits: [
      { type: "paragraph", children: [{ text: "25% of stipend reimbursed to employers (up to â‚¹1,500/month)." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit apprenticeshipindia.org." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and educational certificates" }] }
    ],
    faqs: [
      { question: "What is the duration of apprenticeship?", answer: "Duration varies by trade from 6 months to 3 years." }
    ],
    references: [{ title: "NAPS Official Website", url: "https://apprenticeshipindia.org" }]
  },
  {
    _id: "scheme_024",
    schemeName: "Pradhan Mantri Kaushal Vikas Yojana 4.0",
    schemeShortTitle: "PMKVY 4.0",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Skill Development and Entrepreneurship" },
    tags: ["Skill Development", "Youth", "Industry 4.0"],
    schemeCategory: ["Skills & Employment", "Education & Learning"],
    detailedDescription_md: `## Pradhan Mantri Kaushal Vikas Yojana 4.0 (PMKVY 4.0)\n\nPMKVY 4.0 focuses on Industry 4.0 skills and future-ready training for youth.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Age: 15-45 years (varies by course)\n- Indian citizen`,
    benefits: [
      { type: "paragraph", children: [{ text: "Free skill training in industry-relevant courses." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit skillindia.gov.in or pmkvyofficial.org." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and educational certificates" }] }
    ],
    faqs: [
      { question: "What is Industry 4.0?", answer: "Industry 4.0 involves automation, IoT, AI, robotics, and smart manufacturing technologies." }
    ],
    references: [{ title: "PMKVY Official Website", url: "https://pmkvyofficial.org" }]
  },
  {
    _id: "scheme_025",
    schemeName: "Stand Up India",
    schemeShortTitle: "Stand Up India",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Finance" },
    tags: ["Entrepreneurship", "SC/ST", "Women"],
    schemeCategory: ["Business & Entrepreneurship", "Banking & Financial Services"],
    detailedDescription_md: `## Stand Up India\n\nStand Up India facilitates bank loans for greenfield enterprises for SC/ST and women entrepreneurs.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- SC/ST entrepreneurs or women entrepreneurs (at least one)\n- For greenfield projects only`,
    benefits: [
      { type: "paragraph", children: [{ text: "Loans from â‚¹10 lakh to â‚¹1 crore for greenfield enterprises." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit standupmitra.in or bank's website." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card, PAN Card, and caste certificate (for SC/ST)" }] }
    ],
    faqs: [
      { question: "What is a greenfield project?", answer: "A greenfield project is a new venture being set up from scratch." }
    ],
    references: [{ title: "Stand Up India Official Website", url: "https://standupmitra.in" }]
  },
  {
    _id: "scheme_026",
    schemeName: "MGNREGA",
    schemeShortTitle: "MGNREGA",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Rural Development" },
    tags: ["Employment", "Rural", "Wages"],
    schemeCategory: ["Rural Development", "Skills & Employment"],
    detailedDescription_md: `## Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)\n\nMGNREGA guarantees 100 days of wage employment per household per year in rural areas.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Adult members (18+) of rural households\n- Willing to do unskilled manual work`,
    benefits: [
      { type: "paragraph", children: [{ text: "Guaranteed 100 days of wage employment per household per year." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply for Job Card at Gram Panchayat." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and bank account details" }] }
    ],
    faqs: [
      { question: "What if work is not provided within 15 days?", answer: "Applicant is entitled to unemployment allowance." }
    ],
    references: [{ title: "MGNREGA Official Website", url: "https://nrega.nic.in" }]
  },
  {
    _id: "scheme_027",
    schemeName: "Pradhan Mantri Awas Yojana - Gramin",
    schemeShortTitle: "PMAY-G",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Rural Development" },
    tags: ["Housing", "Rural", "BPL"],
    schemeCategory: ["Housing & Shelter", "Rural Development"],
    detailedDescription_md: `## Pradhan Mantri Awas Yojana - Gramin (PMAY-G)\n\nPMAY-G provides pucca houses to all rural households by 2022.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Rural households without pucca house\n- Identified through SECC 2011 data`,
    benefits: [
      { type: "paragraph", children: [{ text: "â‚¹1.3 lakh assistance for house construction in plain areas." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Gram Sabha identifies eligible beneficiaries." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "Can I choose the design of my house?", answer: "PMAY-G provides standard house designs with basic amenities." }
    ],
    references: [{ title: "PMAY-G Official Website", url: "https://pmayg.nic.in" }]
  },
  {
    _id: "scheme_028",
    schemeName: "National Social Assistance Programme",
    schemeShortTitle: "NSAP",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Rural Development" },
    tags: ["Pension", "Social Security", "Elderly"],
    schemeCategory: ["Social Security", "Social Welfare"],
    detailedDescription_md: `## National Social Assistance Programme (NSAP)\n\nNSAP provides social security to poor households through pension and assistance programs.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- BPL families identified by state governments\n- Age criteria: 60+ for old age, 40-64 for widows`,
    benefits: [
      { type: "paragraph", children: [{ text: "Old Age Pension: â‚¹200-â‚¹500/month depending on age." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Obtain application form from Gram Panchayat/Municipality." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and BPL Ration Card" }] }
    ],
    faqs: [
      { question: "Can I receive both state and central pension?", answer: "Yes, you can receive both state and central pension if eligible." }
    ],
    references: [{ title: "NSAP Official Website", url: "https://nsap.gov.in" }]
  },
  {
    _id: "scheme_029",
    schemeName: "Pradhan Mantri Shram Suvidha Portal",
    schemeShortTitle: "PMSSP",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Labour and Employment" },
    tags: ["Labour", "Workers", "Registration"],
    schemeCategory: ["Labour & Employment", "Social Security"],
    detailedDescription_md: `## Pradhan Mantri Shram Suvidha Portal (PMSSP)\n\nPMSSP provides a unified portal for labour compliance and services.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- All establishments with 10+ workers (for CL&C Act)\n- All workers in organized sector`,
    benefits: [
      { type: "paragraph", children: [{ text: "Single window for labour law compliance." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit shramsuvidha.gov.in." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "PAN Card and Aadhaar of authorized signatory" }] }
    ],
    faqs: [
      { question: "What is LIN?", answer: "LIN (Labour Identification Number) is a unique 12-digit number assigned to each establishment." }
    ],
    references: [{ title: "PMSSP Official Website", url: "https://shramsuvidha.gov.in" }]
  },
  {
    _id: "scheme_030",
    schemeName: "Atal Innovation Mission",
    schemeShortTitle: "AIM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "NITI Aayog" },
    tags: ["Innovation", "Startups", "Entrepreneurship"],
    schemeCategory: ["Business & Entrepreneurship", "Education & Learning"],
    detailedDescription_md: `## Atal Innovation Mission (AIM)\n\nAIM promotes innovation and entrepreneurship across India through Atal Tinkering Labs and Atal Incubation Centres.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Schools with Classes 6-12 (for ATLs)\n- FPOs, cooperatives (for AICs)`,
    benefits: [
      { type: "paragraph", children: [{ text: "ATL: â‚¹20 lakh grant for equipment." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit aim.gov.in and select relevant program." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "School registration certificate (for ATLs)" }] }
    ],
    faqs: [
      { question: "What is the duration of ATL grant?", answer: "ATL grant is provided for 5 years." }
    ],
    references: [{ title: "AIM Official Website", url: "https://aim.gov.in" }]
  },
  {
    _id: "scheme_031",
    schemeName: "Production Linked Incentive Scheme",
    schemeShortTitle: "PLI",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Heavy Industries" },
    tags: ["Manufacturing", "Industry", "Investment"],
    schemeCategory: ["Industry & Manufacturing", "Business & Entrepreneurship"],
    detailedDescription_md: `## Production Linked Incentive (PLI) Scheme\n\nPLI provides incentives based on manufacturing output to boost domestic production.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Manufacturing companies registered in India\n- Minimum investment thresholds (varies by sector)`,
    benefits: [
      { type: "paragraph", children: [{ text: "Incentive of 4-6% on incremental sales for 5 years." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply through respective ministry's portal." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Company incorporation certificate and audited financial statements" }] }
    ],
    faqs: [
      { question: "What is PLI scheme?", answer: "PLI provides financial incentives based on incremental sales of manufactured goods." }
    ],
    references: [{ title: "DPIIT Official Website", url: "https://dpiit.gov.in" }]
  },
  {
    _id: "scheme_032",
    schemeName: "Startup India",
    schemeShortTitle: "Startup India",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Department for Promotion of Industry and Internal Trade" },
    tags: ["Startups", "Entrepreneurship", "Innovation"],
    schemeCategory: ["Business & Entrepreneurship", "Innovation"],
    detailedDescription_md: `## Startup India\n\nStartup India builds a strong ecosystem for nurturing innovation and startups with various benefits.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Incorporation within last 10 years\n- Turnover not exceeding â‚¹100 crore`,
    benefits: [
      { type: "paragraph", children: [{ text: "Tax exemption for 3 years out of 10 years of incorporation." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit startupindia.gov.in." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Certificate of Incorporation and PAN Card" }] }
    ],
    faqs: [
      { question: "What is Angel Tax exemption?", answer: "Angel Tax exemption means startups are exempt from tax on investments from angel investors up to â‚¹25 crore." }
    ],
    references: [{ title: "Startup India Official Website", url: "https://startupindia.gov.in" }]
  },
  {
    _id: "scheme_033",
    schemeName: "Digital India",
    schemeShortTitle: "Digital India",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Electronics and Information Technology" },
    tags: ["Digital", "Technology", "Internet"],
    schemeCategory: ["Technology & Digital", "Governance"],
    detailedDescription_md: `## Digital India\n\nDigital India transforms India into a digitally empowered society and knowledge economy.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- All citizens eligible for digital services`,
    benefits: [
      { type: "paragraph", children: [{ text: "Access to government services online anytime, anywhere." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "For DigiLocker: Create account at digilocker.gov.in." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and mobile number" }] }
    ],
    faqs: [
      { question: "What is DigiLocker?", answer: "DigiLocker is a digital document wallet for storing documents like driving license and PAN." }
    ],
    references: [{ title: "Digital India Official Website", url: "https://digitalindia.gov.in" }]
  },
  {
    _id: "scheme_034",
    schemeName: "PMGDISHA",
    schemeShortTitle: "PMGDISHA",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Electronics and Information Technology" },
    tags: ["Digital Literacy", "Rural", "Education"],
    schemeCategory: ["Technology & Digital", "Education & Learning"],
    detailedDescription_md: `## Pradhan Mantri Gram Digital Saksharta Abhiyan (PMGDISHA)\n\nPMGDISHA makes 6 crore rural households digitally literate.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Age: 14-60 years\n- Rural household member`,
    benefits: [
      { type: "paragraph", children: [{ text: "Free digital literacy training of 20 hours." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Visit nearest Common Service Centre (CSC)." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and mobile number" }] }
    ],
    faqs: [
      { question: "Is the training completely free?", answer: "Yes, PMGDISHA training is completely free for eligible candidates." }
    ],
    references: [{ title: "PMGDISHA Official Website", url: "https://pmgdisha.in" }]
  },
  {
    _id: "scheme_035",
    schemeName: "BharatNet",
    schemeShortTitle: "BharatNet",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Communications" },
    tags: ["Broadband", "Rural", "Internet"],
    schemeCategory: ["Infrastructure", "Technology & Digital"],
    detailedDescription_md: `## BharatNet (National Optical Fibre Network)\n\nBharatNet provides broadband connectivity to all Gram Panchayats in India.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Gram Panchayats eligible for connectivity\n- Service providers can use BharatNet infrastructure`,
    benefits: [
      { type: "paragraph", children: [{ text: "High-speed broadband connectivity to rural areas." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Gram Panchayat requests connectivity through state government." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Gram Panchayat request" }] }
    ],
    faqs: [
      { question: "How can I get BharatNet connection at home?", answer: "You need to subscribe to a service provider who uses BharatNet infrastructure." }
    ],
    references: [{ title: "BharatNet Official Website", url: "https://bharatnet.gov.in" }]
  },
  {
    _id: "scheme_036",
    schemeName: "Smart Cities Mission",
    schemeShortTitle: "SCM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Housing and Urban Affairs" },
    tags: ["Urban", "Smart Cities", "Infrastructure"],
    schemeCategory: ["Urban Development", "Infrastructure"],
    detailedDescription_md: `## Smart Cities Mission\n\nSmart Cities Mission promotes sustainable and inclusive cities with core infrastructure and quality of life.`,
    eligibilityDescription_md: `### Eligibility Criteria (for cities)\n\n- Cities selected through competitive process\n- 100 cities selected in rounds`,
    benefits: [
      { type: "paragraph", children: [{ text: "Improved urban infrastructure and services." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Cities submit proposals to Ministry of Housing and Urban Affairs." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "City proposal document" }] }
    ],
    faqs: [
      { question: "How many smart cities are selected?", answer: "100 smart cities have been selected across India." }
    ],
    references: [{ title: "Smart Cities Mission Official Website", url: "https://smartcities.gov.in" }]
  },
  {
    _id: "scheme_037",
    schemeName: "AMRUT",
    schemeShortTitle: "AMRUT",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Housing and Urban Affairs" },
    tags: ["Urban", "Water Supply", "Sewerage"],
    schemeCategory: ["Urban Development", "Infrastructure"],
    detailedDescription_md: `## Atal Mission for Rejuvenation and Urban Transformation (AMRUT)\n\nAMRUT provides basic services to households and builds amenities in cities.`,
    eligibilityDescription_md: `### Eligibility Criteria (for cities)\n\n- Cities with population of 1 lakh or more (Census 2011)`,
    benefits: [
      { type: "paragraph", children: [{ text: "Tap water supply to all households." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State governments identify cities and prepare plans." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "State Annual Action Plan" }] }
    ],
    faqs: [
      { question: "How many cities are covered under AMRUT?", answer: "AMRUT covers 500 cities with population of 1 lakh or more." }
    ],
    references: [{ title: "AMRUT Official Website", url: "https://amrut.gov.in" }]
  },
  {
    _id: "scheme_038",
    schemeName: "HRIDAY",
    schemeShortTitle: "HRIDAY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Housing and Urban Affairs" },
    tags: ["Heritage", "Urban", "Tourism"],
    schemeCategory: ["Urban Development", "Culture & Tourism"],
    detailedDescription_md: `## National Heritage City Development and Augmentation Yojana (HRIDAY)\n\nHRIDAY preserves and revitalizes heritage cities.`,
    eligibilityDescription_md: `### Eligibility Criteria (for cities)\n\n- 12 heritage cities identified by Ministry`,
    benefits: [
      { type: "paragraph", children: [{ text: "Preservation of cultural and heritage assets." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Cities identified by Ministry based on heritage significance." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Heritage City Development Plan" }] }
    ],
    faqs: [
      { question: "How many cities are covered under HRIDAY?", answer: "12 heritage cities are covered under HRIDAY." }
    ],
    references: [{ title: "HRIDAY Official Website", url: "https://hriday.nic.in" }]
  },
  {
    _id: "scheme_039",
    schemeName: "PMKKKY",
    schemeShortTitle: "PMKKKY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Mines" },
    tags: ["Mining", "Tribal Welfare", "Infrastructure"],
    schemeCategory: ["Mining & Natural Resources", "Social Welfare"],
    detailedDescription_md: `## Pradhan Mantri Khanij Kshetra Kalyan Yojana (PMKKKY)\n\nPMKKKY provides for the welfare of people and areas affected by mining related operations.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- People affected by mining operations in mining areas\n- Tribal communities in mining regions`,
    benefits: [
      { type: "paragraph", children: [{ text: "Drinking water supply facilities." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "District Mineral Foundation identifies projects." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Project proposals by DMF" }] }
    ],
    faqs: [
      { question: "How is PMKKKY funded?", answer: "PMKKKY is funded by mining lease holders who contribute to District Mineral Foundation." }
    ],
    references: [{ title: "PMKKKY Official Website", url: "https://mines.gov.in" }]
  },
  {
    _id: "scheme_040",
    schemeName: "National Livestock Mission",
    schemeShortTitle: "NLM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Livestock", "Animal Husbandry", "Dairy"],
    schemeCategory: ["Agriculture, Rural & Environment", "Animal Husbandry"],
    detailedDescription_md: `## National Livestock Mission (NLM)\n\nNLM ensures quantitative and qualitative improvement in livestock production systems.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers engaged in livestock rearing\n- Entrepreneurs in livestock sector`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for livestock entrepreneurship projects (up to 50%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply through Animal Husbandry Department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land documents" }] }
    ],
    faqs: [
      { question: "What is the subsidy rate for livestock projects?", answer: "Subsidy varies from 25% to 50% of project cost." }
    ],
    references: [{ title: "NLM Official Website", url: "https://nlm.udyamimitra.in" }]
  },
  {
    _id: "scheme_041",
    schemeName: "NPBBDD",
    schemeShortTitle: "NPBBDD",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Dairy", "Cattle Breeding", "Milk Production"],
    schemeCategory: ["Agriculture, Rural & Environment", "Animal Husbandry"],
    detailedDescription_md: `## National Programme for Bovine Breeding and Dairy Development (NPBBDD)\n\nNPBBDD enhances milk production through improved breeding and dairy development.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Dairy farmers owning cattle/buffalo\n- Milk cooperatives and producer companies`,
    benefits: [
      { type: "paragraph", children: [{ text: "Free or subsidized AI services for breeding." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Contact veterinary centre or dairy cooperative." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and cattle ownership documents" }] }
    ],
    faqs: [
      { question: "Are AI services free?", answer: "AI services are provided at nominal cost or free through government veterinary centres." }
    ],
    references: [{ title: "NPBBDD Official Website", url: "https://dahd.nic.in/schemes/programmes/national-programme-bovine-breeding-dairy-development" }]
  },
  {
    _id: "scheme_042",
    schemeName: "NPOF",
    schemeShortTitle: "NPOF",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Organic Farming", "Agriculture", "Sustainable"],
    schemeCategory: ["Agriculture, Rural & Environment", "Sustainable Development"],
    detailedDescription_md: `## National Project on Organic Farming (NPOF)\n\nNPOF promotes organic farming through financial assistance, certification, and capacity building.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers adopting or willing to adopt organic farming\n- Groups of farmers, FPOs, SHGs`,
    benefits: [
      { type: "paragraph", children: [{ text: "Financial assistance for organic farming (up to â‚¹50,000/ha)." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Contact Agriculture Department or Krishi Vigyan Kendra." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "How long does it take to get organic certification?", answer: "It takes 2-3 years of organic farming practices before land can be certified." }
    ],
    references: [{ title: "NPOF Official Website", url: "https://pgsindia-ncof.gov.in" }]
  },
  {
    _id: "scheme_043",
    schemeName: "Soil Health Card Scheme",
    schemeShortTitle: "SHC",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Soil Health", "Agriculture", "Farmers"],
    schemeCategory: ["Agriculture, Rural & Environment"],
    detailedDescription_md: `## Soil Health Card Scheme\n\nSoil Health Card Scheme provides soil health cards to farmers to assess soil health and recommend fertilizers.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- All farmers eligible for Soil Health Card\n- Landholding farmers (any size of holding)`,
    benefits: [
      { type: "paragraph", children: [{ text: "Free soil testing and Soil Health Card." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Contact Agriculture Department or Soil Testing Laboratory." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "How often should I get my soil tested?", answer: "Soil should be tested every 2-3 years to monitor changes in soil health." }
    ],
    references: [{ title: "SHC Official Website", url: "https://soilhealth.dac.gov.in" }]
  },
  {
    _id: "scheme_044",
    schemeName: "PMKSY",
    schemeShortTitle: "PMKSY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Irrigation", "Agriculture", "Water Management"],
    schemeCategory: ["Agriculture, Rural & Environment", "Infrastructure"],
    detailedDescription_md: `## Pradhan Mantri Krishi Sinchai Yojana (PMKSY)\n\nPMKSY enhances irrigation coverage and improves water use efficiency to provide water to every field.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers with irrigable land\n- Farmers wanting to adopt micro irrigation`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for micro irrigation (up to 55% for general, 90% for SC/ST)." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply through Agriculture Department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "What is the subsidy rate for micro irrigation?", answer: "Subsidy is 55% for general category and up to 90% for SC/ST farmers." }
    ],
    references: [{ title: "PMKSY Official Website", url: "https://pmksy.gov.in" }]
  },
  {
    _id: "scheme_045",
    schemeName: "PKVY",
    schemeShortTitle: "PKVY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Organic Farming", "Agriculture", "Traditional"],
    schemeCategory: ["Agriculture, Rural & Environment", "Sustainable Development"],
    detailedDescription_md: `## Paramparagat Krishi Vikas Yojana (PKVY)\n\nPKVY promotes organic farming through cluster approach with financial assistance.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Groups of farmers forming organic clusters (20-50 hectares)\n- Farmers willing to adopt organic farming`,
    benefits: [
      { type: "paragraph", children: [{ text: "Financial assistance of â‚¹50,000/hectare over 3 years." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Form farmer group/cluster (20-50 hectares)." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "What is the minimum cluster size?", answer: "The minimum cluster size is 20 hectares." }
    ],
    references: [{ title: "PKVY Official Website", url: "https://pgsindia-ncof.gov.in/pkvy/Index.aspx" }]
  },
  {
    _id: "scheme_046",
    schemeName: "NFSM",
    schemeShortTitle: "NFSM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Food Security", "Agriculture", "Crop Production"],
    schemeCategory: ["Agriculture, Rural & Environment", "Food Security"],
    detailedDescription_md: `## National Food Security Mission (NFSM)\n\nNFSM increases production of rice, wheat, pulses, and coarse cereals through area expansion and productivity enhancement.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers growing NFSM crops\n- State governments for crop production programs`,
    benefits: [
      { type: "paragraph", children: [{ text: "Free or subsidized quality seeds." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Contact Agriculture Department or Krishi Vigyan Kendra." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "Which crops are covered under NFSM?", answer: "NFSM covers rice, wheat, pulses, coarse cereals, and nutri-cereals." }
    ],
    references: [{ title: "NFSM Official Website", url: "https://nfsm.gov.in" }]
  },
  {
    _id: "scheme_047",
    schemeName: "MIDH",
    schemeShortTitle: "MIDH",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Horticulture", "Fruits", "Vegetables"],
    schemeCategory: ["Agriculture, Rural & Environment"],
    detailedDescription_md: `## Mission for Integrated Development of Horticulture (MIDH)\n\nMIDH promotes holistic growth of horticulture covering fruits, vegetables, spices, flowers, etc.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers engaged in horticulture\n- Entrepreneurs for horticulture processing`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for horticulture plantation (up to 50%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Contact Horticulture Department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "What is the subsidy rate for horticulture?", answer: "Subsidy varies from 40% to 50% depending on category." }
    ],
    references: [{ title: "MIDH Official Website", url: "https://nhb.gov.in" }]
  },
  {
    _id: "scheme_048",
    schemeName: "NMSA",
    schemeShortTitle: "NMSA",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Sustainable Agriculture", "Climate Change"],
    schemeCategory: ["Agriculture, Rural & Environment", "Sustainable Development"],
    detailedDescription_md: `## National Mission on Sustainable Agriculture (NMSA)\n\nNMSA makes agriculture sustainable, resilient to climate change, and resource-efficient.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers adopting sustainable agriculture practices\n- State governments for climate-resilient agriculture`,
    benefits: [
      { type: "paragraph", children: [{ text: "Support for climate-resilient crop varieties." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Contact Agriculture Department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "What is climate-resilient agriculture?", answer: "Climate-resilient agriculture involves farming practices that help crops withstand climate variations." }
    ],
    references: [{ title: "NMSA Official Website", url: "https://nmsa.dac.gov.in" }]
  },
  {
    _id: "scheme_049",
    schemeName: "e-NAM",
    schemeShortTitle: "e-NAM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Agriculture Marketing", "Farmers", "E-Market"],
    schemeCategory: ["Agriculture, Rural & Environment", "Technology & Digital"],
    detailedDescription_md: `## e-NAM (National Agriculture Market)\n\ne-NAM creates a unified national market for agricultural commodities through online trading.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers can sell produce through e-NAM\n- Traders and commission agents can register`,
    benefits: [
      { type: "paragraph", children: [{ text: "Better price realization for farmers." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit enam.gov.in." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and PAN Card (for traders)" }] }
    ],
    faqs: [
      { question: "Can individual farmers directly trade on e-NAM?", answer: "Farmers trade through local e-NAM-enabled mandis." }
    ],
    references: [{ title: "e-NAM Official Website", url: "https://enam.gov.in" }]
  },
  {
    _id: "scheme_050",
    schemeName: "PM-AASHA",
    schemeShortTitle: "PM-AASHA",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Price Support", "Farmers", "MSP"],
    schemeCategory: ["Agriculture, Rural & Environment", "Financial Assistance"],
    detailedDescription_md: `## Pradhan Mantri Annadata Aay SanraksHan Abhiyan (PM-AASHA)\n\nPM-AASHA ensures remunerative prices to farmers for their produce through price support.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers growing notified crops (pulses, oilseeds, copra)\n- Farmers registered with state agriculture department`,
    benefits: [
      { type: "paragraph", children: [{ text: "Price support at MSP for pulses and oilseeds." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Register with state agriculture department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "Which crops are covered under PM-AASHA?", answer: "PM-AASHA covers pulses, oilseeds, and copra." }
    ],
    references: [{ title: "PM-AASHA Official Website", url: "https://agricoop.nic.in/en/PMAASHAScheme" }]
  },
  {
    _id: "scheme_051",
    schemeName: "RKVY",
    schemeShortTitle: "RKVY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Agriculture", "Infrastructure", "Investment"],
    schemeCategory: ["Agriculture, Rural & Environment", "Infrastructure"],
    detailedDescription_md: `## Rashtriya Krishi Vikas Yojana (RKVY)\n\nRKVY incentivizes states to increase investment in agriculture with state flexibility.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- State governments eligible for funding\n- Farmers benefit through state projects`,
    benefits: [
      { type: "paragraph", children: [{ text: "Infrastructure development for agriculture." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State governments prepare project proposals." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "State project proposals" }] }
    ],
    faqs: [
      { question: "Can individuals apply for RKVY?", answer: "RKVY is implemented through state governments." }
    ],
    references: [{ title: "RKVY Official Website", url: "https://rkvy.nic.in" }]
  },
  {
    _id: "scheme_052",
    schemeName: "NMAET",
    schemeShortTitle: "NMAET",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Agriculture Extension", "Technology"],
    schemeCategory: ["Agriculture, Rural & Environment", "Education & Learning"],
    detailedDescription_md: `## National Mission on Agricultural Extension and Technology (NMAET)\n\nNMAET strengthens agricultural extension services to disseminate information and technology to farmers.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers eligible for extension services\n- State governments for extension programs`,
    benefits: [
      { type: "paragraph", children: [{ text: "Free training and capacity building programs." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Contact Krishi Vigyan Kendra or Agriculture Department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land documents" }] }
    ],
    faqs: [
      { question: "What are Krishi Vigyan Kendras?", answer: "KVKs are agricultural extension centers that provide training and advisory services." }
    ],
    references: [{ title: "NMAET Official Website", url: "https://agricoop.nic.in" }]
  },
  {
    _id: "scheme_053",
    schemeName: "NMMI",
    schemeShortTitle: "NMMI",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Micro Irrigation", "Drip Irrigation"],
    schemeCategory: ["Agriculture, Rural & Environment", "Infrastructure"],
    detailedDescription_md: `## National Mission on Micro Irrigation (NMMI)\n\nNMMI promotes micro irrigation (drip and sprinkler) for efficient water use in agriculture.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers with irrigable land\n- All categories of farmers eligible`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for drip and sprinkler systems (up to 55-90%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply through Agriculture Department or Micro Irrigation Centre." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "What is the subsidy rate for micro irrigation?", answer: "Subsidy is 55% for general category, 90% for SC/ST and farmers in North-East." }
    ],
    references: [{ title: "NMMI Official Website", url: "https://pmksy.gov.in" }]
  },
  {
    _id: "scheme_054",
    schemeName: "NSWF",
    schemeShortTitle: "NSWF",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Fisheries, Animal Husbandry and Dairying" },
    tags: ["Fisheries", "Fishermen", "Aquaculture"],
    schemeCategory: ["Agriculture, Rural & Environment", "Animal Husbandry"],
    detailedDescription_md: `## National Scheme of Welfare of Fishermen\n\nThis scheme provides welfare measures for fishermen and their families including financial assistance.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Active fishermen engaged in fishing\n- Fishermen families for housing`,
    benefits: [
      { type: "paragraph", children: [{ text: "Housing assistance up to â‚¹1.5 lakh." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply through Fisheries Department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and fishermen registration certificate" }] }
    ],
    faqs: [
      { question: "What is the housing assistance amount?", answer: "Housing assistance is up to â‚¹1.5 lakh for construction of house." }
    ],
    references: [{ title: "Fisheries Department Official Website", url: "https://dahd.nic.in/schemes/programmes/national-sheep-wool-development-scheme" }]
  },
  {
    _id: "scheme_055",
    schemeName: "PMMSY",
    schemeShortTitle: "PMMSY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Fisheries, Animal Husbandry and Dairying" },
    tags: ["Fisheries", "Aquaculture", "Blue Revolution"],
    schemeCategory: ["Agriculture, Rural & Environment", "Animal Husbandry"],
    detailedDescription_md: `## Pradhan Mantri Matsya Sampada Yojana (PMMSY)\n\nPMMSY brings about Blue Revolution through sustainable development of fisheries sector.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Fishermen, fish farmers, and entrepreneurs eligible\n- FPOs, cooperatives, and SHGs can apply`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for aquaculture (up to 60%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit PMMSY portal or Fisheries Department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and PAN Card (for entrepreneurs)" }] }
    ],
    faqs: [
      { question: "What is the subsidy rate under PMMSY?", answer: "Subsidy varies from 40% to 60% depending on category." }
    ],
    references: [{ title: "PMMSY Official Website", url: "https://pmsy.gov.in" }]
  },
  {
    _id: "scheme_056",
    schemeName: "NADCP",
    schemeShortTitle: "NADCP",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Fisheries, Animal Husbandry and Dairying" },
    tags: ["Animal Health", "Disease Control"],
    schemeCategory: ["Agriculture, Rural & Environment", "Animal Husbandry"],
    detailedDescription_md: `## National Animal Disease Control Programme (NADCP)\n\nNADCP controls and eradicates animal diseases like FMD and Brucellosis in livestock.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- All livestock owners eligible for free vaccination\n- State governments for disease control programs`,
    benefits: [
      { type: "paragraph", children: [{ text: "Free vaccination of cattle and buffalo against FMD and Brucellosis." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Vaccination teams visit villages." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and livestock ownership documents" }] }
    ],
    faqs: [
      { question: "Is vaccination completely free?", answer: "Yes, vaccination under NADCP is completely free for all livestock owners." }
    ],
    references: [{ title: "NADCP Official Website", url: "https://dahd.nic.in/schemes/programmes/national-animal-disease-control-programme" }]
  },
  {
    _id: "scheme_057",
    schemeName: "DEDS",
    schemeShortTitle: "DEDS",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Fisheries, Animal Husbandry and Dairying" },
    tags: ["Dairy", "Entrepreneurship", "Milk Processing"],
    schemeCategory: ["Agriculture, Rural & Environment", "Animal Husbandry"],
    detailedDescription_md: `## Dairy Entrepreneurship Development Scheme (DEDS)\n\nDEDS generates self-employment opportunities in the dairy sector by supporting dairy entrepreneurship projects.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Individuals, companies, cooperatives, FPOs eligible\n- Age: 18 years and above`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for dairy projects (25-50%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply through NABARD or bank." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card, PAN Card, and project report" }] }
    ],
    faqs: [
      { question: "What is the subsidy rate under DEDS?", answer: "Subsidy varies from 25% to 50% depending on category." }
    ],
    references: [{ title: "DEDS Official Website", url: "https://dahd.nic.in/schemes/programmes/dairy-entrepreneurship-development-scheme" }]
  },
  {
    _id: "scheme_058",
    schemeName: "NPDD",
    schemeShortTitle: "NPDD",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Fisheries, Animal Husbandry and Dairying" },
    tags: ["Dairy", "Milk Production", "Cooperatives"],
    schemeCategory: ["Agriculture, Rural & Environment", "Animal Husbandry"],
    detailedDescription_md: `## National Programme for Dairy Development (NPDD)\n\nNPDD strengthens the dairy sector through infrastructure development, quality enhancement, and producer organization.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- State dairy federations and milk unions eligible\n- Dairy cooperatives and producer companies`,
    benefits: [
      { type: "paragraph", children: [{ text: "Dairy processing infrastructure support." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State dairy federations submit proposals." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Project proposal and detailed project report" }] }
    ],
    faqs: [
      { question: "Can individual farmers apply for NPDD?", answer: "NPDD is implemented through dairy cooperatives and federations." }
    ],
    references: [{ title: "NPDD Official Website", url: "https://dahd.nic.in/schemes/programmes/national-programme-dairy-development" }]
  },
  {
    _id: "scheme_059",
    schemeName: "LHDC",
    schemeShortTitle: "LHDC",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Fisheries, Animal Husbandry and Dairying" },
    tags: ["Animal Health", "Disease Control"],
    schemeCategory: ["Agriculture, Rural & Environment", "Animal Husbandry"],
    detailedDescription_md: `## Livestock Health and Disease Control (LHDC)\n\nLHDC prevents, controls, and contains animal diseases through vaccination, surveillance, and diagnostic services.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- All livestock owners eligible for services\n- State governments for disease control programs`,
    benefits: [
      { type: "paragraph", children: [{ text: "Free or subsidized vaccination services." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Contact veterinary hospital or dispensary." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and livestock ownership documents" }] }
    ],
    faqs: [
      { question: "Are veterinary services free?", answer: "Most veterinary services are provided free or at nominal cost at government hospitals." }
    ],
    references: [{ title: "LHDC Official Website", url: "https://dahd.nic.in" }]
  },
  {
    _id: "scheme_060",
    schemeName: "NLM-Poultry",
    schemeShortTitle: "NLM-Poultry",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Fisheries, Animal Husbandry and Dairying" },
    tags: ["Poultry", "Chicken", "Eggs"],
    schemeCategory: ["Agriculture, Rural & Environment", "Animal Husbandry"],
    detailedDescription_md: `## National Livestock Mission - Poultry\n\nThis component of NLM focuses on poultry development to increase egg and poultry meat production.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers, entrepreneurs, FPOs, SHGs eligible\n- No income criteria for farmers`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for poultry farms (up to 50%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply through Animal Husbandry Department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "What is the subsidy rate for poultry farms?", answer: "Subsidy varies from 25% to 50% depending on category." }
    ],
    references: [{ title: "NLM Official Website", url: "https://dahd.nic.in/schemes/programmes/national-livestock-mission" }]
  },
  {
    _id: "scheme_061",
    schemeName: "National Bamboo Mission",
    schemeShortTitle: "NBM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Bamboo", "Plantation", "Industry"],
    schemeCategory: ["Agriculture, Rural & Environment", "Industry & Manufacturing"],
    detailedDescription_md: `## National Bamboo Mission (NBM)\n\nNBM promotes bamboo cultivation and industry development.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers, entrepreneurs, FPOs, SHGs eligible`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for bamboo plantation (up to 50%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply through Agriculture or Forest Department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "What is the subsidy rate for bamboo plantation?", answer: "Subsidy varies from 50% to 100% depending on category." }
    ],
    references: [{ title: "NBM Official Website", url: "https://nhb.gov.in" }]
  },
  {
    _id: "scheme_062",
    schemeName: "National Beekeeping and Honey Mission",
    schemeShortTitle: "NBHM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Beekeeping", "Honey", "Pollination"],
    schemeCategory: ["Agriculture, Rural & Environment", "Animal Husbandry"],
    detailedDescription_md: `## National Beekeeping and Honey Mission (NBHM)\n\nNBHM promotes beekeeping and honey production.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers, entrepreneurs, FPOs, SHGs eligible`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for bee colonies and equipment (up to 50%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply through Agriculture or Horticulture Department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and project report" }] }
    ],
    faqs: [
      { question: "Do I need land for beekeeping?", answer: "No, beekeeping does not require land." }
    ],
    references: [{ title: "NBHM Official Website", url: "https://nhb.gov.in" }]
  },
  {
    _id: "scheme_063",
    schemeName: "Saffron Mission",
    schemeShortTitle: "Saffron Mission",
    state: "Jammu and Kashmir",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Saffron", "Kashmir", "Spices"],
    schemeCategory: ["Agriculture, Rural & Environment"],
    detailedDescription_md: `## Saffron Mission\n\nSaffron Mission revives saffron production in Jammu and Kashmir.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Saffron farmers in Jammu and Kashmir`,
    benefits: [
      { type: "paragraph", children: [{ text: "Irrigation infrastructure for saffron fields." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply through Agriculture Department, J&K." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "Who is eligible for Saffron Mission?", answer: "Saffron farmers in Jammu and Kashmir are eligible." }
    ],
    references: [{ title: "Saffron Mission Official Website", url: "https://agricoop.nic.in" }]
  },
  {
    _id: "scheme_064",
    schemeName: "National Mission on Oilseeds and Oil Palm",
    schemeShortTitle: "NMOOP",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Oilseeds", "Oil Palm", "Edible Oil"],
    schemeCategory: ["Agriculture, Rural & Environment"],
    detailedDescription_md: `## National Mission on Oilseeds and Oil Palm (NMOOP)\n\nNMOOP increases domestic production of oilseeds and oil palm.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers growing oilseeds and oil palm`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for oilseed cultivation (up to 50%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply through Agriculture Department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "What is the subsidy rate for oil palm?", answer: "Subsidy varies from 50% to 85% depending on category." }
    ],
    references: [{ title: "NMOOP Official Website", url: "https://agricoop.nic.in" }]
  },
  {
    _id: "scheme_065",
    schemeName: "National Mission on Protein Supplements",
    schemeShortTitle: "NMPS",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Protein", "Pulses", "Oilseeds"],
    schemeCategory: ["Agriculture, Rural & Environment", "Food Security"],
    detailedDescription_md: `## National Mission on Protein Supplements (NMPS)\n\nNMPS increases production of protein-rich crops like pulses and oilseeds.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers growing pulses and oilseeds`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for pulse cultivation (up to 50%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply through Agriculture Department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "Which pulses are covered under NMPS?", answer: "NMPS covers major pulses like chickpea, pigeon pea, lentil, mung bean, urd bean." }
    ],
    references: [{ title: "NMPS Official Website", url: "https://agricoop.nic.in" }]
  },
  {
    _id: "scheme_066",
    schemeName: "National Mission on Agricultural Mechanization",
    schemeShortTitle: "NMAM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Agriculture and Farmers Welfare" },
    tags: ["Farm Mechanization", "Machinery"],
    schemeCategory: ["Agriculture, Rural & Environment", "Technology & Digital"],
    detailedDescription_md: `## National Mission on Agricultural Mechanization (NMAM)\n\nNMAM promotes agricultural mechanization to increase productivity.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers, entrepreneurs, FPOs, SHGs eligible`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for farm machinery (up to 50%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply through Agriculture Department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land ownership documents" }] }
    ],
    faqs: [
      { question: "What is the subsidy rate for farm machinery?", answer: "Subsidy varies from 40% to 50% depending on category." }
    ],
    references: [{ title: "NMAM Official Website", url: "https://agricoop.nic.in" }]
  },
  {
    _id: "scheme_067",
    schemeName: "National Mission on Food Processing",
    schemeShortTitle: "NMFP",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Food Processing Industries" },
    tags: ["Food Processing", "Industry"],
    schemeCategory: ["Industry & Manufacturing", "Agriculture, Rural & Environment"],
    detailedDescription_md: `## National Mission on Food Processing (NMFP)\n\nNMFP promotes food processing industries to reduce post-harvest losses.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Entrepreneurs, companies, FPOs, cooperatives eligible`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for food processing units (up to 35%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply through Ministry of Food Processing Industries portal." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "PAN Card and company registration documents" }] }
    ],
    faqs: [
      { question: "What is the subsidy rate for food processing units?", answer: "Subsidy varies from 35% to 50% depending on category." }
    ],
    references: [{ title: "NMFP Official Website", url: "https://mofpi.gov.in" }]
  },
  {
    _id: "scheme_068",
    schemeName: "PMFPE",
    schemeShortTitle: "PMFPE",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Food Processing Industries" },
    tags: ["Food Processing", "Micro Enterprises"],
    schemeCategory: ["Industry & Manufacturing", "Business & Entrepreneurship"],
    detailedDescription_md: `## Pradhan Mantri Micro Food Processing Enterprises Scheme (PMFPE)\n\nPMFPE supports micro food processing enterprises.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Individual micro-enterprises, SHGs, FPOs eligible\n- Investment: Up to â‚¹10 lakh for individuals, up to â‚¹50 lakh for groups`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy of 35% for individuals (up to â‚¹10 lakh)." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply through Ministry of Food Processing Industries portal." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and PAN Card (for formal entities)" }] }
    ],
    faqs: [
      { question: "What is the maximum subsidy under PMFPE?", answer: "Maximum subsidy is â‚¹10 lakh for individuals and â‚¹50 lakh for SHGs and FPOs." }
    ],
    references: [{ title: "PMFPE Official Website", url: "https://mofpi.gov.in" }]
  },
  {
    _id: "scheme_069",
    schemeName: "Operation Greens",
    schemeShortTitle: "Operation Greens",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Food Processing Industries" },
    tags: ["Vegetables", "Tomato", "Onion"],
    schemeCategory: ["Agriculture, Rural & Environment", "Food Security"],
    detailedDescription_md: `## Operation Greens\n\nOperation Greens stabilizes prices of tomato, onion, and potato.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers, FPOs, cooperatives, aggregators eligible`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for storage and processing infrastructure (up to 50%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply through NAFED or Ministry portal." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and PAN Card (for formal entities)" }] }
    ],
    faqs: [
      { question: "Which crops are covered under Operation Greens?", answer: "Operation Greens currently covers tomato, onion, and potato." }
    ],
    references: [{ title: "Operation Greens Official Website", url: "https://mofpi.gov.in" }]
  },
  {
    _id: "scheme_070",
    schemeName: "Agri-Logistics",
    schemeShortTitle: "Agri-Logistics",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Food Processing Industries" },
    tags: ["Logistics", "Cold Chain"],
    schemeCategory: ["Infrastructure", "Agriculture, Rural & Environment"],
    detailedDescription_md: `## Scheme for Creation of Infrastructure for Agri-Logistics\n\nThis scheme creates infrastructure for agri-logistics including cold chain.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Entrepreneurs, companies, FPOs, cooperatives eligible`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for cold chain infrastructure (up to 35%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply through Ministry of Food Processing Industries portal." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "PAN Card and company registration documents" }] }
    ],
    faqs: [
      { question: "What is the subsidy rate for cold chain?", answer: "Subsidy varies from 35% to 50% depending on category." }
    ],
    references: [{ title: "MOFPI Official Website", url: "https://mofpi.gov.in" }]
  },
  {
    _id: "scheme_071",
    schemeName: "NPOP",
    schemeShortTitle: "NPOP",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Organic", "Certification", "Exports"],
    schemeCategory: ["Agriculture, Rural & Environment", "International Trade"],
    detailedDescription_md: `## National Programme for Organic Production (NPOP)\n\nNPOP promotes organic production and certification for exports.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers, processors, traders eligible for certification`,
    benefits: [
      { type: "paragraph", children: [{ text: "Nationally recognized organic certification." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply through accredited certification agency." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Land ownership documents and organic production plan" }] }
    ],
    faqs: [
      { question: "How long does organic certification take?", answer: "It takes 2-3 years of organic farming practices before land can be certified." }
    ],
    references: [{ title: "NPOP Official Website", url: "https://apeda.gov.in" }]
  },
  {
    _id: "scheme_072",
    schemeName: "APEDA",
    schemeShortTitle: "APEDA",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Exports", "Agriculture"],
    schemeCategory: ["International Trade", "Agriculture, Rural & Environment"],
    detailedDescription_md: `## Agricultural and Processed Food Products Export Development Authority (APEDA)\n\nAPEDA promotes exports of agricultural and processed food products.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Exporters of agricultural and processed food products`,
    benefits: [
      { type: "paragraph", children: [{ text: "Export registration and certification." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Register with APEDA online." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Company registration certificate and IEC" }] }
    ],
    faqs: [
      { question: "Is APEDA registration mandatory for exports?", answer: "Yes, APEDA registration is mandatory for exporting scheduled agricultural products." }
    ],
    references: [{ title: "APEDA Official Website", url: "https://apeda.gov.in" }]
  },
  {
    _id: "scheme_073",
    schemeName: "MPEDA",
    schemeShortTitle: "MPEDA",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Exports", "Fisheries"],
    schemeCategory: ["International Trade", "Agriculture, Rural & Environment"],
    detailedDescription_md: `## Marine Products Export Development Authority (MPEDA)\n\nMPEDA promotes exports of marine products from India.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Exporters of marine products`,
    benefits: [
      { type: "paragraph", children: [{ text: "Export registration and certification." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Register with MPEDA online." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Company registration certificate and IEC" }] }
    ],
    faqs: [
      { question: "Is MPEDA registration mandatory for seafood exports?", answer: "Yes, MPEDA registration is mandatory for exporting marine products." }
    ],
    references: [{ title: "MPEDA Official Website", url: "https://mpeda.gov.in" }]
  },
  {
    _id: "scheme_074",
    schemeName: "TIES",
    schemeShortTitle: "TIES",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Exports", "Infrastructure"],
    schemeCategory: ["International Trade", "Infrastructure"],
    detailedDescription_md: `## Trade Infrastructure for Export Scheme (TIES)\n\nTIES develops infrastructure for exports including ports and customs.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- State governments, port trusts, customs authorities eligible`,
    benefits: [
      { type: "paragraph", children: [{ text: "Financial assistance for export infrastructure." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State agencies submit infrastructure proposals." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Project proposal and detailed project report" }] }
    ],
    faqs: [
      { question: "Who can apply for TIES?", answer: "State governments, port trusts, customs authorities can submit infrastructure proposals." }
    ],
    references: [{ title: "TIES Official Website", url: "https://commerce.gov.in/trade-infrastructure-for-export-scheme" }]
  },
  {
    _id: "scheme_075",
    schemeName: "SEIS",
    schemeShortTitle: "SEIS",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Exports", "Services"],
    schemeCategory: ["International Trade", "Business & Entrepreneurship"],
    detailedDescription_md: `## Service Export from India Scheme (SEIS)\n\nSEIS promotes service exports by providing incentives to service exporters.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Service exporters with minimum export of â‚¹10 lakh`,
    benefits: [
      { type: "paragraph", children: [{ text: "Duty credit scrips at 3-5% of export value." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Register with DGFT and obtain IEC." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "IEC and company registration certificate" }] }
    ],
    faqs: [
      { question: "What is the incentive rate under SEIS?", answer: "SEIS provides duty credit scrips at 3-5% of export value." }
    ],
    references: [{ title: "SEIS Official Website", url: "https://dgft.gov.in" }]
  },
  {
    _id: "scheme_076",
    schemeName: "MEIS",
    schemeShortTitle: "MEIS",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Exports", "Merchandise"],
    schemeCategory: ["International Trade", "Industry & Manufacturing"],
    detailedDescription_md: `## Merchandise Exports from India Scheme (MEIS)\n\nMEIS promotes merchandise exports by providing incentives. Replaced by RoDTEP.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Exporters of merchandise goods`,
    benefits: [
      { type: "paragraph", children: [{ text: "Duty credit scrips at 2-5% of export value." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Register with DGFT and obtain IEC." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "IEC and company registration certificate" }] }
    ],
    faqs: [
      { question: "Is MEIS still active?", answer: "MEIS has been replaced by RoDTEP scheme from January 2021." }
    ],
    references: [{ title: "DGFT Official Website", url: "https://dgft.gov.in" }]
  },
  {
    _id: "scheme_077",
    schemeName: "RoDTEP",
    schemeShortTitle: "RoDTEP",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Exports", "Duties", "Taxes"],
    schemeCategory: ["International Trade", "Business & Entrepreneurship"],
    detailedDescription_md: `## Remission of Duties and Taxes on Exported Products (RoDTEP)\n\nRoDTEP provides for remission of duties and taxes on exported products.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Exporters of goods and services`,
    benefits: [
      { type: "paragraph", children: [{ text: "Remission of duties and taxes on exports." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Register with DGFT and obtain IEC." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "IEC and company registration certificate" }] }
    ],
    faqs: [
      { question: "What is RoDTEP?", answer: "RoDTEP is a WTO-compliant scheme for remission of duties and taxes on exported products." }
    ],
    references: [{ title: "RoDTEP Official Website", url: "https://dgft.gov.in" }]
  },
  {
    _id: "scheme_078",
    schemeName: "IES",
    schemeShortTitle: "IES",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Exports", "Interest Subsidy"],
    schemeCategory: ["International Trade", "Banking & Financial Services"],
    detailedDescription_md: `## Interest Equalization Scheme (IES)\n\nIES provides interest subsidy on pre- and post-shipment rupee export credit.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- MSME exporters with export turnover up to â‚¹50 crore`,
    benefits: [
      { type: "paragraph", children: [{ text: "Interest subsidy at 3-5% on export credit." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Register with DGFT and obtain IEC." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "IEC and MSME registration certificate" }] }
    ],
    faqs: [
      { question: "What is the interest subsidy rate under IES?", answer: "Interest subsidy is 3% for MSME exporters and 5% for specified sectors." }
    ],
    references: [{ title: "IES Official Website", url: "https://dgft.gov.in" }]
  },
  {
    _id: "scheme_079",
    schemeName: "NRVY",
    schemeShortTitle: "NRVY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Exports", "Finance", "Credit"],
    schemeCategory: ["International Trade", "Banking & Financial Services"],
    detailedDescription_md: `## Niryat Rin Vikas Yojana (NRVY)\n\nNRVY provides affordable credit to exporters to address liquidity needs.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Exporters with export track record`,
    benefits: [
      { type: "paragraph", children: [{ text: "Affordable export credit at lower interest rates." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Register with DGFT and obtain IEC." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "IEC and export documents" }] }
    ],
    faqs: [
      { question: "What is NRVY?", answer: "NRVY is a scheme to provide affordable credit to exporters." }
    ],
    references: [{ title: "NRVY Official Website", url: "https://dgft.gov.in" }]
  },
  {
    _id: "scheme_080",
    schemeName: "DEH",
    schemeShortTitle: "DEH",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Exports", "Districts"],
    schemeCategory: ["International Trade", "Rural Development"],
    detailedDescription_md: `## Districts as Export Hubs (DEH)\n\nDEH promotes exports from districts by identifying products with export potential.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Districts identified as export hubs\n- Local manufacturers and producers`,
    benefits: [
      { type: "paragraph", children: [{ text: "Identification of export potential products." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "District administration identifies export potential products." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "District export plan and product identification report" }] }
    ],
    faqs: [
      { question: "What is Districts as Export Hubs?", answer: "DEH identifies export potential products in each district and creates infrastructure." }
    ],
    references: [{ title: "DEH Official Website", url: "https://commerce.gov.in" }]
  },
  {
    _id: "scheme_081",
    schemeName: "EPCG",
    schemeShortTitle: "EPCG",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Exports", "Capital Goods"],
    schemeCategory: ["International Trade", "Industry & Manufacturing"],
    detailedDescription_md: `## Export Promotion Capital Goods Scheme (EPCG)\n\nEPCG allows exporters to import capital goods at zero duty for export production.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Exporters with export obligation\n- Manufacturers for export production`,
    benefits: [
      { type: "paragraph", children: [{ text: "Zero duty import of capital goods." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Register with DGFT and obtain IEC." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "IEC and capital goods details" }] }
    ],
    faqs: [
      { question: "What is the export obligation under EPCG?", answer: "Export obligation is 6 times of duty saved, to be fulfilled over 6 years." }
    ],
    references: [{ title: "EPCG Official Website", url: "https://dgft.gov.in" }]
  },
  {
    _id: "scheme_082",
    schemeName: "AAS",
    schemeShortTitle: "AAS",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Exports", "Inputs"],
    schemeCategory: ["International Trade", "Industry & Manufacturing"],
    detailedDescription_md: `## Advance Authorization Scheme (AAS)\n\nAAS allows exporters to import inputs required for export production at zero duty.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Exporters with export obligation\n- Manufacturers for export production`,
    benefits: [
      { type: "paragraph", children: [{ text: "Zero duty import of inputs for export production." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Register with DGFT and obtain IEC." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "IEC and input requirements" }] }
    ],
    faqs: [
      { question: "What is the export obligation under AAS?", answer: "Export obligation is equivalent to the duty saved on imported inputs." }
    ],
    references: [{ title: "AAS Official Website", url: "https://dgft.gov.in" }]
  },
  {
    _id: "scheme_083",
    schemeName: "EOU",
    schemeShortTitle: "EOU",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Exports", "Manufacturing"],
    schemeCategory: ["International Trade", "Industry & Manufacturing"],
    detailedDescription_md: `## Export Oriented Units (EOU) Scheme\n\nEOU scheme allows units to set up manufacturing for exports with duty exemptions.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Manufacturing units for export production\n- Minimum export obligation: 75% of production`,
    benefits: [
      { type: "paragraph", children: [{ text: "Duty-free import of capital goods and inputs." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply to Development Commissioner for EOU status." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Company registration certificate and project report" }] }
    ],
    faqs: [
      { question: "What is the export obligation for EOUs?", answer: "EOUs must export at least 75% of their production." }
    ],
    references: [{ title: "EOU Official Website", url: "https://dgft.gov.in" }]
  },
  {
    _id: "scheme_084",
    schemeName: "SEZ",
    schemeShortTitle: "SEZ",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Exports", "Manufacturing"],
    schemeCategory: ["International Trade", "Industry & Manufacturing"],
    detailedDescription_md: `## Special Economic Zones (SEZ)\n\nSEZ policy provides duty-free enclaves with world-class infrastructure for exports.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Companies setting up units in SEZ\n- Export-oriented units (100% export obligation)`,
    benefits: [
      { type: "paragraph", children: [{ text: "Duty-free import of capital goods and inputs." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply to SEZ Development Commissioner for unit approval." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Company registration certificate and project report" }] }
    ],
    faqs: [
      { question: "What is the tax benefit for SEZ units?", answer: "SEZ units get 100% tax exemption for first 5 years and 50% for next 5 years." }
    ],
    references: [{ title: "SEZ Official Website", url: "https://sezindia.nic.in" }]
  },
  {
    _id: "scheme_085",
    schemeName: "FTP",
    schemeShortTitle: "FTP",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Exports", "Imports", "Trade Policy"],
    schemeCategory: ["International Trade", "Governance"],
    detailedDescription_md: `## Foreign Trade Policy (FTP)\n\nFTP provides framework for India's exports and imports to increase share in global trade.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Exporters and importers registered with DGFT`,
    benefits: [
      { type: "paragraph", children: [{ text: "Export incentives through various schemes." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Register with DGFT and obtain IEC." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "IEC, PAN Card, and bank details" }] }
    ],
    faqs: [
      { question: "What is IEC?", answer: "IEC (Import Export Code) is a 10-digit code required for any export or import from India." }
    ],
    references: [{ title: "FTP Official Website", url: "https://dgft.gov.in" }]
  },
  {
    _id: "scheme_086",
    schemeName: "Make in India",
    schemeShortTitle: "Make in India",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Manufacturing", "Investment"],
    schemeCategory: ["Industry & Manufacturing", "Business & Entrepreneurship"],
    detailedDescription_md: `## Make in India\n\nMake in India promotes manufacturing in India and attracts foreign investment.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Indian and foreign companies investing in manufacturing`,
    benefits: [
      { type: "paragraph", children: [{ text: "Liberal FDI policy across sectors." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Register company and obtain necessary approvals." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Company registration certificate and project report" }] }
    ],
    faqs: [
      { question: "What are the focus sectors under Make in India?", answer: "Make in India focuses on 25 sectors including automobiles, aviation, defense, electronics." }
    ],
    references: [{ title: "Make in India Official Website", url: "https://makeinindia.gov.in" }]
  },
  {
    _id: "scheme_087",
    schemeName: "NMP",
    schemeShortTitle: "NMP",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Manufacturing", "Industry"],
    schemeCategory: ["Industry & Manufacturing", "Governance"],
    detailedDescription_md: `## National Manufacturing Policy (NMP)\n\nNMP increases the share of manufacturing in GDP to 25% and creates 100 million jobs.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Manufacturing companies setting up facilities`,
    benefits: [
      { type: "paragraph", children: [{ text: "Infrastructure support through NIMZ." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply for setting up unit in NIMZ or industrial corridor." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Company registration certificate and project report" }] }
    ],
    faqs: [
      { question: "What is NIMZ?", answer: "NIMZ (National Investment and Manufacturing Zones) are large industrial zones with world-class infrastructure." }
    ],
    references: [{ title: "NMP Official Website", url: "https://dpiit.gov.in/policies/national-manufacturing-policy" }]
  },
  {
    _id: "scheme_088",
    schemeName: "Industrial Corridors",
    schemeShortTitle: "Industrial Corridors",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Infrastructure", "Manufacturing"],
    schemeCategory: ["Infrastructure", "Industry & Manufacturing"],
    detailedDescription_md: `## Industrial Corridors\n\nIndustrial Corridors create world-class infrastructure for manufacturing and industrial development.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Companies setting up units in industrial corridors`,
    benefits: [
      { type: "paragraph", children: [{ text: "World-class infrastructure and connectivity." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply to industrial corridor authority." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Company registration certificate and project report" }] }
    ],
    faqs: [
      { question: "What are the major industrial corridors in India?", answer: "Major corridors include Delhi-Mumbai, Chennai-Bangalore, and Amritsar-Kolkata." }
    ],
    references: [{ title: "Industrial Corridors Official Website", url: "https://nicdc.in" }]
  },
  {
    _id: "scheme_089",
    schemeName: "NICDP",
    schemeShortTitle: "NICDP",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Infrastructure", "Industrial Corridors"],
    schemeCategory: ["Infrastructure", "Industry & Manufacturing"],
    detailedDescription_md: `## National Industrial Corridor Development Programme (NICDP)\n\nNICDP develops industrial corridors across India with world-class infrastructure.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Companies setting up units in NICDP corridors`,
    benefits: [
      { type: "paragraph", children: [{ text: "World-class infrastructure and smart cities." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply to industrial corridor authority." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Company registration certificate and project report" }] }
    ],
    faqs: [
      { question: "How many industrial corridors are planned under NICDP?", answer: "11 industrial corridors are planned under NICDP." }
    ],
    references: [{ title: "NICDP Official Website", url: "https://nicdc.in" }]
  },
  {
    _id: "scheme_090",
    schemeName: "NIMZ",
    schemeShortTitle: "NIMZ",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Commerce and Industry" },
    tags: ["Manufacturing", "Industrial Zones"],
    schemeCategory: ["Industry & Manufacturing", "Infrastructure"],
    detailedDescription_md: `## National Investment and Manufacturing Zones (NIMZ)\n\nNIMZ are large industrial zones with world-class infrastructure to promote manufacturing.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Manufacturing companies setting up units in NIMZ`,
    benefits: [
      { type: "paragraph", children: [{ text: "World-class infrastructure and integrated industrial townships." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply to NIMZ authority." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Company registration certificate and project report" }] }
    ],
    faqs: [
      { question: "What is the minimum size of NIMZ?", answer: "NIMZ must have a minimum area of 50 sq km." }
    ],
    references: [{ title: "NIMZ Official Website", url: "https://dpiit.gov.in/policies/national-investment-manufacturing-zones" }]
  },
  {
    _id: "scheme_091",
    schemeName: "UDAY",
    schemeShortTitle: "UDAY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Power" },
    tags: ["Power", "Electricity", "DISCOM"],
    schemeCategory: ["Energy & Environment", "Infrastructure"],
    detailedDescription_md: `## Ujjwal DISCOM Assurance Yojana (UDAY)\n\nUDAY provides for the financial turnaround of power distribution companies.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- State governments with stressed DISCOMs`,
    benefits: [
      { type: "paragraph", children: [{ text: "Financial restructuring of DISCOM debt." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State government expresses interest in UDAY." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "State government resolution and DISCOM financial statements" }] }
    ],
    faqs: [
      { question: "How does UDAY help DISCOMs?", answer: "UDAY helps through debt takeover by state governments and operational efficiency improvements." }
    ],
    references: [{ title: "UDAY Official Website", url: "https://powermin.gov.in/en/content/uday-scheme" }]
  },
  {
    _id: "scheme_092",
    schemeName: "DDUGJY",
    schemeShortTitle: "DDUGJY",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Power" },
    tags: ["Rural Electrification", "Power"],
    schemeCategory: ["Energy & Environment", "Rural Development"],
    detailedDescription_md: `## Deendayal Upadhyaya Gram Jyoti Yojana (DDUGJY)\n\nDDUGJY provides electricity to rural households to ensure 24x7 power supply.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Rural households without electricity`,
    benefits: [
      { type: "paragraph", children: [{ text: "Electricity to all rural households." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply through state electricity department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and address proof" }] }
    ],
    faqs: [
      { question: "What is the objective of DDUGJY?", answer: "DDUGJY aims to provide electricity to all rural households." }
    ],
    references: [{ title: "DDUGJY Official Website", url: "https://ddugjy.gov.in" }]
  },
  {
    _id: "scheme_093",
    schemeName: "IPDS",
    schemeShortTitle: "IPDS",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Power" },
    tags: ["Power", "Urban Electrification"],
    schemeCategory: ["Energy & Environment", "Urban Development"],
    detailedDescription_md: `## Integrated Power Development Scheme (IPDS)\n\nIPDS provides 24x7 power supply to urban areas and reduces AT&C losses.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- State governments and power distribution companies`,
    benefits: [
      { type: "paragraph", children: [{ text: "24x7 power supply to urban areas." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State governments submit proposals to Ministry." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "State project proposals and financial estimates" }] }
    ],
    faqs: [
      { question: "What is the objective of IPDS?", answer: "IPDS aims to provide 24x7 power to urban areas and reduce losses." }
    ],
    references: [{ title: "IPDS Official Website", url: "https://powermin.gov.in/en/content/ipds" }]
  },
  {
    _id: "scheme_094",
    schemeName: "SAUBHAGYA",
    schemeShortTitle: "SAUBHAGYA",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Power" },
    tags: ["Power", "Electrification", "Rural"],
    schemeCategory: ["Energy & Environment", "Rural Development"],
    detailedDescription_md: `## Pradhan Mantri Sahaj Bijli Har Ghar Yojana (SAUBHAGYA)\n\nSAUBHAGYA provides electricity connections to all households.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Households without electricity connection`,
    benefits: [
      { type: "paragraph", children: [{ text: "Free electricity connection to poor households." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply through saubhagya.gov.in." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and address proof" }] }
    ],
    faqs: [
      { question: "Is the connection completely free?", answer: "Poor households get free connections, others pay â‚¹500." }
    ],
    references: [{ title: "SAUBHAGYA Official Website", url: "https://saubhagya.gov.in" }]
  },
  {
    _id: "scheme_095",
    schemeName: "PM KUSUM",
    schemeShortTitle: "PM KUSUM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of New and Renewable Energy" },
    tags: ["Solar", "Agriculture", "Farmers"],
    schemeCategory: ["Energy & Environment", "Agriculture, Rural & Environment"],
    detailedDescription_md: `## Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM KUSUM)\n\nPM KUSUM promotes solar pumps for irrigation and solarization of agriculture pumps.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Farmers with agriculture pumps or wanting solar pumps`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for solar pumps (up to 30-90%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply through state nodal agency." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and land documents" }] }
    ],
    faqs: [
      { question: "What is the subsidy rate for solar pumps?", answer: "Subsidy varies from 30% to 90% depending on category and state." }
    ],
    references: [{ title: "PM KUSUM Official Website", url: "https://pmkusum.mnre.gov.in" }]
  },
  {
    _id: "scheme_096",
    schemeName: "Solar Rooftop Scheme",
    schemeShortTitle: "Solar Rooftop",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of New and Renewable Energy" },
    tags: ["Solar", "Renewable Energy"],
    schemeCategory: ["Energy & Environment"],
    detailedDescription_md: `## Solar Rooftop Scheme\n\nSolar Rooftop Scheme promotes installation of solar rooftop panels for power generation.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Residential, institutional, and industrial building owners`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidy for solar rooftop installation (up to 40%)." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply through state nodal agency." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and property documents" }] }
    ],
    faqs: [
      { question: "What is the subsidy rate for solar rooftop?", answer: "Subsidy is 40% for residential, 40% for institutional, and varies for industrial." }
    ],
    references: [{ title: "Solar Rooftop Official Website", url: "https://solarrooftop.gov.in" }]
  },
  {
    _id: "scheme_097",
    schemeName: "National Solar Mission",
    schemeShortTitle: "NSM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of New and Renewable Energy" },
    tags: ["Solar", "Renewable Energy"],
    schemeCategory: ["Energy & Environment"],
    detailedDescription_md: `## National Solar Mission (NSM)\n\nNSM promotes solar power generation to achieve 100 GW solar capacity by 2022.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Solar power developers and rooftop solar installers`,
    benefits: [
      { type: "paragraph", children: [{ text: "Viability Gap Funding for solar power projects." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply through Solar Energy Corporation of India (SECI)." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Company registration and project report" }] }
    ],
    faqs: [
      { question: "What is the target of NSM?", answer: "NSM aims to achieve 100 GW solar capacity by 2022." }
    ],
    references: [{ title: "NSM Official Website", url: "https://mnre.gov.in/solar" }]
  },
  {
    _id: "scheme_098",
    schemeName: "National Wind Energy Mission",
    schemeShortTitle: "NWEM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of New and Renewable Energy" },
    tags: ["Wind", "Renewable Energy"],
    schemeCategory: ["Energy & Environment"],
    detailedDescription_md: `## National Wind Energy Mission (NWEM)\n\nNWEM promotes wind power generation and offshore wind projects.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Wind power developers and investors`,
    benefits: [
      { type: "paragraph", children: [{ text: "Incentives for wind power generation." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply through state nodal agency." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Company registration and project report" }] }
    ],
    faqs: [
      { question: "What is the target of NWEM?", answer: "NWEM aims to achieve 60 GW wind power capacity by 2022." }
    ],
    references: [{ title: "NWEM Official Website", url: "https://mnre.gov.in/wind" }]
  },
  {
    _id: "scheme_099",
    schemeName: "Biomass Energy Mission",
    schemeShortTitle: "Biomass Energy",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of New and Renewable Energy" },
    tags: ["Biomass", "Renewable Energy"],
    schemeCategory: ["Energy & Environment"],
    detailedDescription_md: `## Biomass Energy Mission\n\nBiomass Energy Mission promotes biomass power generation and biofuel production.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Biomass power developers and biofuel producers`,
    benefits: [
      { type: "paragraph", children: [{ text: "Incentives for biomass power generation." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply through state nodal agency." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Company registration and project report" }] }
    ],
    faqs: [
      { question: "What is biomass energy?", answer: "Biomass energy is generated from organic materials like agricultural waste." }
    ],
    references: [{ title: "Biomass Energy Official Website", url: "https://mnre.gov.in/bio-energy" }]
  },
  {
    _id: "scheme_100",
    schemeName: "National Biofuel Policy",
    schemeShortTitle: "Biofuel Policy",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of New and Renewable Energy" },
    tags: ["Biofuel", "Renewable Energy"],
    schemeCategory: ["Energy & Environment"],
    detailedDescription_md: `## National Biofuel Policy\n\nNational Biofuel Policy promotes biofuel production and use for energy security.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Biofuel producers and investors`,
    benefits: [
      { type: "paragraph", children: [{ text: "Incentives for biofuel production." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Apply through state nodal agency." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Company registration and project report" }] }
    ],
    faqs: [
      { question: "What are the types of biofuels?", answer: "Biofuels include ethanol, biodiesel, bio-CNG, and bio-gas." }
    ],
    references: [{ title: "Biofuel Policy Official Website", url: "https://mnre.gov.in/bio-energy" }]
  },
  {
    _id: "scheme_101",
    schemeName: "National Mission on Clean Cookstoves",
    schemeShortTitle: "Clean Cookstoves",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of New and Renewable Energy" },
    tags: ["Clean Energy", "Cooking", "Rural"],
    schemeCategory: ["Energy & Environment", "Rural Development"],
    detailedDescription_md: `## National Mission on Clean Cookstoves\n\nThis mission promotes clean cookstoves to reduce indoor air pollution and health hazards.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Rural households using traditional cooking methods`,
    benefits: [
      { type: "paragraph", children: [{ text: "Subsidized clean cookstoves." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply through state nodal agency." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and address proof" }] }
    ],
    faqs: [
      { question: "What is the benefit of clean cookstoves?", answer: "Clean cookstoves reduce indoor air pollution and fuel consumption." }
    ],
    references: [{ title: "Clean Cookstoves Official Website", url: "https://mnre.gov.in/bio-energy" }]
  },
  {
    _id: "scheme_102",
    schemeName: "National Mission on Sustainable Habitat",
    schemeShortTitle: "NMSH",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Housing and Urban Affairs" },
    tags: ["Urban", "Sustainable", "Green Buildings"],
    schemeCategory: ["Urban Development", "Environment"],
    detailedDescription_md: `## National Mission on Sustainable Habitat (NMSH)\n\nNMSH promotes sustainable habitat and green buildings in urban areas.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Urban local bodies and building developers`,
    benefits: [
      { type: "paragraph", children: [{ text: "Support for green building construction." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "Apply through state urban development department." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Project proposal and building plans" }] }
    ],
    faqs: [
      { question: "What is a green building?", answer: "Green buildings are environmentally responsible and resource-efficient throughout their life-cycle." }
    ],
    references: [{ title: "NMSH Official Website", url: "https://smartcities.gov.in" }]
  },
  {
    _id: "scheme_103",
    schemeName: "National Mission for Sustainable Urban Transport",
    schemeShortTitle: "NMSUT",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Housing and Urban Affairs" },
    tags: ["Urban", "Transport", "Public Transport"],
    schemeCategory: ["Urban Development", "Infrastructure"],
    detailedDescription_md: `## National Mission for Sustainable Urban Transport\n\nNMSUT promotes sustainable urban transport systems including metro and buses.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- State governments and urban local bodies`,
    benefits: [
      { type: "paragraph", children: [{ text: "Central assistance for urban transport projects." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State governments submit proposals to Ministry." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Detailed project report and DPR" }] }
    ],
    faqs: [
      { question: "What projects are covered under NMSUT?", answer: "NMSUT covers metro, BRTS, and other sustainable urban transport projects." }
    ],
    references: [{ title: "NMSUT Official Website", url: "https://mohua.gov.in/cms/urban-transport.php" }]
  },
  {
    _id: "scheme_104",
    schemeName: "Urban Transport Scheme",
    schemeShortTitle: "Urban Transport",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Housing and Urban Affairs" },
    tags: ["Urban", "Transport", "Buses"],
    schemeCategory: ["Urban Development", "Infrastructure"],
    detailedDescription_md: `## Urban Transport Scheme\n\nUrban Transport Scheme provides financial assistance for urban transport infrastructure.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- State governments and urban local bodies`,
    benefits: [
      { type: "paragraph", children: [{ text: "Central assistance for bus procurement and infrastructure." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State governments submit proposals to Ministry." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Detailed project report and DPR" }] }
    ],
    faqs: [
      { question: "What is covered under Urban Transport Scheme?", answer: "Scheme covers bus procurement, depots, and related infrastructure." }
    ],
    references: [{ title: "Urban Transport Official Website", url: "https://mohua.gov.in/cms/urban-transport.php" }]
  },
  {
    _id: "scheme_105",
    schemeName: "Metro Rail Policy",
    schemeShortTitle: "Metro Rail",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Housing and Urban Affairs" },
    tags: ["Urban", "Metro", "Transport"],
    schemeCategory: ["Urban Development", "Infrastructure"],
    detailedDescription_md: `## Metro Rail Policy\n\nMetro Rail Policy provides framework for metro rail projects in cities.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- State governments and urban local bodies for metro projects`,
    benefits: [
      { type: "paragraph", children: [{ text: "Central assistance for metro rail projects." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State governments submit metro project proposals." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Detailed project report and DPR" }] }
    ],
    faqs: [
      { question: "What is the central assistance for metro projects?", answer: "Central assistance varies from 20% to 50% depending on city category." }
    ],
    references: [{ title: "Metro Rail Official Website", url: "https://mohua.gov.in/cms/metro-rail.php" }]
  },
  {
    _id: "scheme_106",
    schemeName: "Rapid Rail Transit System",
    schemeShortTitle: "RRTS",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Housing and Urban Affairs" },
    tags: ["Urban", "Rail", "Transport"],
    schemeCategory: ["Urban Development", "Infrastructure"],
    detailedDescription_md: `## Rapid Rail Transit System (RRTS)\n\nRRTS promotes regional rapid rail transit systems for urban connectivity.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- State governments for regional rail projects`,
    benefits: [
      { type: "paragraph", children: [{ text: "Central assistance for RRTS projects." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State governments submit RRTS project proposals." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Detailed project report and DPR" }] }
    ],
    faqs: [
      { question: "What is RRTS?", answer: "RRTS is regional rapid rail transit for connecting cities with high-speed rail." }
    ],
    references: [{ title: "RRTS Official Website", url: "https://ncrtc.in" }]
  },
  {
    _id: "scheme_107",
    schemeName: "National Heritage City Development",
    schemeShortTitle: "NHCD",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Culture" },
    tags: ["Heritage", "Culture", "Tourism"],
    schemeCategory: ["Culture & Tourism"],
    detailedDescription_md: `## National Heritage City Development\n\nThis scheme develops heritage cities and preserves cultural heritage.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- Cities with significant heritage sites`,
    benefits: [
      { type: "paragraph", children: [{ text: "Infrastructure development for heritage preservation." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State governments submit heritage city proposals." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Heritage city development plan" }] }
    ],
    faqs: [
      { question: "How many cities are covered under this scheme?", answer: "12 heritage cities are covered under the scheme." }
    ],
    references: [{ title: "NHCD Official Website", url: "https://indiaculture.gov.in" }]
  },
  {
    _id: "scheme_108",
    schemeName: "Swadesh Darshan",
    schemeShortTitle: "Swadesh Darshan",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Tourism" },
    tags: ["Tourism", "Culture", "Development"],
    schemeCategory: ["Culture & Tourism"],
    detailedDescription_md: `## Swadesh Darshan\n\nSwadesh Darshan develops theme-based tourist circuits to promote tourism.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- State governments and tourism departments`,
    benefits: [
      { type: "paragraph", children: [{ text: "Central assistance for tourism infrastructure." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State governments submit tourism circuit proposals." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Detailed project report and DPR" }] }
    ],
    faqs: [
      { question: "What are the themes under Swadesh Darshan?", answer: "Themes include Buddhist, Eco, Heritage, Spiritual, and Wildlife circuits." }
    ],
    references: [{ title: "Swadesh Darshan Official Website", url: "https://swadeshsharshan.gov.in" }]
  },
  {
    _id: "scheme_109",
    schemeName: "PRASAD",
    schemeShortTitle: "PRASAD",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Tourism" },
    tags: ["Tourism", "Pilgrimage", "Development"],
    schemeCategory: ["Culture & Tourism"],
    detailedDescription_md: `## Pilgrimage Rejuvenation and Spiritual Augmentation Drive (PRASAD)\n\nPRASAD develops pilgrimage destinations to enhance tourist experience.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- State governments and tourism departments for pilgrimage sites`,
    benefits: [
      { type: "paragraph", children: [{ text: "Central assistance for pilgrimage infrastructure." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State governments submit pilgrimage site proposals." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Detailed project report and DPR" }] }
    ],
    faqs: [
      { question: "How many pilgrimage sites are covered?", answer: "25 pilgrimage sites are covered under PRASAD scheme." }
    ],
    references: [{ title: "PRASAD Official Website", url: "https://prasad.nic.in" }]
  },
  {
    _id: "scheme_110",
    schemeName: "National Mission on Pilgrimage Rejuvenation",
    schemeShortTitle: "NMPR",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Tourism" },
    tags: ["Tourism", "Pilgrimage"],
    schemeCategory: ["Culture & Tourism"],
    detailedDescription_md: `## National Mission on Pilgrimage Rejuvenation (NMPR)\n\nNMPR develops pilgrimage destinations with world-class facilities.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- State governments for pilgrimage sites`,
    benefits: [
      { type: "paragraph", children: [{ text: "Central assistance for pilgrimage infrastructure." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State governments submit pilgrimage site proposals." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Detailed project report and DPR" }] }
    ],
    faqs: [
      { question: "What is the objective of NMPR?", answer: "NMPR aims to develop pilgrimage destinations with world-class facilities." }
    ],
    references: [{ title: "NMPR Official Website", url: "https://tourism.gov.in" }]
  },
  {
    _id: "scheme_111",
    schemeName: "National Mission on Libraries",
    schemeShortTitle: "NML",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Culture" },
    tags: ["Libraries", "Education", "Culture"],
    schemeCategory: ["Education & Learning", "Culture & Tourism"],
    detailedDescription_md: `## National Mission on Libraries (NML)\n\nNML aims to modernize and develop libraries across India to promote reading culture.`,
    eligibilityDescription_md: `### Eligibility Criteria\n\n- State governments and library authorities`,
    benefits: [
      { type: "paragraph", children: [{ text: "Central assistance for library modernization." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State governments submit library development proposals." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Library development plan and DPR" }] }
    ],
    faqs: [
      { question: "What is the objective of NML?", answer: "NML aims to modernize libraries and promote reading culture." }
    ],
    references: [{ title: "NML Official Website", url: "https://indiaculture.gov.in" }]
  },
  {
    _id: "scheme_112",
    schemeName: "National Mission on Cultural Mapping",
    schemeShortTitle: "NMCM",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Culture" },
    tags: ["Culture", "Heritage", "Mapping"],
    schemeCategory: ["Culture & Tourism"],
    detailedDescription_md: `## National Mission on Cultural Mapping (NMCM)\n\nNMCM creates a comprehensive database of cultural resources and heritage sites.`,
    eligibilityDescription_md: `### Eligibility Criteria\n- State governments and cultural organizations`,
    benefits: [
      { type: "paragraph", children: [{ text: "Central assistance for cultural mapping." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State governments submit cultural mapping proposals." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Cultural mapping plan and DPR" }] }
    ],
    faqs: [
      { question: "What is the objective of NMCM?", answer: "NMCM aims to create a comprehensive database of cultural resources." }
    ],
    references: [{ title: "NMCM Official Website", url: "https://indiaculture.gov.in" }]
  },
  {
    _id: "scheme_113",
    schemeName: "National Mission on Monuments and Heritage",
    schemeShortTitle: "NMMH",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Culture" },
    tags: ["Heritage", "Monuments", "Conservation"],
    schemeCategory: ["Culture & Tourism"],
    detailedDescription_md: `## National Mission on Monuments and Heritage (NMMH)\n\nNMMH conserves monuments and heritage sites across India.`,
    eligibilityDescription_md: `### Eligibility Criteria\n- State governments and heritage authorities`,
    benefits: [
      { type: "paragraph", children: [{ text: "Central assistance for monument conservation." }] }
    ],
    applicationProcess: [
      {
        mode: "Offline",
        process: [
          { type: "paragraph", children: [{ text: "State governments submit monument conservation proposals." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Monument conservation plan and DPR" }] }
    ],
    faqs: [
      { question: "What is the objective of NMMH?", answer: "NMMH aims to conserve monuments and heritage sites." }
    ],
    references: [{ title: "NMMH Official Website", url: "https://indiaculture.gov.in" }]
  },
  {
    _id: "scheme_114",
    schemeName: "National Mission on Skill Development",
    schemeShortTitle: "NMSD",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Skill Development and Entrepreneurship" },
    tags: ["Skill Development", "Youth", "Employment"],
    schemeCategory: ["Skills & Employment"],
    detailedDescription_md: `## National Mission on Skill Development (NMSD)\n\nNMSD provides skill development and training to youth for employment.`,
    eligibilityDescription_md: `### Eligibility Criteria\n- Youth aged 15-35 years`,
    benefits: [
      { type: "paragraph", children: [{ text: "Free skill training and certification." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit skillindia.gov.in and register." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and educational certificates" }] }
    ],
    faqs: [
      { question: "What is the objective of NMSD?", answer: "NMSD aims to provide skill development to youth for employment." }
    ],
    references: [{ title: "NMSD Official Website", url: "https://skillindia.gov.in" }]
  },
  {
    _id: "scheme_115",
    schemeName: "National Career Service",
    schemeShortTitle: "NCS",
    state: "All India",
    level: "Central",
    nodalMinistryName: { label: "Ministry of Labour and Employment" },
    tags: ["Employment", "Career", "Youth"],
    schemeCategory: ["Skills & Employment"],
    detailedDescription_md: `## National Career Service (NCS)\n\nNCS provides career guidance and employment services to youth.`,
    eligibilityDescription_md: `### Eligibility Criteria\n- Youth aged 15-29 years`,
    benefits: [
      { type: "paragraph", children: [{ text: "Career guidance and employment services." }] }
    ],
    applicationProcess: [
      {
        mode: "Online",
        process: [
          { type: "paragraph", children: [{ text: "Visit ncs.gov.in and register." }] }
        ]
      }
    ],
    documents_required: [
      { type: "paragraph", children: [{ text: "Aadhaar Card and educational certificates" }] }
    ],
    faqs: [
      { question: "What services does NCS provide?", answer: "NCS provides career guidance, counseling, and employment services." }
    ],
    references: [{ title: "NCS Official Website", url: "https://ncs.gov.in" }]
  }
];

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Excel DB Core Functions (Using In-Memory Data Only)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

async function readAllSchemes() {
  // Always use in-memory data to avoid Excel corruption issues
  console.log('Using in-memory schemes data (115 schemes)');
  return SCHEMES_DATA;
}

async function readSchemeById(id) {
  const schemes = await readAllSchemes();
  console.log('Searching for scheme with ID:', id);
  console.log('Available scheme IDs:', schemes.slice(0, 5).map(s => s._id));
  const scheme = schemes.find(s => s._id === id);
  console.log('Match found:', scheme ? 'Yes' : 'No');
  return scheme || null;
}

async function searchSchemes(query) {
  const schemes = await readAllSchemes();
  if (!query) return schemes;
  const q = query.toLowerCase();
  return schemes.filter(s =>
    s.schemeName.toLowerCase().includes(q) ||
    s.schemeShortTitle.toLowerCase().includes(q) ||
    (s.tags && s.tags.some(t => t.toLowerCase().includes(q))) ||
    (s.schemeCategory && s.schemeCategory.some(c => c.toLowerCase().includes(q))) ||
    (s.level && s.level.toLowerCase().includes(q)) ||
    (s.state && s.state.toLowerCase().includes(q))
  );
}

function paginateArray(arr, page, limit) {
  const total = arr.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const docs = arr.slice(start, start + limit);
  return { docs, totalDocs: total, totalPages, page, limit };
}

export { readAllSchemes, readSchemeById, searchSchemes, paginateArray, SCHEMES_DATA };