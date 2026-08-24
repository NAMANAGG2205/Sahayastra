"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useTranslation } from 'react-i18next';

const FAQItem = ({ question, answer, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="border border-gray-100 rounded-2xl mb-4 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <button
                className="flex justify-between items-center w-full text-left p-5 gap-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold text-gray-800">{question}</span>
                <div style={{
                    width: '32px', height: '32px', flexShrink: 0,
                    borderRadius: '50%',
                    background: isOpen ? '#74B83E' : '#f3f4f6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s ease',
                }}>
                    {isOpen
                        ? <ChevronUp size={16} style={{ color: '#fff' }} />
                        : <ChevronDown size={16} style={{ color: '#6b7280' }} />
                    }
                </div>
            </button>
            <div style={{
                maxHeight: isOpen ? '300px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s ease, padding 0.3s ease',
                padding: isOpen ? '0 1.25rem 1.25rem' : '0 1.25rem 0',
            }}>
                <p className="text-gray-600 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const { t } = useTranslation();
    const faqs = [
        {
            question: t('faq.q1.question'),
            answer: t('faq.q1.answer'),
        },
        {
            question: t('faq.q2.question'),
            answer: t('faq.q2.answer'),
        },
        {
            question: t('faq.q3.question'),
            answer: t('faq.q3.answer'),
        },
        {
            question: t('faq.q4.question'),
            answer: t('faq.q4.answer'),
        },
        {
            question: t('faq.q5.question'),
            answer: t('faq.q5.answer'),
        },
        {
            question: t('faq.q6.question'),
            answer: t('faq.q6.answer'),
        },
    ];

    return (
        <section className="px-8 py-16 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)' }}>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Image + decorative column */}
                    <div className="relative hidden lg:block">
                        <div className="rounded-3xl overflow-hidden shadow-2xl h-[520px] sticky top-24">
                            <img
                                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
                                alt="Person studying documents"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <HelpCircle size={32} className="mb-2 opacity-80" />
                                <h3 className="text-2xl font-bold mb-1">{t('faq.needHelp')}</h3>
                                <p className="text-white/90 text-sm">{t('faq.needHelpText')}</p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Column */}
                    <div>
                        <h2 className="text-4xl font-black mb-3 section-title">{t('faq.title')}</h2>
                        <p className="text-gray-500 mb-8">{t('faq.subtitle')}</p>
                        <div>
                            {faqs.map((faq, index) => (
                                <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FAQ;
