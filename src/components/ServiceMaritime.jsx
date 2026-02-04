
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { ArrowLeft } from 'iconsax-react';
import { Ship, Shield, Global } from 'iconsax-react';

const ServiceMaritime = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="service-page">
            {/* Hero Section */}
            <div className="service-hero" style={{ backgroundImage: "url('/images/shipping-logistics.jpg')" }}>
                <div className="overlay-dark"></div>
                <div className="service-hero-content">
                    <Link to="/" className="back-link"><ArrowLeft size="16" color="#ffffff" /> {t('Home')}</Link>
                    <h1>{t('Tag Marine')}</h1>
                    <p>{t('Content Subtext')}</p>
                </div>
            </div>

            <div className="service-container">
                <div className="service-main">
                    <h2>{t('Content Heading')}</h2>
                    <p className="service-description">
                        {t('Benefit 1 Desc')}
                        <br /><br />
                        {t('Service 10 Desc')}
                    </p>

                    <h3>{t('Key Operations')}</h3>
                    <ul className="operations-list">
                        <li>
                            <Global size="24" className="op-icon" />
                            <div>
                                <strong>{t('Service 2 Title')}</strong>
                                <p>{t('Service 2 Desc')}</p>
                            </div>
                        </li>
                        <li>
                            <Ship size="24" className="op-icon" />
                            <div>
                                <strong>{t('Service 7 Title')}</strong>
                                <p>{t('Service 7 Desc')}</p>
                            </div>
                        </li>
                    </ul>

                    <div className="service-gallery">
                        <img src="/images/shipping-logistics.jpg" alt={t('Tag Marine')} />
                        <img src="/images/bottom-1.jpg" alt={t('Tag Marine')} />
                    </div>

                    <div className="service-cta-box">
                        <h3>{t('Banner Heading')}</h3>
                        <p>{t('Banner Subtext')}</p>
                        <Link to="/contact">
                            <button className="standard-btn">{t('Banner Button')}</button>
                        </Link>
                    </div>
                </div>

                <div className="service-sidebar">
                    <div className="sidebar-widget">
                        <h4>{t('Other Services')}</h4>
                        <ul className="sidebar-links">
                            <li><Link to="/service/charter">{t('Overlay Charter').replace(/<br>/g, ' ')}</Link></li>
                            <li><Link to="/service/offshore">{t('Overlay Offshore').replace(/<br>/g, ' ')}</Link></li>
                            <li><Link to="/service/security">{t('Overlay Security').replace(/<br>/g, ' ')}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceMaritime;
