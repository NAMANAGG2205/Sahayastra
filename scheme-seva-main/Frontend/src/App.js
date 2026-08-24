import Home from "./components/pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import Login from "./components/pages/auth/Login";
import Signup from "./components/pages/auth/Signup";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Unauthenticated from "./routes/Unauthenticated";
import UserProvider from "./context/UserContext";
import SchemeDetails from "./components/pages/schemeDetails/SchemeDetails";
import Schemes from "./components/pages/schemes/Schemes";
import Profile from "./components/pages/profile/Profile";
import Recommendations from "./components/pages/recommendations/Recommendations";
import { Toaster } from 'react-hot-toast';
import './i18n/i18n';
import GlobalChatbot from "./components/common/chatbot/GlobalChatbot";


function App() {


    return (
        <BrowserRouter>
            <UserProvider>
                <div className="App" style={{ position: 'relative', minHeight: '100vh', background: '#f8fdf5' }}>
                    {/* Global floating background blobs */}
                    <div className="bg-blob bg-blob-1" />
                    <div className="bg-blob bg-blob-2" />
                    <div className="bg-blob bg-blob-3" />

                    <Toaster position="bottom-right" toastOptions={{
                        style: {
                            borderRadius: '12px',
                            background: 'rgba(255,255,255,0.92)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(116,184,62,0.2)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '500',
                        }
                    }} />

                    {/* HEADER */}
                    <div className="fixed z-40 w-full">
                        <Header />
                    </div>

                    {/* CONTENT */}
                    <div className="content-wrapper pt-[5rem] page-enter">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/schemes" element={<Schemes />} />
                            <Route path="/scheme/:id" element={<SchemeDetails />} />

                            {/* Unauthenticated Routes */}
                            <Route element={<Unauthenticated />}>
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                            </Route>

                            {/* Protected Routes */}
                            <Route element={<ProtectedRoutes />}>
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/recommendations" element={<Recommendations />} />
                            </Route>
                        </Routes>
                    </div>

                    {/* Global Chatbot */}
                    <GlobalChatbot />

                    {/* FOOTER */}
                    <Footer />
                </div>
            </UserProvider>
        </BrowserRouter>
    );
};

export default App;
