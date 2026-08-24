import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import banner1 from "../../../../assets/banner_digital_india.jpg";

const HeroSection = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [search, setSearch] = useState('');
    const [isTransitioning, setIsTransitioning] = useState(false);

    const slides = [
        {
            id: 1,
            image: banner1,
            title: t('hero.slide1.title'),
            subtitle: t('hero.slide1.subtitle')
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1920&q=80",
            title: t('hero.slide2.title'),
            subtitle: t('hero.slide2.subtitle')
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1920&q=80",
            title: t('hero.slide3.title'),
            subtitle: t('hero.slide3.subtitle')
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80",
            title: t('hero.slide4.title'),
            subtitle: t('hero.slide4.subtitle')
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1920&q=80",
            title: t('hero.slide5.title'),
            subtitle: t('hero.slide5.subtitle')
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1920&q=80",
            title: t('hero.slide6.title'),
            subtitle: t('hero.slide6.subtitle')
        }
    ];

    const STATS = [
        { value: '300+', label: t('hero.stats.schemes') },
        { value: '15', label: t('hero.stats.categories') },
        { value: '28+', label: t('hero.stats.states') },
        { value: '100%', label: t('hero.stats.freeAccess') },
    ];

    const goTo = useCallback((idx) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrent(idx);
            setIsTransitioning(false);
        }, 300);
    }, []);

    const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
    const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/schemes${search ? `?search=${encodeURIComponent(search)}` : ''}`);
    };

    return (
        <div>
            {/* Carousel */}
            <div className="relative w-full overflow-hidden h-[60vh] min-h-[500px] lg:h-[80vh] lg:min-h-[700px]">
                {slides.map((slide, idx) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                        {/* Slow continuous zoom effect */}
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className={`w-full h-full object-cover ease-linear ${
                                idx === current ? 'scale-110 transition-transform duration-[6000ms]' : 'scale-100 transition-none'
                            }`}
                        />
                        {/* Darker gradient for much better text legibility */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
                        
                        <div className="absolute inset-0 flex items-center">
                            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                                <div className="max-w-xl">
                                    {/* Staggered text animations */}
                                    <div className={`transform transition-all duration-700 delay-100 ${idx === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                                        <span className="inline-block bg-[#16A34A] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wider uppercase shadow-md">
                                            {t('hero.governmentOfIndia')}
                                        </span>
                                    </div>
                                    
                                    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-xl transform transition-all duration-700 delay-200 ${idx === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                                        {slide.title}
                                    </h1>
                                    
                                    <p className={`text-gray-200 text-lg md:text-xl mb-8 drop-shadow-md font-medium max-w-lg transform transition-all duration-700 delay-300 ${idx === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                                        {slide.subtitle}
                                    </p>
                                    
                                    <div className={`flex flex-wrap gap-4 transform transition-all duration-700 delay-500 ${idx === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                                        <button
                                            onClick={() => navigate('/schemes')}
                                            className="bg-[#16A34A] text-white px-8 py-3.5 rounded-lg font-bold text-base hover:bg-[#15803D] hover:-translate-y-1 transition-all flex items-center gap-2 shadow-lg"
                                        >
                                            {t('hero.exploreSchemes')} <ArrowRight size={18} />
                                        </button>
                                        <button
                                            onClick={() => navigate('/recommendations')}
                                            className="bg-white/10 backdrop-blur-md text-white border border-white/50 px-8 py-3.5 rounded-lg font-bold text-base hover:bg-white/20 hover:-translate-y-1 transition-all shadow-lg"
                                        >
                                            {t('hero.getRecommendations')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Arrows */}
                <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-colors border border-white/30">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-colors border border-white/30">
                    <ChevronRight size={24} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goTo(idx)}
                            className={`rounded-full transition-all duration-300 ${
                                idx === current ? 'bg-[#16A34A] w-8 h-2.5' : 'bg-white/60 w-2.5 h-2.5 hover:bg-white/80'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white border-b border-gray-200 shadow-sm relative z-30 -mt-10 mx-4 md:mx-auto max-w-4xl rounded-2xl p-4">
                <p className="text-center text-gray-500 text-sm mb-3 font-medium tracking-wide">{t('hero.searchFromSchemes')}</p>
                <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white border-2 border-[#16A34A] rounded-xl overflow-hidden shadow-md px-2 py-1">
                    <Search size={24} className="text-[#16A34A] shrink-0 ml-3" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t('hero.searchHeroPlaceholder')}
                        className="flex-1 py-3 px-2 text-base text-gray-800 outline-none bg-transparent placeholder-gray-400"
                    />
                    <button
                        type="submit"
                        className="bg-[#16A34A] text-white px-8 py-3 rounded-lg font-bold text-base hover:bg-[#15803D] transition-colors shrink-0"
                    >
                        {t('hero.searchButton')}
                    </button>
                </form>
            </div>

            {/* Stats Strip */}
            <div className="bg-[#F0FDF4] border-b border-green-100 mt-12 mb-8">
                <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="text-center bg-white p-4 rounded-xl shadow-sm border border-green-50">
                            <p className="text-3xl font-black text-[#16A34A] mb-1">{stat.value}</p>
                            <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;