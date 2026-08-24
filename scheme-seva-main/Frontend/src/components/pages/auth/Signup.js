import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Eye, EyeOff, UserPlus, Loader2, CheckCircle, User, Mail, Lock, Phone, MapPin, Briefcase, DollarSign, Heart } from "lucide-react";
import { useTranslation } from 'react-i18next';
import axios from "axios";

const STATES = [
    "Andaman and Nicobar Islands", "Arunachal Pradesh", "Assam", "Bihar",
    "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
    "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
];

const INCOME_GROUPS = ["EWS", "General", "OBC", "SC", "ST"];

const OCCUPATIONS = [
    "Student", "Farmer / Agriculture", "Business / Entrepreneur",
    "Salaried Employee (Private)", "Salaried Employee (Government)",
    "Self-Employed / Freelancer", "Daily Wage Earner / Laborer",
    "Homemaker", "Retired / Pensioner", "Unemployed", "Other"
];

const INTERESTS = [
    "Women and Child", "Utility & Sanitation", "Travel & Tourism",
    "Transport & Infrastructure", "Sports & Culture", "Social welfare & Empowerment",
    "Skills & Employment", "Science, IT & Communications", "Public Safety, Law & Justice",
    "Housing & Shelter", "Health & Wellness", "Education & Learning",
    "Business & Entrepreneurship", "Banking, Financial Services and Insurance",
    "Agriculture, Rural & Environment"
];

const STEPS = [
    { title: "Account", subtitle: "Basic login details", icon: <Lock size={16}/> },
    { title: "Personal", subtitle: "Your identity", icon: <User size={16}/> },
    { title: "Financial", subtitle: "For better matching", icon: <DollarSign size={16}/> },
    { title: "Interests", subtitle: "Scheme preferences", icon: <Heart size={16}/> },
];

