import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// ─── Rule-based response engine ───────────────────────────────────────────────
const RESPONSES = [
    {
        keywords: ['pm kisan', 'kisan samman', 'farmer income', 'agriculture income'],
        answer: `**PM Kisan Samman Nidhi (PM-KISAN)** 🌾

Provides financial support of **₹6,000 per year** to all landholding farmer families, paid in 3 instalments of ₹2,000 every 4 months.

**Eligibility:** All small & marginal farmers with cultivable land.

**How to apply:**
- Visit [pmkisan.gov.in](https://pmkisan.gov.in)
- Apply via your nearest Common Service Centre (CSC)
- Contact local Patwari / Agriculture Officer

**Documents needed:** Aadhaar, Land records, Bank account details.`
    },
    {
        keywords: ['ayushman', 'pmjay', 'health insurance', 'medical', 'hospital'],
        answer: `**Ayushman Bharat – PM Jan Arogya Yojana (PMJAY)** 🏥

World's largest health insurance scheme offering **₹5 lakh per family per year** for secondary & tertiary hospitalisation.

**Eligibility:** Families listed in SECC 2011 database (economically vulnerable).

**How to check:**
- Visit [pmjay.gov.in](https://pmjay.gov.in) or call **14555**
- Use your Aadhaar / Ration card to check eligibility

**Covers:** 1,500+ medical procedures across empanelled hospitals.`
    },
    {
        keywords: ['ujjwala', 'lpg', 'gas connection', 'cooking gas', 'cylinder'],
        answer: `**Pradhan Mantri Ujjwala Yojana (PMUY)** 🔥

Provides **free LPG connections** to women from Below Poverty Line (BPL) households to replace harmful cooking fuels.

**Eligibility:** Adult women from BPL families, SC/ST households, PMAY-G beneficiaries.

**How to apply:**
- Visit your nearest LPG distributor (HP, Bharat, Indane)
- Fill Form KYC1 & submit with Aadhaar + BPL card

**Benefit:** Free gas connection + first refill subsidy.`
    },
    {
        keywords: ['mudra', 'business loan', 'small business', 'entrepreneur', 'startup loan'],
        answer: `**Pradhan Mantri MUDRA Yojana (PMMY)** 💼

Provides loans up to **₹20 lakh** for non-farm micro/small enterprises.

**3 categories:**
| Category | Loan Amount |
|---|---|
| Shishu | Up to ₹50,000 |
| Kishore | ₹50,000 – ₹5 lakh |
| Tarun | ₹5 lakh – ₹20 lakh |

**How to apply:** Visit any bank, MFI, or NBFC. No collateral required for Shishu loans.

Portal: [mudra.org.in](https://www.mudra.org.in)`
    },
    {
        keywords: ['scholarship', 'education', 'student', 'study', 'college', 'school fee'],
        answer: `**Scholarships for Students** 🎓

Several central schemes are available:

- **NSP (National Scholarship Portal):** Pre/post matric, merit-cum-means for minorities. Visit [scholarships.gov.in](https://scholarships.gov.in)
- **PM Yashasvi:** ₹75,000–1,25,000/yr for OBC/EBC/DNT students
- **Central Sector Scheme:** For top-performing students from Class 12
- **Begum Hazrat Mahal:** For minority girl students

**Apply:** All central scholarships via [scholarships.gov.in](https://scholarships.gov.in)`
    },
    {
        keywords: ['housing', 'home', 'pmay', 'awas yojana', 'house', 'flat'],
        answer: `**Pradhan Mantri Awas Yojana (PMAY)** 🏠

Aims to provide **affordable housing for all** by 2024.

**Two components:**
- **PMAY-Urban:** For urban areas – subsidy up to ₹2.67 lakh via CLSS
- **PMAY-Gramin:** For rural areas – financial assistance up to ₹1.2–1.3 lakh

**Eligibility:** EWS (income < ₹3L), LIG (< ₹6L), MIG (< ₹18L)

**Apply:** [pmaymis.gov.in](https://pmaymis.gov.in) or through your bank/CSC.`
    },
    {
        keywords: ['jan dhan', 'bank account', 'zero balance', 'banking'],
        answer: `**Pradhan Mantri Jan Dhan Yojana (PMJDY)** 🏦

Ensures access to financial services for all households.

**Benefits:**
- Zero balance bank account
- RuPay Debit Card with ₹2 lakh accident insurance
- ₹10,000 overdraft facility
- Life cover of ₹30,000

**How to open:** Visit any bank branch with Aadhaar + photo.`
    },
    {
        keywords: ['sukanya', 'girl child', 'daughter', 'samridhi'],
        answer: `**Sukanya Samriddhi Yojana (SSY)** 👧

A savings scheme for the girl child with high interest rate.

**Key details:**
- Interest rate: **~8.2% p.a.** (one of the highest)
- Min deposit: ₹250/year | Max: ₹1.5 lakh/year
- Tax benefits under Section 80C
- Account matures when girl turns **21** or at marriage after 18

**Open at:** Any post office or authorised bank with birth certificate + parent's Aadhaar.`
    },
    {
        keywords: ['atal pension', 'pension', 'retirement', 'old age'],
        answer: `**Atal Pension Yojana (APY)** 👴

Provides a guaranteed pension to workers in the unorganised sector.

**Pension amounts:** ₹1,000 / ₹2,000 / ₹3,000 / ₹4,000 / ₹5,000 per month after age 60.

**Eligibility:** Indian citizens aged 18–40 with a savings bank account.

**How to join:** Visit your bank or apply via net banking/mobile banking.`
    },
    {
        keywords: ['swachh bharat', 'toilet', 'sanitation', 'odf'],
        answer: `**Swachh Bharat Mission (SBM)** 🚽

Aims to achieve open defecation-free (ODF) India.

**Rural (SBM-G):** Financial assistance of ₹12,000 for construction of individual household toilets.

**Urban (SBM-U):** Support for individual, community & public toilets in urban areas.

**Apply:** Through your Gram Panchayat (rural) or ULB/Municipality (urban).`
    },
    {
        keywords: ['how', 'what is', 'tell me about', 'explain', 'sahayastra', 'this portal', 'website'],
        answer: `**Welcome to Sahayastra!** 🇮🇳

Sahayastra is a **one-stop portal for Indian government schemes**. Here you can:

- 🔍 **Browse** hundreds of central & state government schemes
- ✅ **Check eligibility** for schemes based on your profile
- 📋 **Get details** on benefits, documents & how to apply
- 🤖 **Ask me** anything about specific schemes!

Popular categories: Agriculture, Health, Education, Housing, Women, Youth, Business.`
    },
];

