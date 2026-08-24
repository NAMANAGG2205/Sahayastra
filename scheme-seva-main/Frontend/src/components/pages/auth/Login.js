import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

const Login = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setIsUserLoggedIn } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!email) return setError(t('auth.loginPage.emailRequired'));
        if (!password) return setError(t('auth.loginPage.passwordRequired'));

        setLoading(true);
        try {
            const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/users/login`,
                { email, password },
                { withCredentials: true }
            );
            const data = response.data;
            if (data.success) {
                localStorage.setItem("accessToken", data.user.accessToken);
                setIsUserLoggedIn(true);
                navigate("/");
            } else {
                setError(data.message || t('auth.loginPage.loginFailed'));
            }
        } catch (err) {
            setError(err.response?.data?.message || t('auth.loginPage.errorOccurred'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            {/* Animated blobs */}
            <div style={{ ...styles.blob, ...styles.blob1 }} />
            <div style={{ ...styles.blob, ...styles.blob2 }} />
            <div style={{ ...styles.blob, ...styles.blob3 }} />

            <div style={styles.card}>
                {/* Back button */}
                <button onClick={() => navigate("/")} style={styles.backBtn} title="Go home">
                    <ArrowLeft size={20} />
                </button>

                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.iconCircle}>
                        <LogIn size={28} color="#fff" />
                    </div>
                    <h1 style={styles.title}>{t('auth.loginPage.welcomeBack')}</h1>
                    <p style={styles.subtitle}>{t('auth.loginPage.signInToAccount')}</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form} noValidate>
                    {/* Email */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>{t('auth.loginPage.emailAddress')}</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            style={styles.input}
                            onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                            onBlur={(e) => Object.assign(e.target.style, styles.input)}
                            autoComplete="email"
                        />
                    </div>

                    {/* Password */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>{t('auth.password')}</label>
                        <div style={styles.passwordWrap}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{ ...styles.input, paddingRight: "3rem" }}
                                onFocus={(e) => Object.assign(e.target.style, { ...styles.inputFocus, paddingRight: "3rem" })}
                                onBlur={(e) => Object.assign(e.target.style, { ...styles.input, paddingRight: "3rem" })}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.eyeBtn}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {error && <p style={styles.error}>{error}</p>}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={loading ? { ...styles.submitBtn, opacity: 0.7, cursor: "not-allowed" } : styles.submitBtn}
                        onMouseEnter={(e) => !loading && Object.assign(e.target.style, styles.submitBtnHover)}
                        onMouseLeave={(e) => !loading && Object.assign(e.target.style, styles.submitBtn)}
                    >
                        {loading ? (
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                                {t('auth.loginPage.signingIn')}
                            </span>
                        ) : t('auth.loginPage.signIn')}
                    </button>

                    {/* Divider */}
                    <div style={styles.divider}>
                        <span style={styles.dividerLine} />
                        <span style={styles.dividerText}>{t('auth.loginPage.or')}</span>
                        <span style={styles.dividerLine} />
                    </div>

                    {/* Sign Up Link */}
                    <p style={styles.switchText}>
                        {t('auth.noAccount')}{" "}
                        <Link to="/signup" style={styles.link}>{t('auth.loginPage.createOne')}</Link>
                    </p>
                </form>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes float1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-40px, 30px) scale(1.05); }
                    66% { transform: translate(30px, -40px) scale(0.95); }
                }
                @keyframes float3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(20px, 40px) scale(1.08); }
                }
                input::placeholder { color: #aaa; }
            `}</style>
        </div>
    );
};

