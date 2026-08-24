import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Wheat, Heart, GraduationCap, Home, Briefcase, Banknote,
    Shield, FlaskConical, Zap, Users, Trophy, Bus, Plane,
    Droplets, Baby
} from 'lucide-react';

const CATEGORIES_CONFIG = [
    { key: 'agriculture', icon: Wheat, color: 'bg-green-50 text-green-700 border-green-200', query: 'Agriculture' },
    { key: 'banking', icon: Banknote, color: 'bg-blue-50 text-blue-700 border-blue-200', query: 'Banking' },
    { key: 'business', icon: Briefcase, color: 'bg-orange-50 text-orange-700 border-orange-200', query: 'Business' },
    { key: 'education', icon: GraduationCap, color: 'bg-purple-50 text-purple-700 border-purple-200', query: 'Education' },
    { key: 'health', icon: Heart, color: 'bg-red-50 text-red-700 border-red-200', query: 'Health' },
    { key: 'housing', icon: Home, color: 'bg-yellow-50 text-yellow-700 border-yellow-200', query: 'Housing' },
    { key: 'safety', icon: Shield, color: 'bg-slate-50 text-slate-700 border-slate-200', query: 'Safety' },
    { key: 'science', icon: FlaskConical, color: 'bg-cyan-50 text-cyan-700 border-cyan-200', query: 'Science' },
    { key: 'skills', icon: Zap, color: 'bg-amber-50 text-amber-700 border-amber-200', query: 'Skills' },
    { key: 'social', icon: Users, color: 'bg-pink-50 text-pink-700 border-pink-200', query: 'Social' },
    { key: 'sports', icon: Trophy, color: 'bg-lime-50 text-lime-700 border-lime-200', query: 'Sports' },
    { key: 'transport', icon: Bus, color: 'bg-indigo-50 text-indigo-700 border-indigo-200', query: 'Transport' },
    { key: 'tourism', icon: Plane, color: 'bg-sky-50 text-sky-700 border-sky-200', query: 'Tourism' },
    { key: 'utility', icon: Droplets, color: 'bg-teal-50 text-teal-700 border-teal-200', query: 'Utility' },
    { key: 'women', icon: Baby, color: 'bg-rose-50 text-rose-700 border-rose-200', query: 'Women' },
];

const Categories = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const categories = CATEGORIES_CONFIG.map(cat => ({
        ...cat,
        label: t(`categories.${cat.key}`)
    }));

    return (
        <section className="bg-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('categories.title')}</h2>
                    <p className="text-gray-500 mt-2 text-sm">{t('categories.subtitle')}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.label}
                                onClick={() => navigate(`/schemes?search=${encodeURIComponent(cat.query)}`)}
                                className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${
                                    cat.color
                                } hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer`}
                            >
                                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                                    <Icon size={20} />
                                </div>
                                <span className="text-xs font-medium leading-tight">{cat.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Categories;
