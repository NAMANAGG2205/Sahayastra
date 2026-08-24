import React, { useState, useContext, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, User, LogOut, UserCircle, Globe } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import userAuthenticatedAxiosInstance from "../../../services/users/userAuthenticatedAxiosInstance";
import lionlogo from "../../../assets/circular_logo.jpg";
import { useTranslation } from 'react-i18next';

const INDIAN_LANGUAGES = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

const Header = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(INDIAN_LANGUAGES[0]);
    const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const profileRef = useRef(null);
    const langRef = useRef(null);
    const userAxiosInstance = userAuthenticatedAxiosInstance('/api/v1/users');

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setIsProfileOpen(false);
            }
            if (langRef.current && !langRef.current.contains(e.target)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => { setIsOpen(false); }, [location]);

    const handleLanguageChange = (lang) => {
        setSelectedLang(lang);
        i18n.changeLanguage(lang.code);
        setIsLangOpen(false);
    };

    const handleLogout = async () => {
        try {
            await userAxiosInstance.post("/logout");
        } catch (e) {}
        finally {
            localStorage.removeItem("accessToken");
            setIsUserLoggedIn(false);
            setIsProfileOpen(false);
            navigate("/");
        }
    };

    const navLinks = [
        { to: '/', label: t('header.home') },
        { to: '/schemes', label: t('header.schemes') },
        { to: '/recommendations', label: t('header.suggests') },
        { to: '/about', label: t('header.about') },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            {/* Top utility bar */}
            <div className="bg-[#16A34A] text-white text-xs py-1 px-4 text-center hidden md:block">
                {t('header.governmentPortal')}
            </div>

            {/* Main nav */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 shrink-0 group">
                    <div className="relative">
                        <img src={lionlogo} alt="Sahayastra" className="h-24 w-24 rounded-full object-cover transition-transform group-hover:scale-105 shadow-sm" />
                        <div className="absolute inset-0 bg-[#16A34A]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="hidden sm:block">
                        <span className="text-[#16A34A] text-2xl font-bold tracking-tight group-hover:text-[#15803D] transition-colors">Sahayastra</span>
                        <p className="text-gray-500 text-[11px] leading-tight tracking-wider uppercase font-medium">{t('header.schemePortal')}</p>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive(link.to)
                                    ? 'bg-green-50 text-[#16A34A] font-semibold'
                                    : 'text-gray-600 hover:text-[#16A34A] hover:bg-green-50'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* Language Selector */}
                    <div className="relative" ref={langRef}>
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-full px-3 py-1.5 text-sm font-medium hover:bg-gray-100 transition-colors"
                        >
                            <Globe size={16} />
                            <span className="hidden sm:block">{selectedLang.native}</span>
                            <ChevronDown size={14} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isLangOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 max-h-64 overflow-y-auto">
                                {INDIAN_LANGUAGES.map(lang => (
                                    <button
                                        key={lang.code}
                                        onClick={() => handleLanguageChange(lang)}
                                        className={`flex items-center gap-2 w-full px-4 py-2 text-sm transition-colors ${
                                            selectedLang.code === lang.code 
                                                ? 'bg-green-50 text-[#16A34A] font-medium' 
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <span className="text-base">{lang.native}</span>
                                        <span className="text-xs text-gray-400 ml-auto">{lang.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {isUserLoggedIn ? (
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 bg-green-50 border border-green-200 text-[#16A34A] rounded-full px-3 py-1.5 text-sm font-medium hover:bg-green-100 transition-colors"
                            >
                                <UserCircle size={18} />
                                <span className="hidden sm:block">{t('header.account')}</span>
                                <ChevronDown size={14} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-2">
                                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-[#16A34A] transition-colors" onClick={() => setIsProfileOpen(false)}>
                                        <User size={15} /> {t('header.myProfile')}
                                    </Link>
                                    <hr className="my-1 border-gray-100" />
                                    <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                        <LogOut size={15} /> {t('header.signOut')}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="bg-[#16A34A] text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-[#15803D] transition-colors shadow-sm">
                            {t('header.signIn')}
                        </Link>
                    )}

                    {/* Mobile menu btn */}
                    <button className="md:hidden text-gray-600 p-1" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`block px-3 py-2 rounded-md text-sm font-medium ${
                                isActive(link.to) ? 'bg-green-50 text-[#16A34A]' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {!isUserLoggedIn && (
                        <Link to="/login" className="block mt-2 text-center bg-[#16A34A] text-white py-2 rounded-md text-sm font-semibold">
                            {t('header.signIn')}
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;