const styles = {
    page: {
        minHeight: "calc(100svh - 5rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 40%, #e3f2fd 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "2rem 1rem",
    },
    blob: {
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(60px)",
        opacity: 0.35,
        pointerEvents: "none",
    },
    blob1: {
        width: "350px", height: "350px",
        background: "radial-gradient(circle, #74B83E, #a8e063)",
        top: "-80px", left: "-80px",
        animation: "float1 8s ease-in-out infinite",
    },
    blob2: {
        width: "300px", height: "300px",
        background: "radial-gradient(circle, #42a5f5, #90caf9)",
        bottom: "-60px", right: "-60px",
        animation: "float2 10s ease-in-out infinite",
    },
    blob3: {
        width: "220px", height: "220px",
        background: "radial-gradient(circle, #ab47bc, #ce93d8)",
        top: "50%", left: "60%",
        animation: "float3 12s ease-in-out infinite",
    },
    card: {
        position: "relative",
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.5)",
        borderRadius: "24px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.8) inset",
        padding: "2.5rem 2rem",
        width: "100%",
        maxWidth: "420px",
        zIndex: 10,
    },
    backBtn: {
        position: "absolute",
        top: "1.25rem",
        left: "1.25rem",
        background: "rgba(116,184,62,0.1)",
        border: "none",
        borderRadius: "50%",
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#74B83E",
        transition: "background 0.2s",
    },
    header: {
        textAlign: "center",
        marginBottom: "1.75rem",
        paddingTop: "0.5rem",
    },
    iconCircle: {
        width: "62px",
        height: "62px",
        background: "linear-gradient(135deg, #74B83E, #52a82d)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 1rem",
        boxShadow: "0 8px 20px rgba(116,184,62,0.35)",
    },
    title: {
        fontSize: "1.75rem",
        fontWeight: "800",
        color: "#1a1a2e",
        margin: "0 0 0.3rem",
        letterSpacing: "-0.5px",
    },
    subtitle: {
        fontSize: "0.9rem",
        color: "#666",
        margin: 0,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
    },
    label: {
        fontSize: "0.82rem",
        fontWeight: "600",
        color: "#444",
        letterSpacing: "0.3px",
    },
    input: {
        width: "100%",
        padding: "0.75rem 1rem",
        borderRadius: "12px",
        border: "1.5px solid rgba(0,0,0,0.1)",
        background: "rgba(255,255,255,0.7)",
        fontSize: "0.95rem",
        color: "#222",
        outline: "none",
        transition: "border 0.2s, box-shadow 0.2s",
        boxSizing: "border-box",
    },
    inputFocus: {
        width: "100%",
        padding: "0.75rem 1rem",
        borderRadius: "12px",
        border: "1.5px solid #74B83E",
        background: "rgba(255,255,255,0.9)",
        fontSize: "0.95rem",
        color: "#222",
        outline: "none",
        boxShadow: "0 0 0 3px rgba(116,184,62,0.15)",
        boxSizing: "border-box",
    },
    passwordWrap: {
        position: "relative",
    },
    eyeBtn: {
        position: "absolute",
        right: "0.75rem",
        top: "50%",
        transform: "translateY(-50%)",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#888",
        display: "flex",
        alignItems: "center",
    },
    error: {
        background: "rgba(239,68,68,0.08)",
        border: "1px solid rgba(239,68,68,0.25)",
        borderRadius: "10px",
        padding: "0.6rem 1rem",
        color: "#dc2626",
        fontSize: "0.85rem",
        margin: 0,
    },
    submitBtn: {
        padding: "0.85rem",
        background: "linear-gradient(135deg, #74B83E, #5a9230)",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        fontSize: "1rem",
        fontWeight: "700",
        cursor: "pointer",
        transition: "all 0.25s",
        boxShadow: "0 6px 18px rgba(116,184,62,0.35)",
        letterSpacing: "0.3px",
    },
    submitBtnHover: {
        padding: "0.85rem",
        background: "linear-gradient(135deg, #5a9230, #74B83E)",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        fontSize: "1rem",
        fontWeight: "700",
        cursor: "pointer",
        boxShadow: "0 8px 24px rgba(116,184,62,0.45)",
        transform: "translateY(-1px)",
        letterSpacing: "0.3px",
    },
    divider: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    },
    dividerLine: {
        flex: 1,
        height: "1px",
        background: "rgba(0,0,0,0.1)",
    },
    dividerText: {
        fontSize: "0.8rem",
        color: "#999",
        fontWeight: "500",
    },
    switchText: {
        textAlign: "center",
        fontSize: "0.9rem",
        color: "#555",
        margin: 0,
    },
    link: {
        color: "#74B83E",
        fontWeight: "700",
        textDecoration: "none",
    },
};

export default Login;
