import React, { useState, useEffect } from "react";
import {
    User, Mail, Phone, DollarSign, MapPin,
    Calendar, Edit2, Save, X, Star, Shield,
    Briefcase, Heart, CheckCircle, ChevronRight, Home,
    Award, TrendingUp, Bell, Settings, Camera, Lock
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import { getUserProfile, updateUserProfile } from "../../../services/users/user";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const INCOME_GROUPS = ["EWS", "General", "OBC", "SC", "ST"];

const STATES = [
    "Andaman and Nicobar Islands", "Arunachal Pradesh", "Assam", "Bihar",
    "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
    "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
];

const INTERESTS = [
    "Women and Child", "Utility & Sanitation", "Travel & Tourism",
    "Transport & Infrastructure", "Sports & Culture", "Social welfare & Empowerment",
    "Skills & Employment", "Science, IT & Communications", "Public Safety, Law & Justice",
    "Housing & Shelter", "Health & Wellness", "Education & Learning",
    "Business & Entrepreneurship", "Banking, Financial Services and Insurance",
    "Agriculture, Rural & Environment"
];

const INTEREST_ICONS = {
    "Women and Child": "👩‍👧", "Utility & Sanitation": "🚿", "Travel & Tourism": "✈️",
    "Transport & Infrastructure": "🚇", "Sports & Culture": "🏆", "Social welfare & Empowerment": "🤝",
    "Skills & Employment": "💼", "Science, IT & Communications": "💻", "Public Safety, Law & Justice": "⚖️",
    "Housing & Shelter": "🏠", "Health & Wellness": "🏥", "Education & Learning": "🎓",
    "Business & Entrepreneurship": "📈", "Banking, Financial Services and Insurance": "🏦",
    "Agriculture, Rural & Environment": "🌾"
};

const OCCUPATIONS = [
    "Student", "Farmer / Agriculture", "Business / Entrepreneur",
    "Salaried Employee (Private)", "Salaried Employee (Government)",
    "Self-Employed / Freelancer", "Daily Wage Earner / Laborer",
    "Homemaker", "Retired / Pensioner", "Unemployed", "Other"
];

const TABS = ["Personal Info", "Financial Info", "Interests"];

const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
};

const getProfileCompletion = (data) => {
    const fields = ["name", "phoneNumber", "gender", "dob", "fatherName", "state", "occupation", "income", "incomeGroup"];
    const filled = fields.filter(f => data[f] && data[f] !== "").length;
    const hasInterests = data.interests?.length > 0;
    return Math.round(((filled + (hasInterests ? 1 : 0)) / (fields.length + 1)) * 100);
};

const AVATAR_COLORS = [
    ['#16a34a', '#15803d'], ['#0ea5e9', '#0369a1'],
    ['#8b5cf6', '#7c3aed'], ['#f59e0b', '#d97706'],
    ['#ec4899', '#db2777']
];