const FALLBACK = `I'm here to help with Indian government schemes! You can ask me about:

- 🌾 **PM Kisan** (farmer income support)
- 🏥 **Ayushman Bharat** (health insurance)
- 🔥 **Ujjwala Yojana** (LPG connections)
- 💼 **MUDRA Loans** (business loans)
- 🎓 **Scholarships** for students
- 🏠 **PM Awas Yojana** (housing)
- 🏦 **Jan Dhan** (bank accounts)
- 👴 **Atal Pension Yojana**

Just type your question!`;

function getResponse(question) {
    const q = question.toLowerCase();
    for (const r of RESPONSES) {
        if (r.keywords.some(k => q.includes(k))) return r.answer;
    }
    return FALLBACK;
}
// ──────────────────────────────────────────────────────────────────────────────

const GlobalChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: `**Hello! I'm Sahayastra Assistant** 🇮🇳\n\nI can help you find information about Indian government schemes. What would you like to know?` }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
        setIsLoading(true);
        // Simulate a small delay for natural feel
        setTimeout(() => {
            const botReply = getResponse(userMsg);
            setMessages(prev => [...prev, { type: 'bot', text: botReply }]);
            setIsLoading(false);
        }, 600);
    };

    const suggestions = ['PM Kisan', 'Ayushman Bharat', 'MUDRA Loan', 'Ujjwala Yojana'];

    return (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
            {isOpen && (
                <div style={{
                    position: 'absolute', bottom: '72px', right: 0,
                    width: '360px', height: '540px',
                    background: '#fff', borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                    display: 'flex', flexDirection: 'column',
                    overflow: 'hidden', border: '1px solid #e5e7eb',
                    animation: 'chatSlideUp 0.25s ease-out'
                }}>
                    {/* Header */}
                    <div style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '7px', display: 'flex' }}>
                                <Bot size={18} color="white" />
                            </div>
                            <div>
                                <div style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>Sahayastra Assistant</div>
                                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px' }}>🟢 Online • Government Schemes Expert</div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer', display: 'flex', color: 'white', lineHeight: 0 }}>
                            <X size={16} color="white" />
                        </button>
                    </div>

                    {/* Quick suggestions */}
                    <div style={{ padding: '10px 12px', background: '#f0fdf4', borderBottom: '1px solid #dcfce7', display: 'flex', gap: '6px', flexWrap: 'wrap', flexShrink: 0 }}>
                        {suggestions.map(s => (
                            <button key={s} onClick={() => { setInput(s); }} style={{ background: 'white', border: '1px solid #16a34a', borderRadius: '20px', padding: '4px 10px', fontSize: '11px', color: '#16a34a', cursor: 'pointer', fontWeight: 500 }}>
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '14px', background: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                                <div style={{
                                    maxWidth: '85%', padding: '10px 13px',
                                    borderRadius: msg.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                    background: msg.type === 'user' ? 'linear-gradient(135deg, #16a34a, #15803d)' : 'white',
                                    color: msg.type === 'user' ? 'white' : '#1f2937',
                                    fontSize: '13px', lineHeight: '1.55',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                                    border: msg.type === 'bot' ? '1px solid #e5e7eb' : 'none'
                                }}>
                                    {msg.type === 'bot' ? (
                                        <div className="chatbot-markdown">
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        </div>
                                    ) : msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '18px 18px 18px 4px', padding: '12px 16px', display: 'flex', gap: '5px', alignItems: 'center' }}>
                                    {[0, 1, 2].map(i => (
                                        <div key={i} style={{ width: '7px', height: '7px', background: '#16a34a', borderRadius: '50%', animation: `chatDot 1.2s ${i * 0.2}s infinite ease-in-out` }} />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} style={{ padding: '12px', background: 'white', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                        <input
                            type="text" value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Ask about any scheme..."
                            style={{ flex: 1, background: '#f3f4f6', border: '1.5px solid #f3f4f6', borderRadius: '25px', padding: '9px 15px', fontSize: '13px', outline: 'none', transition: 'border-color 0.2s' }}
                            onFocus={e => e.target.style.borderColor = '#16a34a'}
                            onBlur={e => e.target.style.borderColor = '#f3f4f6'}
                        />
                        <button type="submit" disabled={!input.trim() || isLoading} style={{
                            background: input.trim() ? 'linear-gradient(135deg, #16a34a, #15803d)' : '#d1d5db',
                            border: 'none', borderRadius: '50%', width: '38px', height: '38px', flexShrink: 0,
                            cursor: input.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
                        }}>
                            <Send size={15} color="white" />
                        </button>
                    </form>
                </div>
            )}

            {/* Floating button */}
            <button onClick={() => setIsOpen(o => !o)} style={{
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                border: 'none', borderRadius: '50%', width: '56px', height: '56px',
                cursor: 'pointer', boxShadow: '0 6px 20px rgba(22,163,74,0.45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s',
            }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(22,163,74,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(22,163,74,0.45)'; }}
            >
                {isOpen ? <X size={22} color="white" /> : <MessageCircle size={22} color="white" />}
            </button>

            <style>{`
                @keyframes chatSlideUp { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:translateY(0); } }
                @keyframes chatDot { 0%,80%,100% { transform:scale(0.6); opacity:0.4; } 40% { transform:scale(1); opacity:1; } }
                .chatbot-markdown p { margin: 0 0 6px 0; }
                .chatbot-markdown p:last-child { margin-bottom: 0; }
                .chatbot-markdown strong { color: #15803d; }
                .chatbot-markdown ul { padding-left: 16px; margin: 4px 0; }
                .chatbot-markdown li { margin-bottom: 3px; }
                .chatbot-markdown table { width: 100%; border-collapse: collapse; font-size: 12px; margin: 6px 0; }
                .chatbot-markdown th, .chatbot-markdown td { border: 1px solid #e5e7eb; padding: 4px 8px; text-align: left; }
                .chatbot-markdown th { background: #f0fdf4; }
                .chatbot-markdown a { color: #16a34a; }
                .chatbot-markdown h2, .chatbot-markdown h3 { margin: 6px 0 4px; color: #15803d; font-size: 14px; }
            `}</style>
        </div>
    );
};

export default GlobalChatbot;
