
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { ArrowLeft } from 'iconsax-react';
import { Clock, Location, Chart1 } from 'iconsax-react';

const ServiceCharter = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="service-page">
            {/* Hero Section */}
            <div className="service-hero" style={{ backgroundImage: "url('/images/bottom-1.jpg')" }}>
                <div className="overlay-dark"></div>
                <div className="service-hero-content">
                    <Link to="/" className="back-link"><ArrowLeft size="16" color="#ffffff" /> {t('Home')}</Link>
                    <h1>{t('Tag Charter')}</h1>
                    <p>{t('Service 4 Desc')}</p>
                </div>
            </div>

            <div className="service-container">
                <div className="service-main">
                    <h2>{t('Overlay Charter').replace(/<br>/g, ' ')}</h2>
                    <p className="service-description">
                        {t('Service 3 Desc')}
                        <br /><br />
                        {t('Benefit 5 Desc')}
                    </p>

                    <h3>{t('Charter Operations')}</h3>
                    <ul className="operations-list">
                        <li>
                            <Location size="24" className="op-icon" />
                            <div>
                                <strong>{t('Service 4 Title')}</strong>
                                <p>{t('Service 4 Desc')}</p>
                            </div>
                        </li>
                        <li>
                            <Chart1 size="24" className="op-icon" />
                            <div>
                                <strong>{t('Service 1 Title')}</strong>
                                <p>{t('Service 1 Desc')}</p>
                            </div>
                        </li>
                        <li>
                            <Clock size="24" className="op-icon" />
                            <div>
                                <strong>{t('Service 3 Title')}</strong>
                                <p>{t('Service 3 Desc')}</p>
                            </div>
                        </li>
                    </ul>

                    <div className="service-gallery">
                        <img src="/images/bottom-1.jpg" alt={t('Tag Charter')} />
                        <img src="/images/hero-v3.jpg" alt={t('Tag Charter')} />
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
                            <li><Link to="/service/maritime">{t('Overlay Maritime').replace(/<br>/g, ' ')}</Link></li>
                            <li><Link to="/service/offshore">{t('Overlay Offshore').replace(/<br>/g, ' ')}</Link></li>
                            <li><Link to="/service/security">{t('Overlay Security').replace(/<br>/g, ' ')}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCharter;
