import { UserPlus, Search, CheckSquare } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';

const HowToApply = () => {
    const { t } = useTranslation();
    
    const steps = [
        {
            icon: UserPlus,
            title: t('howToApply.step1.title'),
            description: t('howToApply.step1.description'),
            step: "01",
            color: "#74B83E",
        },
        {
            icon: Search,
            title: t('howToApply.step2.title'),
            description: t('howToApply.step2.description'),
            step: "02",
            color: "#3b82f6",
        },
        {
            icon: CheckSquare,
            title: t('howToApply.step3.title'),
            description: t('howToApply.step3.description'),
            step: "03",
            color: "#8b5cf6",
        },
    ];
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.15 }
        );
        const els = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        els?.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="px-8 py-20 relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #f8fdf5 0%, #eff6ff 100%)'
        }}>
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black mb-3 section-title">{t('howToApply.title')}</h2>
                    <p className="text-gray-500">{t('howToApply.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                    {/* Steps Column */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connector line (desktop) */}
                        <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-0.5"
                            style={{ background: 'linear-gradient(90deg, #74B83E, #3b82f6, #8b5cf6)', zIndex: 0 }} />

                        {steps.map((step, i) => (
                            <div
                                key={i}
                                className={`step-card reveal flex flex-col items-center text-center relative z-10 ${i === 0 ? 'reveal-left' : i === 2 ? 'reveal-right' : 'reveal'}`}
                                style={{ animationDelay: `${i * 150}ms`, transitionDelay: `${i * 120}ms` }}
                            >
                                {/* Step number badge */}
                                <div style={{
                                    position: 'absolute', top: '-14px', right: '-8px',
                                    width: '32px', height: '32px',
                                    background: step.color,
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#fff', fontSize: '0.75rem', fontWeight: '800',
                                    boxShadow: `0 4px 12px ${step.color}66`
                                }}>
                                    {step.step}
                                </div>

                                {/* Icon circle */}
                                <div
                                    className="step-icon mb-5"
                                    style={{
                                        width: '72px', height: '72px',
                                        background: `linear-gradient(135deg, ${step.color}22, ${step.color}44)`,
                                        borderRadius: '20px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: `0 8px 24px ${step.color}33`,
                                    }}
                                >
                                    <step.icon size={32} style={{ color: step.color }} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{step.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Image Column */}
                    <div className="lg:col-span-2 reveal rounded-3xl overflow-hidden shadow-2xl h-[400px]" style={{ animationDelay: '200ms' }}>
                        <img
                            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
                            alt="People working on applications"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3b82f6]/50 via-transparent to-transparent rounded-3xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowToApply;
