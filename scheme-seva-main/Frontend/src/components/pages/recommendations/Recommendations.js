import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SchemeCard from '../../common/schemeCard/SchemeCard';
import Pagination from '../../common/pagination/Pagination';
import { getPersonalizedRecommendations } from '../../../services/recommendations/recommendationService';

const Recommendations = () => {
    const { t } = useTranslation();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalSchemes, setTotalSchemes] = useState(0);
    const [error, setError] = useState(null);

    const fetchRecommendations = useCallback(async (page) => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPersonalizedRecommendations(page);
            
            setRecommendations(data.schemes);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
            setTotalSchemes(data.totalSchemes);
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
            setError(t('recommendations.failedToFetchRetry'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRecommendations(currentPage);
    }, [currentPage, fetchRecommendations]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const recommendationsCountText = totalSchemes > 0 
        ? `${t('recommendations.showingOf')} ${(currentPage-1)*9}-${currentPage*9} ${t('recommendations.of')} ${totalSchemes} ${t('recommendations.recommendedSchemes')}`
        : '';

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#74B83E]"></div>
                <p className="mt-2 text-xl">{t('recommendations.loadingRecommendations')}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen pb-16">
            
            {/* Hero Banner */}
            <div className="relative h-[300px] overflow-hidden mb-12">
                <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80"
                    alt="Data Analytics and Smart Recommendations"
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#74B83E]/90 to-[#3b82f6]/70 flex items-center">
                    <div className="container mx-auto px-4 lg:px-8 text-white">
                        <h1 className="text-4xl md:text-5xl font-black mb-4">{t('recommendations.recommendedForYou')}</h1>
                        <p className="text-white/90 text-lg max-w-2xl">
                            {t('recommendations.intelligentEngineDescription')}
                        </p>
                    </div>
                </div>
            </div>

            <section className="container mx-auto px-4 lg:px-8">
                
                {/* How it works info card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{t('recommendations.smartMatchTechnology')}</h3>
                        <p className="text-gray-600">
                            {t('recommendations.smartMatchDescription')}
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
                        <p>{error}</p>
                    </div>
                )}

                {recommendationsCountText && (
                    <p className="text-gray-600 mb-4">{recommendationsCountText}</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recommendations.map((scheme) => (
                        <Link to={`/scheme/${scheme._id}`} key={scheme._id}>
                            <SchemeCard scheme={scheme} />
                        </Link>
                    ))}
                </div>

                {!loading && recommendations.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}

                {recommendations.length === 0 && !loading && (
                    <div className="text-center py-8">
                        <Search size={48} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-xl text-gray-600">
                            {t('recommendations.noRecommendationsFoundUpdate')}
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Recommendations;
