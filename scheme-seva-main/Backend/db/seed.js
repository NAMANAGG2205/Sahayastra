import mongoose from "mongoose";
import Schemev2 from "../models/schemev2.model.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const schemes = [
    {
        schemeName: "Pradhan Mantri Jan Dhan Yojana",
        schemeShortTitle: "PMJDY",
        state: "All India",
        level: "Central",
        nodalMinistryName: "Ministry of Finance",
        tags: ["Banking", "Financial Inclusion", "Insurance"],
        schemeCategory: ["Banking", "Finance"],
        detailedDescription_md: "# Pradhan Mantri Jan Dhan Yojana (PMJDY)\n\nPradhan Mantri Jan-Dhan Yojana (PMJDY) is National Mission for Financial Inclusion to ensure access to financial services, namely, Basic Savings & Deposit Accounts, Remittance, Credit, Insurance, Pension in an affordable manner. \n\n## Key Features\n- One basic savings bank account for unbanked person.\n- No requirement to maintain any minimum balance.\n- Interest is earned on the deposit in PMJDY accounts.\n- RuPay Debit card is provided to the account holder.",
        eligibilityDescription_md: "### Eligibility Criteria\n\n- Must be an Indian citizen.\n- Age should be 10 years or above.\n- Any individual who does not have a bank account can open a PMJDY account.",
        benefits: [
            {
                type: "paragraph",
                children: [{ text: "Accidental Insurance Cover of Rs. 2,00,000 to new PMJDY accounts opened after 28.08.2018." }]
            },
            {
                type: "paragraph",
                children: [{ text: "An overdraft (OD) facility up to Rs. 10,000 to eligible account holders is available." }]
            }
        ],
        applicationProcess: [
            {
                mode: "Offline",
                process: [
                    {
                        type: "paragraph",
                        children: [{ text: "Visit any bank branch or Bank Mitr (Business Correspondent) outlet." }]
                    },
                    {
                        type: "paragraph",
                        children: [{ text: "Fill the account opening form (available in Hindi and English on the PMJDY portal)." }]
                    },
                    {
                        type: "paragraph",
                        children: [{ text: "Submit the form along with required KYC documents." }]
                    }
                ]
            }
        ],
        documents_required: [
            {
                type: "paragraph",
                children: [{ text: "Aadhaar Card or Passport or Driving License or Voter ID Card." }]
            }
        ],
        faqs: [
            {
                question: "Can I open an account online?",
                answer: "Yes, many banks offer digital account opening platforms that support PMJDY accounts."
            },
            {
                question: "Is there any charge for a RuPay debit card?",
                answer: "No, the card is issued free of charge to PMJDY account holders."
            }
        ]
    },
    {
        schemeName: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana",
        schemeShortTitle: "AB-PMJAY",
        state: "All India",
        level: "Central",
        nodalMinistryName: "Ministry of Health and Family Welfare",
        tags: ["Health", "Insurance", "Medical Assistance"],
        schemeCategory: ["Healthcare"],
        detailedDescription_md: "# Ayushman Bharat PM-JAY\n\nAyushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY) is the largest health assurance scheme in the world which aims to provide a health cover of Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization to over 12 crores poor and vulnerable families.\n\n## Key Features\n- PM-JAY provides cashless cover of up to Rs. 5,00,000 per family per year.\n- Covers up to 3 days of pre-hospitalization and 15 days post-hospitalization expenses.",
        eligibilityDescription_md: "### Eligibility Criteria\n\n- Based on SECC 2011 data for rural and urban areas.\n- Families with no adult male member between 16-59 years.\n- Households living in one room with kucha walls and roof.",
        benefits: [
            {
                type: "paragraph",
                children: [{ text: "Cashless and paperless access to healthcare services for the beneficiary at the point of service." }]
            },
            {
                type: "paragraph",
                children: [{ text: "Health coverage of Rs. 5,00,000 per family per year." }]
            }
        ],
        applicationProcess: [
            {
                mode: "Online",
                process: [
                    {
                        type: "paragraph",
                        children: [{ text: "Visit the official PMJAY website (pmjay.gov.in) and check eligibility using 'Am I Eligible' portal." }]
                    },
                    {
                        type: "paragraph",
                        children: [{ text: "If eligible, register yourself or visit nearest Ayushman Mitra at empanelled hospital." }]
                    }
                ]
            }
        ],
        documents_required: [
            {
                type: "paragraph",
                children: [{ text: "Aadhaar Card, Ration Card, or Family Identification Proof." }]
            }
        ],
        faqs: [
            {
                question: "Is there any family size limit?",
                answer: "No, there is no limit on family size or age under the PM-JAY scheme."
            }
        ]
    },
    {
        schemeName: "Pradhan Mantri Kisan Samman Nidhi",
        schemeShortTitle: "PM-KISAN",
        state: "All India",
        level: "Central",
        nodalMinistryName: "Ministry of Agriculture and Farmers Welfare",
        tags: ["Agriculture", "Farmers", "Income Support"],
        schemeCategory: ["Agriculture", "Finance"],
        detailedDescription_md: "# Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)\n\nPM-KISAN is a Central Sector Scheme that provides income support to all landholding farmers' families across the country to enable them to take care of expenses related to agriculture and allied activities as well as domestic needs.\n\n## Key Features\n- Under the scheme, landholding farmers' families are provided with financial benefit of Rs. 6,000 per year.\n- The amount is paid in three equal installments of Rs. 2,000 each, directly into bank accounts.",
        eligibilityDescription_md: "### Eligibility Criteria\n\n- Landholding farmer families with cultivable landholding in their names.\n- Excludes institutional landholders and families where any member belongs to higher economic status (e.g. income tax payers, pensioners earning > Rs. 10,000/month).",
        benefits: [
            {
                type: "paragraph",
                children: [{ text: "Direct income support of Rs. 6,000 per year transferred directly to the bank accounts of farmers." }]
            }
        ],
        applicationProcess: [
            {
                mode: "Online",
                process: [
                    {
                        type: "paragraph",
                        children: [{ text: "Go to pmkisan.gov.in and click on 'New Farmer Registration'." }]
                    },
                    {
                        type: "paragraph",
                        children: [{ text: "Enter Aadhaar number and fill out the details including land ownership data." }]
                    },
                    {
                        type: "paragraph",
                        children: [{ text: "Submit the registration form for verification by state authorities." }]
                    }
                ]
            }
        ],
        documents_required: [
            {
                type: "paragraph",
                children: [{ text: "Aadhaar Card, Land ownership papers (Khatauni), and Bank Account Details." }]
            }
        ],
        faqs: [
            {
                question: "How is the benefit transferred?",
                answer: "The benefit is transferred via Direct Benefit Transfer (DBT) directly to Aadhaar seeded bank accounts."
            }
        ]
    }
];

const seedDB = async () => {
    try {
        console.log("Connecting to:", `${process.env.MONGODB_URL || 'mongodb://localhost:27017'}/${process.env.DB_NAME || 'scheme-seva'}`);
        await mongoose.connect(`${process.env.MONGODB_URL || 'mongodb://localhost:27017'}/${process.env.DB_NAME || 'scheme-seva'}`);
        console.log("Connected to MongoDB for seeding...");
        await Schemev2.deleteMany({});
        console.log("Deleted old schemes...");
        await Schemev2.insertMany(schemes);
        console.log("Successfully seeded database with real Indian government schemes!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding DB:", error);
        process.exit(1);
    }
};

seedDB();
