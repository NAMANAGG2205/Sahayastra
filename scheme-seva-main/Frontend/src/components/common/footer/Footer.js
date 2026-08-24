// import logo from "../../../utils/images/footer/logo.svg";
// import location from "../../../utils/images/footer/location.svg";
import headphones from "../../../utils/images/footer/headphones.svg";
import mail from "../../../utils/images/footer/mail.svg";
import instagram from "../../../utils/images/footer/instagram.png";
import facebook from "../../../utils/images/footer/facebook.png";
import youtube from "../../../utils/images/footer/youtube.png";
import x from "../../../utils/images/footer/twitter.png";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./footer.css";

const Footer = () => {
    const { t } = useTranslation();
    const quickLinks = [
        "about",
        "contact",
        "privacy policy",
        "terms & conditions",
        "account",
    ];
    const categories = [
        "Explore",
        "New Schemes",
        "Education",
        "Health",
        "Agriculture",
    ];
    const socialMedia = [facebook, x, instagram, youtube];

    return (
        <footer className="flex flex-col font-raleway relative mt-auto z-10">
            <div className="flex bg-white/80 backdrop-blur-lg border-t border-white/20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] justify-center py-8 transition-all duration-300">
                <div className="flex flex-wrap gap-6 px-6 md:w-11/12 lg:w-10/12 justify-between">
                    <div className="flex flex-col gap-2">
                        {/* <img src={logo} alt="logo" />
                        <div className="flex gap-2">
                            <img
                                src={location}
                                alt="location"
                                className="w-6 h-6"
                            />
                            <p className="leading-5 font-medium">
                                <span className="font-bold">Address: </span>Shop
                                No. 10, lorem ipsum,
                                <br /> opp. to lorem, ipsum, Delhi 946254
                            </p>
                        </div> */}
                        <div className="flex gap-2">
                            {/* headphones img */}
                            <img src={headphones} alt="headphones" />
                            <p className="font-medium">
                                <span className="font-bold">{t('footer.phone')}: </span>+91 9845321076
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {/* mail img */}
                            <img src={mail} alt="mail" />
                            <p className="font-medium">
                                <span className="font-bold">{t('footer.email')}: </span>
                                contact@sahayastra.in
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-3xl mb-3">{t('footer.quickLinks')}</h3>
                        <div className="flex flex-col gap-1">
                            {quickLinks.map((link, index) => (
                                <p
                                    key={index}
                                    className="footer-link text-gray-700 text-lg font-medium w-fit capitalize">
                                    {t(`footer.${link.replace(/ /g, '').toLowerCase()}`)}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-3xl mb-3">{t('footer.categories')}</h3>
                        <div className="flex flex-col gap-1">
                            {categories.map((category, index) => (
                                <p
                                    key={index}
                                    className="footer-link text-gray-700 text-lg font-medium w-fit">
                                    {t(`footer.${category.replace(/ /g, '').toLowerCase()}`)}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-3xl mb-3">{t('footer.connect')}</h3>
                        <div className="flex gap-2 cursor-pointer">
                            {socialMedia.map((icon, index) => (
                                <div key={index}>
                                    <img
                                        src={icon}
                                        alt={index}
                                        className="w-8"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '0.75rem 0',
                borderTop: '2px solid transparent',
                backgroundImage: 'linear-gradient(#0f172a, #0f172a), linear-gradient(90deg, #74B83E, #3b82f6, #8b5cf6)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
            }}>
                <p className="text-white mt-2 font-poppins font-medium text-xl">
                    {t('footer.allRightsReserved')}
                </p>
                <p className="font-mono font-bold text-xl py-1">
                    <span className="shiny-text">{t('footer.developedBy')}</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
