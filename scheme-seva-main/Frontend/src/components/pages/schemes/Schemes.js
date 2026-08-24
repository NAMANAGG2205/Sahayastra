import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import SchemeCard from "../../common/schemeCard/SchemeCard";
import { getFilteredSchemes, getAllSchemes } from '../../../services/schemes/schemeService';
import Pagination from '../../common/pagination/Pagination';

const CATEGORIES = [
    "Women and Child", "Utility & Sanitation", "Travel & Tourism",
    "Transport & Infrastructure", "Social welfare & Empowerment",
    "Skills & Employment", "Science, IT & Communications",
    "Public Safety, Law & Justice", "Housing & Shelter",
    "Health & Wellness", "Education & Learning",
    "Business & Entrepreneurship", "Banking, Financial Services and Insurance",
    "Agriculture, Rural & Environment"
];

const STATES = [
    "Andaman and Nicobar Islands", "Arunachal Pradesh", "Assam", "Bihar",
    "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
    "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Chandigarh", "Delhi", "Puducherry"
];

const LEVELS = ["Central", "State", "State/ UT"];

const FilterSelect = ({ label, name, value, onChange, options }) => (
    <div className="relative">
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">{label}</label>
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] transition-colors"
            >
                <option value="">All {label}</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
    </div>
);

const Schemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalSchemes, setTotalSchemes] = useState(0);
    const [filters, setFilters] = useState({});
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarFilters, setSidebarFilters] = useState({ state: '', level: '', category: '' });
    const location = useLocation();

    // Pick up ?search= from URL (from hero search bar)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('search');
        if (q) {
            setSearchInput(q);
            setFilters({ search: q });
        }
    }, [location.search]);

    const fetchSchemes = useCallback(async (page) => {
        try {
            setLoading(true);
            setError(null);
            const activeFilters = { ...filters, ...sidebarFilters };
            const hasFilters = Object.values(activeFilters).some(v => v && v.trim());
            const data = hasFilters
                ? await getFilteredSchemes(activeFilters, page)
                : await getAllSchemes(page);
            setSchemes(data.schemes);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
            setTotalSchemes(data.totalSchemes);
        } catch (err) {
            setError("Failed to fetch schemes. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [filters, sidebarFilters]);

    useEffect(() => {
        fetchSchemes(currentPage);
    }, [currentPage, fetchSchemes]);

    const handleSearch = (e) => {
        e.preventDefault();
        setFilters({ search: searchInput });
        setCurrentPage(1);
    };

    const handleSidebarChange = (e) => {
        setSidebarFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSidebarFilters({ state: '', level: '', category: '' });
        setSearchInput('');
        setFilters({});
        setCurrentPage(1);
    };

    const hasActiveFilters = Object.values(sidebarFilters).some(v => v) || filters.search;

    return (
        <div className="bg-[#F9FAFB] min-h-screen">
            {/* Page Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">All Schemes</h1>
                    <p className="text-gray-500 text-sm">Search and discover government schemes from Central and State governments</p>

                    {/* Top Search */}
                    <form onSubmit={handleSearch} className="mt-4 flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus-within:border-[#16A34A] focus-within:ring-1 focus-within:ring-[#16A34A] transition-all max-w-2xl">
                        <Search size={16} className="text-gray-400 shrink-0" />
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search by scheme name, keyword, ministry..."
                            className="flex-1 py-1.5 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
                        />
                        {searchInput && (
                            <button type="button" onClick={() => { setSearchInput(''); setFilters({}); }} className="text-gray-400 hover:text-gray-600">
                                <X size={15} />
                            </button>
                        )}
                        <button type="submit" className="bg-[#16A34A] text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-[#15803D] transition-colors shrink-0">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
                {/* Sidebar Filters */}
                <aside className={`w-64 shrink-0 hidden lg:block`}>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 sticky top-24">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                                <SlidersHorizontal size={15} /> Filters
                            </h3>
                            {hasActiveFilters && (
                                <button onClick={clearFilters} className="text-xs text-[#16A34A] hover:underline font-medium">
                                    Clear all
                                </button>
                            )}
                        </div>
                        <div className="space-y-4">
                            <FilterSelect label="State" name="state" value={sidebarFilters.state} onChange={handleSidebarChange} options={STATES} />
                            <FilterSelect label="Level" name="level" value={sidebarFilters.level} onChange={handleSidebarChange} options={LEVELS} />
                            <FilterSelect label="Category" name="category" value={sidebarFilters.category} onChange={handleSidebarChange} options={CATEGORIES} />
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    {/* Results count + mobile filter btn */}
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-gray-500">
                            {loading ? 'Loading...' : `${totalSchemes} schemes found`}
                        </p>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-1.5"
                        >
                            <SlidersHorizontal size={14} /> Filters
                        </button>
                    </div>

                    {/* Mobile filter panel */}
                    {sidebarOpen && (
                        <div className="lg:hidden bg-white border border-gray-200 rounded-xl p-4 mb-4">
                            <div className="grid grid-cols-2 gap-3">
                                <FilterSelect label="State" name="state" value={sidebarFilters.state} onChange={handleSidebarChange} options={STATES} />
                                <FilterSelect label="Level" name="level" value={sidebarFilters.level} onChange={handleSidebarChange} options={LEVELS} />
                                <FilterSelect label="Category" name="category" value={sidebarFilters.category} onChange={handleSidebarChange} options={CATEGORIES} />
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4 text-sm">{error}</div>
                    )}

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl h-64 animate-pulse">
                                    <div className="h-1.5 bg-green-200 rounded-t-xl" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                                        <div className="h-4 bg-gray-200 rounded w-4/5" />
                                        <div className="h-4 bg-gray-200 rounded w-3/5" />
                                        <div className="h-3 bg-gray-100 rounded w-full mt-2" />
                                        <div className="h-3 bg-gray-100 rounded w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : schemes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {schemes.map((scheme) => (
                                <Link to={`/scheme/${scheme._id}`} key={scheme._id}>
                                    <SchemeCard scheme={scheme} />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <Search size={48} className="text-gray-300 mx-auto mb-4" />
                            <p className="text-lg font-semibold text-gray-600">No schemes found</p>
                            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
                            <button onClick={clearFilters} className="mt-4 text-[#16A34A] text-sm font-medium hover:underline">Clear filters</button>
                        </div>
                    )}

                    {!loading && schemes.length > 0 && (
                        <div className="mt-8">
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => { setCurrentPage(p); window.scrollTo(0, 0); }} />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Schemes;
