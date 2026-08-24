import { Database, Building2, MapPin, ArrowRight, FileText, Building, Landmark, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';

const StatCard = ({ icon: Icon, title, value, delay }) => (
    <div
        className="stat-card reveal bg-white p-8 rounded-2xl flex items-center gap-5 border border-white/60"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div style={{
            width: '64px', height: '64px', flexShrink: 0,
            background: 'linear-gradient(135deg, rgba(116,184,62,0.12), rgba(116,184,62,0.22))',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <Icon size={32} className="text-[#74B83E]" />
        </div>
        <div>
            <h3 className="text-3xl font-black text-gray-900">{value}</h3>
            <p className="text-gray-500 text-sm font-medium mt-0.5">{title}</p>
        </div>
    </div>
);

const TotalSchemes = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.15 }
        );
        const els = sectionRef.current?.querySelectorAll('.reveal');
        els?.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="px-8 py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0fdf4, #f8fafc)' }}>
            {/* Decorative */}
            <div style={{
                position: 'absolute', top: '-60px', right: '-60px',
                width: '260px', height: '260px',
                background: 'radial-gradient(circle, rgba(116,184,62,0.15), transparent)',
                borderRadius: '50%', pointerEvents: 'none'
            }} />

            <h1 className="text-4xl font-black text-center mb-3 reveal section-title">
                {t('totalSchemes.title')}
            </h1>
            <p className="text-center text-gray-500 mb-10 reveal delay-100">
                {t('totalSchemes.subtitle')}
            </p>

            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-10">
                    {/* Stats Column */}
                    <div className="grid grid-cols-1 gap-6">
                        <StatCard icon={FileText} title={t('totalSchemes.totalSchemes')} value="500+" delay={0} />
                        <StatCard icon={Building} title={t('totalSchemes.centralSchemes')} value="200+" delay={100} />
                        <StatCard icon={Landmark} title={t('totalSchemes.stateSchemes')} value="300+" delay={200} />
                    </div>

                    {/* Image Column */}
                    <div className="reveal relative rounded-3xl overflow-hidden shadow-2xl h-[420px]" style={{ animationDelay: '150ms' }}>
                        <img
                            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80"
                            alt="Government documents and schemes"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#74B83E]/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                            <h3 className="text-2xl font-bold mb-1">{t('totalSchemes.comprehensiveDatabase')}</h3>
                            <p className="text-white/90 text-sm">{t('totalSchemes.allInOnePlace')}</p>
                        </div>
                    </div>
                </div>

                <div className="text-center reveal delay-300">
                    <button className="btn-primary text-lg" onClick={() => navigate('/schemes')}>
                        <Search size={20} />
                        {t('totalSchemes.findSchemes')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TotalSchemes;