const Profile = () => {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [colorIdx] = useState(0);
    const [userData, setUserData] = useState({
        name: "", email: "", phoneNumber: "", interests: [],
        incomeGroup: "", state: "", age: "", gender: "", role: "", favorites: [],
        dob: "", fatherName: "", occupation: "", income: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUserProfile();
                console.log('Profile response:', response);
                if (response.success) {
                    console.log('User data from API:', response.data);
                    setUserData(response.data);
                } else {
                    toast.error(t('profile.failedToFetch'));
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                toast.error(error.response?.data?.message || t('profile.errorFetching'));
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleInterestsChange = (interest) => {
        setUserData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting user data:', userData);
            const response = await updateUserProfile(userData);
            console.log('Update response:', response);
            if (response.success) {
                toast.success(t('profile.profileUpdated'));
                setIsEditing(false);
            } else {
                toast.error(t('profile.failedToUpdate'));
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            console.error('Error response:', error.response);
            toast.error(error.response?.data?.message || error.message || t('profile.errorUpdating'));
        }
    };

    const completion = getProfileCompletion(userData);
    const [color1, color2] = AVATAR_COLORS[colorIdx];

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #eff6ff 100%)' }}>

            {/* Breadcrumb */}
            <div style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e5e7eb', padding: '12px 24px' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280', textDecoration: 'none' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#16a34a'}
                        onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}>
                        <Home size={14} /> Home
                    </Link>
                    <ChevronRight size={13} />
                    <span style={{ color: '#111827', fontWeight: 600 }}>My Profile</span>
                </div>
            </div>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px', display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

                {/* ── LEFT SIDEBAR ── */}
                <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Avatar Card */}
                    <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #f0f0f0' }}>
                        {/* Gradient Banner */}
                        <div style={{ height: '80px', background: `linear-gradient(135deg, ${color1}, ${color2})`, position: 'relative' }}>
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        </div>
                        <div style={{ padding: '0 20px 24px', textAlign: 'center' }}>
                            {/* Avatar */}
                            <div style={{ position: 'relative', display: 'inline-block', marginTop: '-44px', marginBottom: '12px' }}>
                                <div style={{
                                    width: '88px', height: '88px', borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${color1}, ${color2})`,
                                    border: '4px solid white', boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '28px', fontWeight: 800, color: 'white', margin: '0 auto'
                                }}>
                                    {getInitials(userData.name)}
                                </div>
                                {completion === 100 && (
                                    <div style={{ position: 'absolute', bottom: '2px', right: '2px', background: 'white', borderRadius: '50%', padding: '2px' }}>
                                        <CheckCircle size={18} style={{ color: '#16a34a' }} fill="#16a34a" />
                                    </div>
                                )}
                            </div>

                            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: '0 0 4px' }}>
                                {userData.name || 'Citizen'}
                            </h2>
                            <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 12px' }}>{userData.email}</p>

                            {/* Role badge */}
                            <span style={{ display: 'inline-block', padding: '4px 14px', background: '#f0fdf4', color: '#16a34a', borderRadius: '20px', fontSize: '11px', fontWeight: 700, border: '1px solid #bbf7d0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {userData.role || 'User'}
                            </span>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div style={{ background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px' }}>Overview</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <StatRow icon={<Star size={15} style={{ color: '#f59e0b' }} />} label="Saved Schemes" value={userData.favorites?.length || 0} color="#fef3c7" />
                            <StatRow icon={<Heart size={15} style={{ color: '#ec4899' }} />} label="Interests" value={userData.interests?.length || 0} color="#fce7f3" />
                            <StatRow icon={<Award size={15} style={{ color: '#8b5cf6' }} />} label="Profile Score" value={`${completion}%`} color="#f3e8ff" />
                        </div>
                    </div>

                    {/* Completion Card */}
                    <div style={{ background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <p style={{ fontSize: '12px', fontWeight: 700, color: '#374151' }}>Profile Completion</p>
                            <span style={{ fontSize: '16px', fontWeight: 800, color: completion === 100 ? '#16a34a' : '#f59e0b' }}>{completion}%</span>
                        </div>
                        <div style={{ width: '100%', background: '#f3f4f6', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${completion}%`, height: '100%', borderRadius: '10px',
                                background: completion === 100 ? 'linear-gradient(90deg, #16a34a, #22c55e)' : 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                                transition: 'width 0.8s ease'
                            }} />
                        </div>
                        {completion < 100 && (
                            <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '8px' }}>
                                Complete your profile to get better scheme recommendations
                            </p>
                        )}
                        {completion === 100 && (
                            <p style={{ fontSize: '11px', color: '#16a34a', marginTop: '8px', fontWeight: 600 }}>
                                ✓ Profile complete! You'll get the best recommendations.
                            </p>
                        )}
                    </div>

                    {/* Quick info pills */}
                    {(userData.state || userData.occupation) && (
                        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
                            <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>Quick Info</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {userData.state && <QuickInfoPill icon={<MapPin size={13} />} text={userData.state} />}
                                {userData.occupation && <QuickInfoPill icon={<Briefcase size={13} />} text={userData.occupation} />}
                                {userData.gender && <QuickInfoPill icon={<User size={13} />} text={userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)} />}
                                {userData.incomeGroup && <QuickInfoPill icon={<Shield size={13} />} text={userData.incomeGroup} />}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── MAIN CONTENT ── */}
                <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Top action bar */}
                    <div style={{ background: 'white', borderRadius: '20px', padding: '16px 24px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: 0 }}>
                                {isEditing ? '✏️ Edit Profile' : `Welcome back, ${userData.name?.split(' ')[0] || 'there'}!`}
                            </h1>
                            <p style={{ fontSize: '13px', color: '#6b7280', margin: '2px 0 0' }}>
                                {isEditing ? 'Update your information below' : 'Manage your profile and preferences'}
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {!isEditing ? (
                                <button onClick={() => setIsEditing(true)} style={{
                                    display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 20px',
                                    background: 'linear-gradient(135deg, #16a34a, #15803d)', color: 'white',
                                    border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '13px',
                                    cursor: 'pointer', boxShadow: '0 4px 12px rgba(22,163,74,0.35)', transition: 'all 0.2s'
                                }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <Edit2 size={14} /> Edit Profile
                                </button>
                            ) : (
                                <button onClick={() => setIsEditing(false)} style={{
                                    display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 20px',
                                    background: 'white', color: '#6b7280', border: '1.5px solid #e5e7eb',
                                    borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer'
                                }}>
                                    <X size={14} /> Cancel
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Tab Card */}
                    <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #f0f0f0' }}>
                        {/* Tabs */}
                        <div style={{ display: 'flex', borderBottom: '1px solid #f3f4f6', padding: '0 8px' }}>
                            {[
                                { label: 'Personal Info', icon: <User size={14} /> },
                                { label: 'Financial Info', icon: <DollarSign size={14} /> },
                                { label: 'Interests', icon: <Heart size={14} /> },
                            ].map((tab, i) => (
                                <button key={i} onClick={() => setActiveTab(i)} style={{
                                    flex: 1, padding: '16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    gap: '6px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 700,
                                    color: activeTab === i ? '#16a34a' : '#9ca3af',
                                    borderBottom: activeTab === i ? '2.5px solid #16a34a' : '2.5px solid transparent',
                                    transition: 'all 0.2s', marginBottom: '-1px'
                                }}>
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
                        </div>

                        <div style={{ padding: '28px' }}>
                            {isEditing ? (
                                <form onSubmit={handleSubmit}>
                                    {/* ── EDIT: Personal ── */}
                                    {activeTab === 0 && (
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                                            <PremiumInput label="Full Name" name="name" value={userData.name} onChange={handleChange} required icon={<User size={14} />} />
                                            <PremiumInput label="Father's Name" name="fatherName" value={userData.fatherName} onChange={handleChange} icon={<User size={14} />} />
                                            <PremiumInput label="Date of Birth" name="dob" type="date" value={userData.dob ? userData.dob.split('T')[0] : ''} onChange={handleChange} icon={<Calendar size={14} />} />
                                            <PremiumInput label="Age" name="age" type="number" min="0" max="120" value={userData.age} onChange={handleChange} icon={<Calendar size={14} />} />
                                            <PremiumSelect label="Gender" name="gender" value={userData.gender} onChange={handleChange} icon={<User size={14} />}
                                                options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }]} />
                                            <PremiumInput label="Phone Number" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} pattern="[0-9]{10}" icon={<Phone size={14} />} />
                                            <PremiumSelect label="State / UT" name="state" value={userData.state} onChange={handleChange} icon={<MapPin size={14} />}
                                                options={STATES.map(s => ({ value: s, label: s }))} />
                                            <PremiumSelect label="Occupation" name="occupation" value={userData.occupation} onChange={handleChange} icon={<Briefcase size={14} />}
                                                options={OCCUPATIONS.map(o => ({ value: o, label: o }))} />
                                        </div>
                                    )}

                                    {/* ── EDIT: Financial ── */}
                                    {activeTab === 1 && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                                                <PremiumInput label="Annual Income (₹)" name="income" type="number" min="0" value={userData.income} onChange={handleChange} icon={<DollarSign size={14} />} />
                                                <PremiumSelect label="Income Group / Category" name="incomeGroup" value={userData.incomeGroup} onChange={handleChange} icon={<Shield size={14} />}
                                                    options={INCOME_GROUPS.map(g => ({ value: g, label: g }))} />
                                            </div>
                                            <div style={{ background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '1px solid #fde68a', borderRadius: '16px', padding: '18px', display: 'flex', gap: '12px' }}>
                                                <div style={{ fontSize: '24px' }}>💡</div>
                                                <div>
                                                    <p style={{ fontWeight: 700, color: '#92400e', fontSize: '13px', marginBottom: '4px' }}>Why this matters</p>
                                                    <p style={{ color: '#78350f', fontSize: '12px', lineHeight: '1.6' }}>Your income information helps us recommend relevant schemes. For example, PM-Kisan is for farmers, Ayushman Bharat for BPL families, and MUDRA loans for small businesses.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* ── EDIT: Interests ── */}
                                    {activeTab === 2 && (
                                        <div>
                                            <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>Select areas you're interested in. We'll show you relevant schemes from these categories.</p>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
                                                {INTERESTS.map(interest => {
                                                    const selected = userData.interests.includes(interest);
                                                    return (
                                                        <button key={interest} type="button" onClick={() => handleInterestsChange(interest)} style={{
                                                            padding: '12px 14px', borderRadius: '14px', border: selected ? '2px solid #16a34a' : '2px solid #e5e7eb',
                                                            background: selected ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' : 'white',
                                                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                                                            fontSize: '12px', fontWeight: 600, color: selected ? '#15803d' : '#6b7280',
                                                            transition: 'all 0.2s', textAlign: 'left'
                                                        }}>
                                                            <span style={{ fontSize: '18px' }}>{INTEREST_ICONS[interest]}</span>
                                                            <span>{interest}</span>
                                                            {selected && <CheckCircle size={13} style={{ marginLeft: 'auto', color: '#16a34a', flexShrink: 0 }} />}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <p style={{ color: '#16a34a', fontSize: '12px', fontWeight: 700, marginTop: '16px' }}>
                                                {userData.interests.length} interest{userData.interests.length !== 1 ? 's' : ''} selected
                                            </p>
                                        </div>
                                    )}

                                    {/* Form footer */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #f3f4f6', flexWrap: 'wrap', gap: '12px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {['Personal Info', 'Financial Info', 'Interests'].map((tab, i) => (
                                                <button key={i} type="button" onClick={() => setActiveTab(i)} style={{
                                                    padding: '6px 14px', borderRadius: '10px', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                                                    background: activeTab === i ? '#f0fdf4' : '#f9fafb', color: activeTab === i ? '#16a34a' : '#9ca3af'
                                                }}>{tab}</button>
                                            ))}
                                        </div>
                                        <button type="submit" style={{
                                            display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 24px',
                                            background: 'linear-gradient(135deg, #16a34a, #15803d)', color: 'white',
                                            border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '14px',
                                            cursor: 'pointer', boxShadow: '0 4px 14px rgba(22,163,74,0.35)'
                                        }}>
                                            <Save size={15} /> Save Changes
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    {/* ── VIEW: Personal ── */}
                                    {activeTab === 0 && (
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
                                            <InfoCard icon={<User size={16} />} label="Full Name" value={userData.name} />
                                            <InfoCard icon={<User size={16} />} label="Father's Name" value={userData.fatherName} />
                                            <InfoCard icon={<Calendar size={16} />} label="Date of Birth" value={userData.dob ? new Date(userData.dob).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : ''} />
                                            <InfoCard icon={<Calendar size={16} />} label="Age" value={userData.age ? `${userData.age} years` : ''} />
                                            <InfoCard icon={<User size={16} />} label="Gender" value={userData.gender && userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)} />
                                            <InfoCard icon={<Phone size={16} />} label="Phone Number" value={userData.phoneNumber} />
                                            <InfoCard icon={<MapPin size={16} />} label="State / UT" value={userData.state} />
                                            <InfoCard icon={<Briefcase size={16} />} label="Occupation" value={userData.occupation} />
                                            <InfoCard icon={<Mail size={16} />} label="Email Address" value={userData.email} wide />
                                        </div>
                                    )}

                                    {/* ── VIEW: Financial ── */}
                                    {activeTab === 1 && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                                                <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '1.5px solid #86efac', borderRadius: '20px', padding: '22px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                                        <div style={{ background: '#16a34a', borderRadius: '10px', padding: '8px', display: 'flex' }}>
                                                            <DollarSign size={16} color="white" />
                                                        </div>
                                                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Annual Income</span>
                                                    </div>
                                                    <p style={{ fontSize: '26px', fontWeight: 800, color: '#14532d', margin: 0 }}>
                                                        {userData.income ? `₹${Number(userData.income).toLocaleString('en-IN')}` : <span style={{ fontSize: '16px', color: '#9ca3af', fontWeight: 400, fontStyle: 'italic' }}>Not set</span>}
                                                    </p>
                                                </div>
                                                <div style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '1.5px solid #93c5fd', borderRadius: '20px', padding: '22px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                                        <div style={{ background: '#2563eb', borderRadius: '10px', padding: '8px', display: 'flex' }}>
                                                            <Shield size={16} color="white" />
                                                        </div>
                                                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</span>
                                                    </div>
                                                    <p style={{ fontSize: '26px', fontWeight: 800, color: '#1e3a8a', margin: 0 }}>
                                                        {userData.incomeGroup || <span style={{ fontSize: '16px', color: '#9ca3af', fontWeight: 400, fontStyle: 'italic' }}>Not set</span>}
                                                    </p>
                                                </div>
                                            </div>
                                            <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #f8fafc)', border: '1px solid #d1fae5', borderRadius: '18px', padding: '20px' }}>
                                                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#15803d', marginBottom: '8px' }}>🎯 Why This Matters</h3>
                                                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.7', margin: 0 }}>
                                                    Your income & category data helps Sahayastra find the most relevant schemes for you. Schemes like <strong>PM-KISAN</strong>, <strong>Ayushman Bharat</strong>, and <strong>MUDRA Loans</strong> all have income-based eligibility criteria.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* ── VIEW: Interests ── */}
                                    {activeTab === 2 && (
                                        userData.interests?.length > 0 ? (
                                            <div>
                                                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>
                                                    You're following <strong style={{ color: '#16a34a' }}>{userData.interests.length}</strong> area{userData.interests.length !== 1 ? 's' : ''} of interest
                                                </p>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
                                                    {userData.interests.map(interest => (
                                                        <div key={interest} style={{
                                                            padding: '14px', borderRadius: '16px',
                                                            background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                                                            border: '1.5px solid #bbf7d0',
                                                            display: 'flex', alignItems: 'center', gap: '10px'
                                                        }}>
                                                            <span style={{ fontSize: '22px' }}>{INTEREST_ICONS[interest]}</span>
                                                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d' }}>{interest}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                                <div style={{ fontSize: '56px', marginBottom: '16px' }}>🌟</div>
                                                <p style={{ fontWeight: 800, color: '#374151', fontSize: '16px', marginBottom: '8px' }}>No interests selected yet</p>
                                                <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '20px' }}>Select your interests to get personalized scheme recommendations</p>
                                                <button onClick={() => setIsEditing(true)} style={{
                                                    padding: '11px 24px', background: 'linear-gradient(135deg, #16a34a, #15803d)',
                                                    color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer'
                                                }}>Add Interests</button>
                                            </div>
                                        )
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Sub-components ──────────────────────────────────────────────────────────
const StatRow = ({ icon, label, value, color }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ background: color, borderRadius: '8px', padding: '6px', display: 'flex' }}>{icon}</div>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>{label}</span>
        </div>
        <span style={{ fontSize: '14px', fontWeight: 800, color: '#111827' }}>{value}</span>
    </div>
);

const QuickInfoPill = ({ icon, text }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 12px', background: '#f9fafb', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
        <span style={{ color: '#16a34a' }}>{icon}</span>
        <span style={{ fontSize: '12px', color: '#374151', fontWeight: 600 }}>{text}</span>
    </div>
);

const InfoCard = ({ icon, label, value, wide }) => (
    <div style={{
        padding: '16px', borderRadius: '16px', background: '#f9fafb', border: '1.5px solid #f3f4f6',
        transition: 'all 0.2s', gridColumn: wide ? '1 / -1' : undefined,
        cursor: 'default'
    }}
        onMouseEnter={e => { e.currentTarget.style.border = '1.5px solid #bbf7d0'; e.currentTarget.style.background = '#f0fdf4'; }}
        onMouseLeave={e => { e.currentTarget.style.border = '1.5px solid #f3f4f6'; e.currentTarget.style.background = '#f9fafb'; }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: '#16a34a' }}>
            {icon}
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{label}</span>
        </div>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: value ? '#111827' : '#d1d5db', fontStyle: value ? 'normal' : 'italic' }}>
            {value || 'Not set'}
        </p>
    </div>
);

const PremiumInput = ({ icon, label, name, value, onChange, type = "text", required, pattern }) => (
    <div>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '7px' }}>
            {label}{required && <span style={{ color: '#ef4444', marginLeft: '3px' }}>*</span>}
        </label>
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', display: 'flex' }}>{icon}</div>
            <input type={type} name={name} value={value ?? ''} onChange={onChange} required={required} pattern={pattern}
                placeholder={`Enter ${label.toLowerCase()}`}
                style={{ width: '100%', paddingLeft: '38px', paddingRight: '13px', paddingTop: '11px', paddingBottom: '11px', background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '12px', fontSize: '13px', color: '#111827', outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
                onFocus={e => { e.target.style.borderColor = '#16a34a'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.1)'; }}
                onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#f9fafb'; e.target.style.boxShadow = 'none'; }}
            />
        </div>
    </div>
);

const PremiumSelect = ({ icon, label, name, value, onChange, options }) => (
    <div>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '7px' }}>{label}</label>
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', display: 'flex', pointerEvents: 'none' }}>{icon}</div>
            <select name={name} value={value ?? ''} onChange={onChange}
                style={{ width: '100%', paddingLeft: '38px', paddingRight: '32px', paddingTop: '11px', paddingBottom: '11px', background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '12px', fontSize: '13px', color: value ? '#111827' : '#9ca3af', outline: 'none', appearance: 'none', boxSizing: 'border-box', cursor: 'pointer', transition: 'all 0.2s' }}
                onFocus={e => { e.target.style.borderColor = '#16a34a'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.1)'; }}
                onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#f9fafb'; e.target.style.boxShadow = 'none'; }}>
                <option value="">Select {label}</option>
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <div style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9ca3af' }}>
                <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} />
            </div>
        </div>
    </div>
);

export default Profile;
