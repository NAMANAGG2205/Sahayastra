import { Info, Target, Users, Shield, Sparkles, Globe, HeartHandshake } from "lucide-react";
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
    const { t } = useTranslation();
    return (
        <section className="px-8 py-20 relative bg-white overflow-hidden">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#74B83E]/10 text-[#74B83E] font-semibold text-sm mb-4">
                        <Sparkles size={16} />
                        <span>{t('about.discover')}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                        {t('about.title')}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {t('about.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Image Grid Column */}
                    <div className="grid grid-cols-2 gap-4 relative">
                        {/* Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#74B83E]/20 to-[#3b82f6]/20 rounded-full blur-3xl -z-10"></div>
                        
                        <div className="space-y-4 translate-y-8">
                            <div className="rounded-3xl overflow-hidden h-[300px] shadow-xl hover:scale-[1.02] transition-transform duration-500">
                                <img 
                                    src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80" 
                                    alt="Community empowerment" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="rounded-3xl overflow-hidden h-[200px] shadow-xl hover:scale-[1.02] transition-transform duration-500">
                                <img 
                                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" 
                                    alt="Growth and agriculture" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="space-y-4 -translate-y-8">
                            <div className="rounded-3xl overflow-hidden h-[200px] shadow-xl hover:scale-[1.02] transition-transform duration-500">
                                <img 
                                    src="https://images.unsplash.com/photo-1593095034878-c05bcddcbcd9?auto=format&fit=crop&w=800&q=80" 
                                    alt="Rural development" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="rounded-3xl overflow-hidden h-[300px] shadow-xl hover:scale-[1.02] transition-transform duration-500">
                                <img 
                                    src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80" 
                                    alt="Digital India" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Text Details Column */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('about.philosophy')}</h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                {t('about.philosophyText')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <Target className="text-[#74B83E] mb-4 group-hover:scale-110 transition-transform" size={32} />
                                <h4 className="font-bold mb-2 text-gray-800">{t('about.mission')}</h4>
                                <p className="text-sm text-gray-600">{t('about.missionText')}</p>
                            </div>
                            
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <Globe className="text-[#3b82f6] mb-4 group-hover:scale-110 transition-transform" size={32} />
                                <h4 className="font-bold mb-2 text-gray-800">{t('about.reach')}</h4>
                                <p className="text-sm text-gray-600">{t('about.reachText')}</p>
                            </div>
                            
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <Shield className="text-[#8b5cf6] mb-4 group-hover:scale-110 transition-transform" size={32} />
                                <h4 className="font-bold mb-2 text-gray-800">{t('about.accuracy')}</h4>
                                <p className="text-sm text-gray-600">{t('about.accuracyText')}</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <HeartHandshake className="text-[#f59e0b] mb-4 group-hover:scale-110 transition-transform" size={32} />
                                <h4 className="font-bold mb-2 text-gray-800">{t('about.inclusivity')}</h4>
                                <p className="text-sm text-gray-600">{t('about.inclusivityText')}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutUs;
