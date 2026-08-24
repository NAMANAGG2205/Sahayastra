import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getSchemeById, saveFavoriteSchemes, removeFavoriteSchemes, getFavoriteSchemes } from "../../../services/schemes/schemeService";
import { ArrowLeft, Target, List, FileText, Users, Download, Share2, Bookmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ChatBot from "../../common/chatbot/ChatBot";
import { generatePDF } from "../../../helper/generatePdf";
import { shareScheme } from "../../../helper/shareScheme";
import DisplayFormatted from "./components/DisplayFormatted";
import DisplayMarkdown from './components/DisplayMarkdown';
import { toast } from "react-hot-toast";

const SchemeDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [scheme, setScheme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const contentRef = useRef(null);
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    useEffect(() => {
        const fetchSchemeDetails = async () => {
            try {
                const data = await getSchemeById(id);
                setScheme(data);
            } catch (err) {
                setError(t('schemeDetails.failedToFetch'));
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSchemeDetails();
    }, [id]);

    useEffect(() => {
        const checkIfSaved = async () => {
            try {
                const savedSchemes = await getFavoriteSchemes();
                const isSaved = savedSchemes.includes(id);
                setIsSaved(isSaved);
            } catch (error) {
                console.error('Error checking saved status:', error);
            }
        };

        if (id) {
            checkIfSaved();
        }
    }, [id]);

    const handleSaveScheme = async () => {
        if (isSaving) return;

        try {
            setIsSaving(true);
            if (isSaved) {
                await removeFavoriteSchemes(id);
                toast.success(t('schemeDetails.removedFromFavorites'));
            } else {
                await saveFavoriteSchemes(id);
                toast.success(t('schemeDetails.addedToFavorites'));
            }

            setIsSaved(!isSaved);
        } catch (error) {
            console.error('Error managing favorite:', error);
            toast.error(t('schemeDetails.pleaseLoginToSave'));
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <div className="p-4 text-center">{t('schemeDetails.loading')}</div>;
    if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;
    if (!scheme) return <div className="p-4 text-center">{t('schemeDetails.schemeNotFound')}</div>;

    const schemeName = scheme?.schemeName?.label || scheme?.schemeName || '';
    const schemeShortTitle = (scheme?.schemeShortTitle?.label || scheme?.schemeShortTitle || '').toUpperCase();

    const getOfficialUrl = () => {
        if (!scheme?.references || scheme.references.length === 0) return null;
        
        // Find best match for apply/portal
        const bestRef = scheme.references.find(r => {
            const title = (r.title || '').toLowerCase();
            return title.includes('apply') || title.includes('portal') || title.includes('official') || title.includes('website');
        });
        
        let url = null;
        if (bestRef && bestRef.url) {
            url = bestRef.url;
        } else {
            // fallback to first url
            const firstWithUrl = scheme.references.find(r => r.url);
            url = firstWithUrl ? firstWithUrl.url : null;
        }
        
        // Ensure https
        if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://${url}`;
        }
        return url;
    };

    const officialUrl = getOfficialUrl();

    const tabs = [
        { id: 'overview', label: t('schemeDetails.overview'), icon: Target },
        { id: 'eligibility', label: t('schemeDetails.eligibility'), icon: Users },
        { id: 'benefits', label: t('schemeDetails.benefits'), icon: List },
        { id: 'documents', label: t('schemeDetails.documents'), icon: FileText },
        { id: 'apply', label: t('schemeDetails.apply'), icon: FileText },
        { id: 'faq', label: t('schemeDetails.faq'), icon: List },
    ];

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-sm">
                    <a href="/" className="text-gray-500 hover:text-[#16A34A] transition-colors">{t('schemeDetails.home')}</a>
                    <span className="mx-2 text-gray-400">/</span>
                    <a href="/schemes" className="text-gray-500 hover:text-[#16A34A] transition-colors">{t('schemeDetails.schemes')}</a>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-900 font-medium truncate">{scheme?.schemeName?.label || scheme?.schemeName}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
                <div ref={contentRef} className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-8">
                    {/* Header Section */}
                    <header className="border-b border-gray-100 pb-6 relative">
                        {/* Top action row */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                            <span className="inline-block px-3 py-1 bg-[#F0FDF4] text-[#16A34A] text-xs font-bold rounded uppercase tracking-wider border border-green-200">
                                {scheme?.level?.label || scheme?.level || 'Central'}
                            </span>

                            {officialUrl && (
                                <button
                                    onClick={() => window.open(officialUrl, '_blank', 'noopener,noreferrer')}
                                    className="px-6 py-2 bg-[#16A34A] text-white font-bold rounded-lg hover:bg-[#15803D] shadow-sm flex items-center transition-all duration-200"
                                >
                                    {t('schemeDetails.applyNow')}
                                    <Target className="ml-2" size={16} />
                                </button>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 leading-tight">
                            {scheme?.schemeName?.label || scheme?.schemeName}
                        </h1>
                        
                        {scheme?.schemeShortTitle && (
                            <p className="text-gray-500 text-lg font-medium mb-4">
                                ({scheme.schemeShortTitle?.label || scheme.schemeShortTitle})
                            </p>
                        )}

                        {/* Important Details Bar */}
                        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 text-sm bg-gray-50 rounded-lg p-4 border border-gray-100">
                            {scheme?.nodalMinistryName && (
                                <div className="flex flex-col">
                                    <span className="text-gray-500 uppercase tracking-wide text-[10px] font-bold mb-1">{t('schemeDetails.nodalMinistry')}</span>
                                    <span className="font-medium text-gray-900">{scheme.nodalMinistryName?.label || scheme.nodalMinistryName}</span>
                                </div>
                            )}
                            {scheme?.state && (
                                <div className="flex flex-col">
                                    <span className="text-gray-500 uppercase tracking-wide text-[10px] font-bold mb-1">{t('schemeDetails.state')}</span>
                                    <span className="font-medium text-gray-900">{scheme.state?.label || scheme.state}</span>
                                </div>
                            )}
                            {scheme?.tags?.length > 0 && (
                                <div className="flex flex-col w-full mt-2">
                                    <span className="text-gray-500 uppercase tracking-wide text-[10px] font-bold mb-2">{t('schemeDetails.tags')}</span>
                                    <div className="flex flex-wrap gap-2">
                                        {scheme.tags.map((tag, index) => (
                                            <span key={index} className="px-2.5 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium">
                                                {tag?.label || tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 sticky top-16 bg-white z-10 pt-2">
                        <nav className="-mb-px flex space-x-6 overflow-x-auto no-scrollbar">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            flex items-center pb-3 px-1 border-b-2 font-semibold text-sm whitespace-nowrap transition-colors
                                            ${activeTab === tab.id
                                                ? 'border-[#16A34A] text-[#16A34A]'
                                                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                                            }
                                        `}
                                    >
                                        <Icon className="mr-2 shrink-0" size={18} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="py-4">
                        {activeTab === 'overview' && (
                            <DisplayMarkdown content={scheme?.detailedDescription_md} />
                        )}

                        {activeTab === 'eligibility' && (
                            <DisplayMarkdown content={scheme?.eligibilityDescription_md} />
                        )}

                        {activeTab === 'benefits' && (
                            <div className="bg-gray-50 rounded-xl p-6">
                                <DisplayFormatted benefitsData={scheme?.benefits} />
                            </div>
                        )}

                        {activeTab === 'documents' && (
                            <div className="bg-gray-50 rounded-xl p-6">
                                <DisplayFormatted benefitsData={scheme?.documents_required} />
                            </div>
                        )}

                        {activeTab === 'apply' && (
                            <div className="space-y-4">
                                {officialUrl && (
                                    <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-bold text-green-800 text-lg">{t('schemeDetails.officialPortal')}</h3>
                                            <p className="text-green-700 text-sm mt-1">{t('schemeDetails.clickToApply')}</p>
                                            <p className="text-green-600 text-xs mt-1 break-all">{officialUrl}</p>
                                        </div>
                                        <button
                                            onClick={() => window.open(officialUrl, '_blank', 'noopener,noreferrer')}
                                            className="shrink-0 px-6 py-3 bg-[#74B83E] text-white font-bold rounded-xl hover:bg-green-700 flex items-center gap-2 shadow-md transition-all duration-200"
                                        >
                                            <Target size={18} />
                                            {t('schemeDetails.applyNow')}
                                        </button>
                                    </div>
                                )}
                                {scheme?.applicationProcess?.map((process, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="font-semibold text-gray-800 mb-3">{process?.mode?.label || process?.mode}:</h3>
                                        <DisplayFormatted benefitsData={process?.process} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'faq' && scheme?.faqs?.length > 0 && (
                            <div className="space-y-4">
                                {scheme.faqs.map((faq, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="font-semibold text-gray-900 mb-2">{faq.question?.label || faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer?.label || faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
                        {officialUrl && (
                            <button
                                onClick={() => window.open(officialUrl, '_blank', 'noopener,noreferrer')}
                                className="px-6 py-3 bg-[#74B83E] text-white rounded-lg hover:bg-[#629a33] flex items-center gap-2 transition-colors duration-200 shadow-sm font-semibold"
                            >
                                <Target size={20} />
                                {t('schemeDetails.applyOfficialPortal')}
                            </button>
                        )}
                        <button
                            onClick={handleSaveScheme}
                            disabled={isSaving}
                            className={`px-6 py-3 text-white rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-sm ${isSaving ? 'opacity-50 cursor-not-allowed' : ''
                                } ${isSaved
                                    ? 'bg-[#74B83E] hover:bg-[#629a33]'
                                    : 'bg-gray-600 hover:bg-gray-700'
                                }`}
                        >
                            <Bookmark
                                className={`${isSaved ? 'fill-white' : ''} ${isSaving ? 'animate-pulse' : ''}`}
                                size={20}
                            />
                            {isSaving ? t('schemeDetails.processing') : isSaved ? t('schemeDetails.saved') : t('schemeDetails.save')}
                        </button>
                        <button
                            onClick={() => generatePDF(contentRef, scheme?.schemeName)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors duration-200 shadow-sm"
                        >
                            <Download size={20} />
                            {t('schemeDetails.downloadPdf')}
                        </button>
                        <button
                            onClick={() => shareScheme(scheme?.schemeName)}
                            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors duration-200 shadow-sm"
                        >
                            <Share2 size={20} />
                            {t('schemeDetails.share')}
                        </button>
                    </div>
                </div>

                {scheme && <ChatBot schemeId={scheme?._id} />}
            </div>
        </div>
    );
};

export default SchemeDetails;