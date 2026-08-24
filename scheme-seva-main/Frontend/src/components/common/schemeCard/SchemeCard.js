import { ArrowRight, Building2, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DisplayMarkdown from '../../pages/schemeDetails/components/DisplayMarkdown';

const CATEGORY_COLORS = [
    'bg-green-50 text-green-700',
    'bg-blue-50 text-blue-700',
    'bg-purple-50 text-purple-700',
    'bg-orange-50 text-orange-700',
    'bg-pink-50 text-pink-700',
    'bg-teal-50 text-teal-700',
    'bg-amber-50 text-amber-700',
    'bg-red-50 text-red-700',
];

const hashStr = (str) => {
    let h = 0;
    for (let i = 0; i < (str || '').length; i++) {
        h = ((h << 5) - h) + str.charCodeAt(i);
        h = h & h;
    }
    return Math.abs(h);
};

const SchemeCard = ({ scheme }) => {
    const { t } = useTranslation();
    const name = scheme?.schemeName?.label || scheme?.schemeName || 'Scheme';
    const ministry = scheme?.nodalMinistryName?.label || scheme?.nodalMinistryName || '';
    const level = scheme?.level || '';
    const tags = (scheme?.tags || []).slice(0, 3);
    const extraTags = (scheme?.tags || []).length - 3;
    const colorIdx = hashStr(name) % CATEGORY_COLORS.length;
    const tagColor = CATEGORY_COLORS[colorIdx];

    return (
        <div className="group bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-[#16A34A]/30 transition-all duration-300 flex flex-col h-full overflow-hidden">
            {/* Colored top accent bar */}
            <div className={`h-1.5 w-full ${tagColor.split(' ')[0]}`} />

            <div className="p-5 flex flex-col flex-grow">
                {/* Level badge + Ministry */}
                <div className="flex items-start justify-between gap-2 mb-3">
                    {level && (
                        <span className="inline-block px-2 py-0.5 bg-[#F0FDF4] text-[#16A34A] text-[10px] font-bold rounded uppercase tracking-wider border border-green-200 shrink-0">
                            {level}
                        </span>
                    )}
                    {ministry && (
                        <p className="text-gray-400 text-[11px] text-right leading-tight line-clamp-2 flex items-center gap-1">
                            <Building2 size={10} className="shrink-0" />
                            {ministry}
                        </p>
                    )}
                </div>

                {/* Scheme Name */}
                <h2 className="text-gray-900 font-bold text-base leading-snug mb-2 group-hover:text-[#16A34A] transition-colors line-clamp-2">
                    {name}
                </h2>

                {/* Short description */}
                <div className="text-gray-500 text-xs leading-relaxed line-clamp-3 flex-grow mb-3">
                    <DisplayMarkdown content={scheme?.detailedDescription_md} />
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {tags.map((tag, i) => (
                            <span key={i} className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${tagColor} flex items-center gap-1`}>
                                <Tag size={8} />
                                {tag?.label || tag}
                            </span>
                        ))}
                        {extraTags > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-500">
                                +{extraTags} {t('commonComponents.more')}
                            </span>
                        )}
                    </div>
                )}

                {/* Action button */}
                <button className="w-full flex items-center justify-center gap-2 py-2 border border-[#16A34A] text-[#16A34A] rounded-lg text-sm font-semibold hover:bg-[#16A34A] hover:text-white transition-colors duration-200 group/btn mt-auto">
                    {t('commonComponents.viewDetails')}
                    <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default SchemeCard;