const Signup = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({
        name: "", email: "", password: "", confirmPassword: "",
        phoneNumber: "", gender: "", dob: "", fatherName: "",
        state: "", occupation: "", income: "", incomeGroup: "",
        interests: []
    });

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
    const toggleInterest = (i) => setForm(prev => ({
        ...prev,
        interests: prev.interests.includes(i) ? prev.interests.filter(x => x !== i) : [...prev.interests, i]
    }));

    const validateStep = () => {
        setError("");
        if (step === 0) {
            if (!form.name.trim()) return setError(t('auth.signupPage.fullNameRequired')) || false;
            if (!form.email.trim()) return setError(t('auth.loginPage.emailRequired')) || false;
            if (!form.password) return setError(t('auth.loginPage.passwordRequired')) || false;
            if (form.password.length < 6) return setError(t('auth.signupPage.passwordMin6')) || false;
            if (form.password !== form.confirmPassword) return setError(t('auth.signupPage.passwordsDoNotMatch')) || false;
        }
        return true;
    };

    const next = () => { if (validateStep()) setStep(s => Math.min(s + 1, STEPS.length - 1)); };
    const prev = () => { setError(""); setStep(s => Math.max(s - 1, 0)); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
        try {
            const { confirmPassword, ...payload } = form;
            const response = await axios.post(`${BACKEND_URL}/api/v1/users/signup`, payload);
            if (response.data.success !== false) {
                setSuccess(true);
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setError(response.data.message || t('auth.signupPage.signupFailed'));
            }
        } catch (err) {
            setError(err.response?.data?.message || t('auth.loginPage.errorOccurred'));
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-sm w-full">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={40} className="text-[#16A34A]" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.signupPage.accountCreated')}</h2>
                    <p className="text-gray-500 text-sm">{t('auth.signupPage.redirectingToLogin')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 flex items-center justify-center p-4 py-8">
            <div className="w-full max-w-2xl">

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-[#16A34A] rounded-2xl mb-3 shadow-lg">
                        <UserPlus size={26} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">{t('auth.signupPage.createAccount')}</h1>
                    <p className="text-gray-500 text-sm mt-1">{t('auth.signupPage.joinSahayastra')}</p>
                </div>

                {/* Step Progress */}
                <div className="flex items-center justify-center gap-0 mb-6">
                    {STEPS.map((s, i) => (
                        <React.Fragment key={i}>
                            <div className="flex flex-col items-center">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                    i < step ? 'bg-[#16A34A] text-white' :
                                    i === step ? 'bg-[#16A34A] text-white ring-4 ring-green-100' :
                                    'bg-white border-2 border-gray-200 text-gray-400'
                                }`}>
                                    {i < step ? <CheckCircle size={16}/> : i + 1}
                                </div>
                                <span className={`text-xs mt-1 font-medium hidden sm:block ${i === step ? 'text-[#16A34A]' : 'text-gray-400'}`}>{s.title}</span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-1 mb-4 sm:mb-5 transition-all ${i < step ? 'bg-[#16A34A]' : 'bg-gray-200'}`} style={{width: '40px', minWidth: '20px'}}/>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Card Header */}
                    <div className="px-8 py-5 border-b border-gray-100 flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-[#16A34A]">
                            {STEPS[step].icon}
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900 text-base">{STEPS[step].title} Details</h2>
                            <p className="text-xs text-gray-400">{STEPS[step].subtitle}</p>
                        </div>
                        <span className="ml-auto text-xs text-gray-400 font-medium">{t('auth.signupPage.stepOf', { step: step + 1, total: STEPS.length })}</span>
                    </div>

                    <form onSubmit={step === STEPS.length - 1 ? handleSubmit : (e) => { e.preventDefault(); next(); }}>
                        <div className="px-8 py-6">

                            {/* STEP 0: Account */}
                            {step === 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <Field label={t('auth.signupPage.fullName')} required icon={<User size={15}/>}>
                                            <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder={t('auth.signupPage.yourFullName')} className={inputCls} />
                                        </Field>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <Field label={t('auth.loginPage.emailAddress')} required icon={<Mail size={15}/>}>
                                            <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" className={inputCls} />
                                        </Field>
                                    </div>
                                    <Field label={t('auth.password')} required icon={<Lock size={15}/>}>
                                        <div className="relative">
                                            <input type={showPassword ? "text" : "password"} value={form.password} onChange={e => update('password', e.target.value)} placeholder={t('auth.signupPage.min6Characters')} className={inputCls + " pr-10"} />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><Eye size={16}/></button>
                                        </div>
                                    </Field>
                                    <Field label={t('auth.signupPage.confirmPassword')} required icon={<Lock size={15}/>}>
                                        <div className="relative">
                                            <input type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} placeholder={t('auth.signupPage.reEnterPassword')} className={inputCls + " pr-10"} />
                                            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><EyeOff size={16}/></button>
                                        </div>
                                    </Field>
                                </div>
                            )}

                            {/* STEP 1: Personal */}
                            {step === 1 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label={t('auth.signupPage.fathersName')} icon={<User size={15}/>}>
                                        <input type="text" value={form.fatherName} onChange={e => update('fatherName', e.target.value)} placeholder={t('auth.signupPage.fathersFullName')} className={inputCls} />
                                    </Field>
                                    <Field label={t('auth.signupPage.dateOfBirth')} icon={<User size={15}/>}>
                                        <input type="date" value={form.dob} onChange={e => update('dob', e.target.value)} className={inputCls} />
                                    </Field>
                                    <Field label={t('auth.signupPage.gender')} icon={<User size={15}/>}>
                                        <select value={form.gender} onChange={e => update('gender', e.target.value)} className={inputCls}>
                                            <option value="">{t('auth.signupPage.selectGender')}</option>
                                            <option value="male">{t('auth.signupPage.male')}</option>
                                            <option value="female">{t('auth.signupPage.female')}</option>
                                            <option value="other">{t('auth.signupPage.other')}</option>
                                        </select>
                                    </Field>
                                    <Field label={t('auth.signupPage.phoneNumber')} icon={<Phone size={15}/>}>
                                        <input type="tel" value={form.phoneNumber} onChange={e => update('phoneNumber', e.target.value)} placeholder={t('auth.signupPage.mobileNumber')} pattern="[0-9]{10}" className={inputCls} />
                                    </Field>
                                    <Field label={t('auth.signupPage.stateUt')} icon={<MapPin size={15}/>}>
                                        <select value={form.state} onChange={e => update('state', e.target.value)} className={inputCls}>
                                            <option value="">{t('auth.signupPage.selectState')}</option>
                                            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </Field>
                                    <Field label={t('auth.signupPage.occupation')} icon={<Briefcase size={15}/>}>
                                        <select value={form.occupation} onChange={e => update('occupation', e.target.value)} className={inputCls}>
                                            <option value="">{t('auth.signupPage.selectOccupation')}</option>
                                            {OCCUPATIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    </Field>
                                </div>
                            )}

                            {/* STEP 2: Financial */}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Field label={t('auth.signupPage.annualIncome')} icon={<DollarSign size={15}/>}>
                                            <input type="number" value={form.income} onChange={e => update('income', e.target.value)} placeholder={t('auth.signupPage.incomeExample')} min="0" className={inputCls} />
                                        </Field>
                                        <Field label={t('auth.signupPage.incomeGroup')} icon={<DollarSign size={15}/>}>
                                            <select value={form.incomeGroup} onChange={e => update('incomeGroup', e.target.value)} className={inputCls}>
                                                <option value="">{t('auth.signupPage.selectCategory')}</option>
                                                {INCOME_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                                            </select>
                                        </Field>
                                    </div>
                                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                                        <p className="text-sm text-amber-700">{t('auth.signupPage.whyWeAsk')}</p>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Interests */}
                            {step === 3 && (
                                <div>
                                    <p className="text-sm text-gray-500 mb-4">{t('auth.signupPage.selectInterests')}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {INTERESTS.map(interest => (
                                            <button key={interest} type="button" onClick={() => toggleInterest(interest)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                                                    form.interests.includes(interest)
                                                        ? 'bg-[#16A34A] text-white border-[#16A34A]'
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#16A34A] hover:text-[#16A34A]'
                                                }`}
                                            >
                                                {form.interests.includes(interest) ? "✓ " : ""}{interest}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-3">{form.interests.length} {t('auth.signupPage.selectedCount')}</p>
                                </div>
                            )}

                            {/* Error */}
                            {error && (
                                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                                    {error}
                                </div>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4">
                            <div>
                                {step === 0 ? (
                                    <Link to="/login" className="text-sm text-gray-500 hover:text-[#16A34A] font-medium transition-colors">
                                        {t('auth.signupPage.alreadyHaveAccount')}
                                    </Link>
                                ) : (
                                    <button type="button" onClick={prev} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors">
                                        <ArrowLeft size={15}/> {t('auth.signupPage.back')}
                                    </button>
                                )}
                            </div>
                            <div className="flex gap-3">
                                {step < STEPS.length - 1 && (
                                    <button type="button" onClick={() => setStep(s => Math.min(s + 1, STEPS.length - 1))}
                                        className="text-sm text-gray-400 hover:text-gray-600 px-3 py-2 transition-colors">
                                        {t('auth.signupPage.skip')}
                                    </button>
                                )}
                                <button type="submit" disabled={loading}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-[#16A34A] text-white rounded-xl font-bold text-sm hover:bg-[#15803D] transition-all shadow-sm disabled:opacity-60">
                                    {loading ? (
                                        <><Loader2 size={16} className="animate-spin"/> {t('auth.signupPage.creating')}</>
                                    ) : step === STEPS.length - 1 ? (
                                        <><CheckCircle size={16}/> {t('auth.signupPage.createAccountBtn')}</>
                                    ) : (
                                        <>{t('auth.signupPage.next')} <ArrowRight size={16}/></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const inputCls = "block w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A] outline-none text-gray-800 transition-all";

const Field = ({ label, icon, required, children }) => (
    <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
            {icon && <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">{icon}</div>}
            {children}
        </div>
    </div>
);

export default Signup;
